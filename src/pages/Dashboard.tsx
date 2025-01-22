import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockDetails } from '../services/api.ts';
import { setStocks } from '../features/stockSlice.ts';
import { RootState } from '../store.ts';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stock.stocks);

  useEffect(() => {
    const symbols = ['AAPL', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'];
    
    const getStocks = async () => {
      const data = await fetchStockDetails(symbols);
      dispatch(setStocks(data));
    };
  
    getStocks();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-indigo-100 hover:bg-white/90 transition-all">
            <h3 className="text-sm font-medium text-indigo-600">Total Stocks</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stocks.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-purple-100 hover:bg-white/90 transition-all">
            <h3 className="text-sm font-medium text-purple-600">Average Price</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${(stocks.reduce((acc, stock) => acc + stock.price, 0) / stocks.length || 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-pink-100 hover:bg-white/90 transition-all">
            <h3 className="text-sm font-medium text-pink-600">Portfolio Value</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${stocks.reduce((acc, stock) => acc + stock.price, 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock, index) => {
            const colorSchemes = [
              'border-indigo-100 hover:border-indigo-200',
              'border-purple-100 hover:border-purple-200',
              'border-pink-100 hover:border-pink-200'
            ];
            const colorScheme = colorSchemes[index % 3];

            return (
              <div 
                key={stock.id} 
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border ${colorScheme} 
                  hover:shadow-lg transition-all duration-300 hover:bg-white/90`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{stock.name}</h2>
                    {/* <p className="text-sm text-gray-500 mt-1">Stock ID: {stock.id}</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
                    {/* <p className="text-sm mt-1 text-gray-500">High: ${stock.high}</p>
                    <p className="text-sm mt-1 text-gray-500">Low: ${stock.low}</p> */}
                    <p className="text-sm mt-1 text-gray-500">Open: ${stock.open}</p>
                    <p className="text-sm mt-1 text-gray-500">Prev. Close: ${stock.previousClose}</p>
                  </div>
                </div>
                
                <div className="h-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mt-4 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-red-300/50 to-green-300/60"></div>                
                </div>

                <div className="mt-4">
                  <Link to={`/stock/${stock.id}`} className="text-indigo-600 hover:text-indigo-800">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;