import { useDispatch } from 'react-redux';

import { useCallback, useEffect, useRef, useState } from 'react';

import { refreshTokenAPI } from '../services/auth/RefreshTokenService';
import { authSlice } from '../store/reducers/AuthSlice';

type UseWebSocketOptions = {
  pingInterval?: number;
  reconnectDelay?: number;
  enabled?: boolean;
};

type UseWebSocketResult = {
  ws: WebSocket | null;
  readyState: number;
  isOpen: boolean;
  sendJSON: (data: any) => void;
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
};

export function useWebSocketWithHeartbeat(
  url: string,
  accessToken?: string,
  options?: UseWebSocketOptions,
): UseWebSocketResult {
  const { pingInterval = 30000, reconnectDelay = 5000 } = options ?? {};
  const [updateToken, setUpdateToken] = useState(false);

  const { data: newAccessToken } = refreshTokenAPI.useRefreshTokenQuery('', {
    skip: !updateToken,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();
  const { setCredentials } = authSlice.actions;

  useEffect(() => {
    if (newAccessToken) {
      dispatch(setCredentials(newAccessToken));
      setUpdateToken(false);
    }
  }, [newAccessToken]);

  const [shouldReconnect, setShouldReconnect] = useState(false);

  useEffect(() => {
    if (!enabledRef.current) return;
    if (!shouldReconnect) return;
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    reconnectTimeoutRef.current = window.setTimeout(() => {
      reconnectTimeoutRef.current = null;
      connect();
    }, reconnectDelay);

    setShouldReconnect(false);
  }, [shouldReconnect, accessToken, reconnectDelay]);

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<number | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const isAliveRef = useRef(true);
  const enabledRef = useRef(false);

  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

  const clearPing = () => {
    if (pingIntervalRef.current !== null) {
      window.clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    if (!enabledRef.current) return;

    setShouldReconnect(true);
  }, [accessToken]);

  const startPing = useCallback(() => {
    clearPing();

    pingIntervalRef.current = window.setInterval(() => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      if (!isAliveRef.current) {
        ws.close();
        return;
      }

      isAliveRef.current = false;
      try {
        ws.send(JSON.stringify({ type: 'PING', ts: Date.now() }));
      } catch (e) {
        console.warn('Failed to send PING', e);
      }
    }, pingInterval);
  }, [pingInterval]);

  const connect = useCallback(() => {
    if (!accessToken) return;
    if (!enabledRef.current) return;

    clearPing();
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    const protocols: string[] = ['accessToken', accessToken ?? ''];
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;
    setReadyState(ws.readyState);
    isAliveRef.current = true;

    ws.addEventListener('open', () => {
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      setReadyState(ws.readyState);

      try {
        ws.send(JSON.stringify({ type: 'PING', ts: Date.now() }));
      } catch (e) {
        console.warn('Failed to send initial PING', e);
      }

      startPing();
    });

    ws.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg?.type === 'PONG') {
          isAliveRef.current = true;
        } else if (
          msg?.type === 'ERROR' &&
          msg?.payload?.message === 'JWT_EXPIRED'
        ) {
          setUpdateToken(true);
        }
      } catch {
        // just ignore
      }
    });

    ws.addEventListener('close', () => {
      setReadyState(ws.readyState);
      clearPing();
      scheduleReconnect();
    });

    ws.addEventListener('error', (err) => {
      setReadyState(ws.readyState);
      try {
        ws.close();
      } catch {}
    });
  }, [accessToken, scheduleReconnect, startPing, url]);

  useEffect(() => {
    enabledRef.current = true;

    connect();

    return () => {
      enabledRef.current = false;
      clearPing();

      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = null;

      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const send = useCallback(
    (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket is not open, cannot send');
        return;
      }
      ws.send(data);
    },
    [],
  );

  const sendJSON = useCallback(
    (data: any) => {
      send(JSON.stringify(data));
    },
    [send],
  );

  return {
    ws: wsRef.current,
    readyState,
    isOpen: readyState === WebSocket.OPEN,
    send,
    sendJSON,
  };
}
