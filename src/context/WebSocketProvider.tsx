import { useSelector } from 'react-redux';

import { ReactNode } from 'react';

import { useWebSocketWithHeartbeat } from '../hooks/useWebSocketWithHeartbeat';
import { selectAccessToken } from '../store/reducers/AuthSlice';
import { WebSocketContext } from './WebSocketContext';

type Props = {
  children: ReactNode;
};

export function WebSocketProvider({ children }: Props) {
  const accessToken = useSelector(selectAccessToken);

  const wsUrl = process.env.REACT_APP_WS_URL;

  if (!wsUrl) {
    throw new Error('REACT_APP_WS_URL is not defined');
  }

  const valueWs = useWebSocketWithHeartbeat(wsUrl, accessToken, {
    pingInterval: 30000,
    reconnectDelay: 2000,
  });

  return <WebSocketContext value={valueWs}>{children}</WebSocketContext>;
}
