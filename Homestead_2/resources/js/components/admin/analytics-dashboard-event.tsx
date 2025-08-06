import React, { useState } from 'react';
import { Bitcoin,  LucideIcon,  MoreVertical } from 'lucide-react';

// Define the shape of the props for the main portfolio card
interface PortfolioBalanceCardProps {
    balance: number;
    currency: string;
    description: string;
    chartData: number[];
}

// Define the shape of the props for the small crypto card
interface CryptoCoinCardProps {
    coinName: string;
    coinSymbol: string;
    balance: number;
    price: number;
    change: number;
    icon: LucideIcon;
    bgColor: string;
    accentColor: string;
}

const PortfolioBalanceCard: React.FC<PortfolioBalanceCardProps> = ({
    balance,
    currency,
    description,
    chartData,
}) => {
    const [activeFilter, setActiveFilter] = useState('1W');

    // Simple function to generate an SVG path from data points
    const generateChartPath = (data: number[]) => {
        if (data.length < 2) return '';
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data);
        const height = 100;
        const width = 200;
        const yRatio = height / (maxVal - minVal || 1);
        const xRatio = width / (data.length - 1);

        let path = `M 0 ${height - (data[0] - minVal) * yRatio}`;
        data.forEach((val, index) => {
            path += ` L ${index * xRatio} ${height - (val - minVal) * yRatio}`;
        });
        return path;
    };

    const pathD = generateChartPath(chartData);

    return (
        <div className="relative flex flex-col p-6 rounded-3xl shadow-md bg-blue-100/30 overflow-hidden">
            {/* Top section with balance and options */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-extrabold text-gray-900 leading-none">
                    ${balance.toFixed(2)}
                </h2>
                <MoreVertical size={20} className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-600 font-medium">{description}</p>

            {/* Chart area with the "tooltip" */}
            <div className="relative my-4 h-[120px] flex-grow">
                <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="w-full h-full">
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Tooltip marker and content */}
                    <circle cx="170" cy="50" r="5" fill="#60A5FA" />
                </svg>
                <div className="absolute top-10 right-4 p-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-lg">
                    ${chartData[chartData.length - 1]}
                </div>
            </div>

            {/* Time filters at the bottom */}
            <div className="flex space-x-2 text-xs font-semibold text-gray-500 mt-2">
                {['1M', '24H', '1W', '1Y', 'ALL'].map((filter) => (
                    <button
                        key={filter}
                        className={`px-3 py-1 rounded-full transition-colors ${activeFilter === filter
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CryptoCoinCard: React.FC<CryptoCoinCardProps> = ({
    coinName,
    coinSymbol,
    balance,
    price,
    change,
    icon: Icon,
    bgColor,
    accentColor,
}) => {
    const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className={`flex flex-col p-6 rounded-3xl shadow-md ${bgColor}`}>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-lg font-bold text-gray-900">{balance.toFixed(2)} {coinSymbol}</span>
                    <p className="text-sm text-gray-500 font-medium">
                        ${price.toFixed(2)}
                    </p>
                </div>
                <MoreVertical size={20} className="text-gray-500" />
            </div>

            <div className="flex items-center space-x-4 mt-auto">
                <div className={`p-3 rounded-2xl ${accentColor}`}>
                    <Icon size={24} className="text-white" />
                </div>
                <p className={`text-sm font-semibold ${changeColor}`}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                </p>
            </div>
        </div>
    );
};

// Main App component to demonstrate usage and provide a container
const App: React.FC = () => {
    const portfolioCardData = {
        balance: 17643.41,
        currency: 'USD',
        description: 'Portfolio balance',
        chartData: [20000, 21000, 19500, 18000, 18500, 17800, 17643],
    };

    const coinCardsData: CryptoCoinCardProps[] = [
        {
            coinName: 'Bitcoin',
            coinSymbol: 'BTC',
            balance: 1.25,
            price: 2948.04,
            change: 0.14,
            icon: Bitcoin,
            bgColor: 'bg-purple-100/50',
            accentColor: 'bg-purple-400',
        },
        {
            coinName: 'Litecoin',
            coinSymbol: 'LTC',
            balance: 0.32,
            price: 2948.04,
            change: 0.31,
            icon: Bitcoin,
            bgColor: 'bg-green-100/50',
            accentColor: 'bg-green-400',
        },
        {
            coinName: 'Ethereum',
            coinSymbol: 'ETH',
            balance: 1.25,
            price: 2948.04,
            change: 0.27,
            icon: Bitcoin,
            bgColor: 'bg-yellow-100/50',
            accentColor: 'bg-yellow-400',
        },
    ];

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                    <PortfolioBalanceCard {...portfolioCardData} />
                </div>
                {coinCardsData.map((coin, index) => (
                    <CryptoCoinCard key={index} {...coin} />
                ))}
            </div>
        </div>
    );
};

export default App;
