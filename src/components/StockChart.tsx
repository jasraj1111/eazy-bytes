import React, { useEffect, useState } from 'react';
import { connectWebSocket } from '../services/websocketService.ts';
import { processTradeMessage } from '../utils/chartUtils.ts';
import { TradeMessage } from '../types/websocketTypes.ts';

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const handleWebSocketMessage = (event: MessageEvent) => {
      const message: TradeMessage = JSON.parse(event.data);
      if (message.type === 'trade') {
        setTrades(prevTrades => [...prevTrades, ...processTradeMessage(message)]);
      }
    };

    const socket = connectWebSocket(symbol, handleWebSocketMessage);

    return () => {
      socket.close();
    };
  }, [symbol]);

  return (
    <div>
      <h2>{symbol} Real-Time Chart</h2>
      {/* Use a chart library here, like Chart.js or Recharts, to display the trades */}
      <ul>
        {trades.map((trade, index) => (
          <li key={index}>
            {trade.timestamp}: ${trade.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockChart;
