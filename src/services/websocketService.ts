const FINNHUB_WEBSOCKET_URL = 'wss://ws.finnhub.io?token=cu6a8kpr01qujm3q5tegcu6a8kpr01qujm3q5tf0';

export const connectWebSocket = (symbol: string, onMessage: (message: MessageEvent) => void) => {
  const socket = new WebSocket(FINNHUB_WEBSOCKET_URL);

  socket.onopen = () => {
    console.log('WebSocket connection opened');
    socket.send(JSON.stringify({ type: 'subscribe', symbol }));
  };

  socket.onmessage = onMessage;

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};
