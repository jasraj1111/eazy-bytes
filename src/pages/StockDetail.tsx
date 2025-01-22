import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchStockDetails } from '../services/api.ts';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface StockDetails {
  id: string;
  name: string;
  price: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const getStockDetails = async () => {
      if (!symbol) {
        setError('No symbol provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchStockDetails([symbol]);
        if (data && data.length > 0) {
          setStockDetails(data[0]);
          // Mock chart data - Replace this with real data from your API or other source
          setChartData([data[0].open, data[0].high, data[0].low, data[0].price]);
        } else {
          setError('Stock details not found');
        }
      } catch (err) {
        setError('Error fetching stock details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStockDetails();
  }, [symbol]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(200,200,200,0.2)',
        },
      },
    },
  };

  const chartDataConfig = {
    labels: ['Open', 'High', 'Low', 'Current'],
    datasets: [
      {
        label: 'Price',
        data: chartData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !stockDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Error loading stock details'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 mr-4">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {stockDetails.name} Stock Details
            </h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-indigo-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Price:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${stockDetails.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Previous Close:</span>
                <span className="font-semibold">
                  ${stockDetails.previousClose.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Range Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Range</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Open:</span>
                <span className="font-semibold">${stockDetails.open.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High:</span>
                <span className="font-semibold text-green-600">${stockDetails.high.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Low:</span>
                <span className="font-semibold text-red-600">${stockDetails.low.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Price Change Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-pink-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Change</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Change:</span>
                <span
                  className={`font-semibold ${
                    stockDetails.price - stockDetails.previousClose > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  ${(stockDetails.price - stockDetails.previousClose).toFixed(2)} (
                  {(
                    ((stockDetails.price - stockDetails.previousClose) /
                      stockDetails.previousClose) *
                    100
                  ).toFixed(2)}
                  %)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-blue-100 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Trend</h2>
          <Line data={chartDataConfig} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
