import { createContext, useContext } from 'react';

import { useWebSocketWithHeartbeat } from '../hooks/useWebSocketWithHeartbeat';

export type WebSocketContextType = ReturnType<typeof useWebSocketWithHeartbeat>;

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);

export const useAppWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error('useAppWebSocket must be used within <WebSocketProvider>');
  }
  return ctx;
};
