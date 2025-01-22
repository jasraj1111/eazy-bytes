// Define types for WebSocket messages
export interface TradeMessage {
    type: string;
    data: {
      p: number; // Price
      s: string; // Symbol
      t: number; // Timestamp
    }[];
  }
  