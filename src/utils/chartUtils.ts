import {TradeMessage} from '../types/websocketTypes.ts'
export const processTradeMessage = (message: TradeMessage) => {
  return message.data.map(trade => ({
    price: trade.p,
    symbol: trade.s,
    timestamp: new Date(trade.t).toLocaleTimeString(),
  }));
};
