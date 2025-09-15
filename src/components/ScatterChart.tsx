import React from 'react';

interface ScatterData {
  date: string;
  amount: number;
  displayDate: string;
}

interface ScatterChartProps {
  data: ScatterData[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  const minAmount = Math.min(...data.map(d => d.amount));
  const range = maxAmount - minAmount;

  const getY = (value: number) => {
    return 200 - ((value - minAmount) / range) * 180;
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * 350;
  };

  // Create path for the line
  const pathData = data.map((item, index) => {
    const x = getX(index);
    const y = getY(item.amount);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation Trends</h3>
      
      <div className="relative">
        <svg width="100%" height="240" viewBox="0 0 370 240" className="overflow-visible">
          <defs>
            <linearGradient id="scatterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[50000, 100000, 150000, 200000, 250000, 300000].map((value, i) => {
            const y = 200 - ((value - minAmount) / range) * 180;
            return (
              <g key={value}>
                <line
                  x1="0"
                  y1={y}
                  x2="350"
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x="-10"
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#9CA3AF"
                >
                  R$ {(value / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}
          
          {/* Line connecting points */}
          <path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Scatter points */}
          {data.map((item, index) => {
            const x = getX(index);
            const y = getY(item.amount);
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="2"
                  className="hover:r-7 transition-all cursor-pointer"
                />
                
                {/* Tooltip on hover */}
                <g className="opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <rect
                    x={x - 35}
                    y={y - 35}
                    width="70"
                    height="25"
                    rx="4"
                    fill="#1F2937"
                    fillOpacity="0.9"
                  />
                  <text
                    x={x}
                    y={y - 20}
                    textAnchor="middle"
                    fontSize="11"
                    fill="white"
                    fontWeight="600"
                  >
                    {item.displayDate}
                  </text>
                  <text
                    x={x}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill="white"
                  >
                    R$ {(item.amount / 1000).toFixed(0)}k
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 px-2">
          {data.filter((_, index) => index % 2 === 0).map((item, index) => (
            <span key={index} className="text-xs text-gray-500">
              {item.displayDate}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;