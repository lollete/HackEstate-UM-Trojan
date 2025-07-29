import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, Wrench, Home, MessageSquareText, Calendar, Clock, MapPin, Send } from 'lucide-react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// --- Data Interfaces ---
interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
}

interface DailySalesData {
    day: string;
    sales: number;
}

interface PieChartData {
    name: string;
    value: number;
    color: string;
}

interface RecentTransaction {
    id: string;
    customer: string;
    propertyName: string;
    type: string;
    amount: string;
}

// --- Mock Data ---
const mockSummaryData: SummaryCardProps[] = [
    {
        title: "Month's Sales",
        value: "$190,243",
        icon: DollarSign,
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        title: "Total Maintenance",
        value: "$43,234",
        icon: Wrench,
        iconColor: "text-orange-600",
        bgColor: "bg-orange-50",
    },
];

const mockDailySalesData: DailySalesData[] = [
    { day: 'Sun', sales: 450000 },
    { day: 'Mon', sales: 550000 },
    { day: 'Tue', sales: 600000 },
    { day: 'Wed', sales: 500000 },
    { day: 'Thu', sales: 150000 },
    { day: 'Fri', sales: 700000 },
    { day: 'Sat', sales: 900000 },
];

const mockAvailablePropertiesPieData: PieChartData[] = [
    { name: 'House', value: 8000, color: '#22C55E' }, // Green
    { name: 'Apartment', value: 5000, color: '#16A34A' }, // Darker Green
    { name: 'Condominium', value: 3954, color: '#0F766E' }, // Even Darker Green (teal-ish)
];
const totalAvailableProperties = mockAvailablePropertiesPieData.reduce((sum, entry) => sum + entry.value, 0);


const mockAllPropertiesPieData: PieChartData[] = [
    { name: 'House', value: 1500, color: '#22C55E' },
    { name: 'Apartment', value: 600, color: '#16A34A' },
    { name: 'Condominium', value: 388, color: '#0F766E' },
];
const totalAllProperties = mockAllPropertiesPieData.reduce((sum, entry) => sum + entry.value, 0);


const mockRecentTransactions: RecentTransaction[] = [
    { id: 't1', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218' },
    { id: 't2', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218' },
    { id: 't3', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218' },
    { id: 't4', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218' },
];


// --- Sub-Components ---

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, iconColor, bgColor }) => (
    <Card className="flex items-center p-4 rounded-lg shadow-sm">
        <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon size={24} className={iconColor} />
        </div>
        <div className="ml-4">
            <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
    </Card>
);

interface PieChartWithLegendProps {
    data: PieChartData[];
    totalValue: number;
    title: string;
    totalLabel: string;
}

const PieChartWithLegend: React.FC<PieChartWithLegendProps> = ({ data, totalValue, title, totalLabel }) => (
    <Card className="rounded-lg shadow-sm p-4 flex flex-col items-center">
        <CardTitle className="text-lg font-semibold text-gray-800 mb-4">{title}</CardTitle>
        <div className="relative w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                        labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
                        itemStyle={{ color: '#10b981' }}
                        formatter={(value: number, name: string) => [`${value.toLocaleString()}`, name]}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
                <div className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{totalLabel}</div>
            </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
            {data.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-gray-700">{entry.name}</span>
                </div>
            ))}
        </div>
    </Card>
);

const RecentTransactionItem: React.FC<RecentTransaction> = ({ customer, propertyName, type, amount }) => (
    <div className="grid grid-cols-4 gap-4 items-center py-3 px-4 border-b last:border-b-0 text-sm text-gray-700">
        <div className="font-medium">{customer}</div>
        <div>{propertyName}</div>
        <div>{type}</div>
        <div className="font-semibold text-green-600">{amount}</div>
    </div>
);

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen font-inter">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {mockSummaryData.map((card, index) => (
                    <SummaryCard key={index} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Analytics Bar Chart */}
                <Card className="lg:col-span-2 rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800">Sales Analytics</CardTitle>
                        <Select defaultValue="past7days">
                            <SelectTrigger className="w-[180px] text-sm">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="past7days">Past 7 Days</SelectItem>
                                <SelectItem value="past30days">Past 30 Days</SelectItem>
                                <SelectItem value="past90days">Past 90 Days</SelectItem>
                                <SelectItem value="pastyear">Past Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="h-[300px] p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockDailySalesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} /> {/* Only horizontal grid lines */}
                                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis tickFormatter={(value) => `${value / 1000}K`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                                    labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#10b981' }}
                                    formatter={(value: number) => `$${value.toLocaleString()}`}
                                />
                                <Bar dataKey="sales" fill="#22C55E" radius={[4, 4, 0, 0]} /> {/* Green bars with rounded top corners */}
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Available Properties Donut Chart */}
                <PieChartWithLegend
                    title="Available Properties"
                    totalValue={totalAvailableProperties}
                    totalLabel="Available"
                    data={mockAvailablePropertiesPieData}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Recent Transactions */}
                <Card className="lg:col-span-2 rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800">Recent Transactions</CardTitle>
                        <button className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                            View All
                        </button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                            <div>Customer</div>
                            <div>Property Name</div>
                            <div>Type</div>
                            <div>Amount</div>
                        </div>
                        {/* Transaction Items */}
                        {mockRecentTransactions.map(item => (
                            <RecentTransactionItem key={item.id} {...item} />
                        ))}
                    </CardContent>
                </Card>

                {/* All Properties Donut Chart */}
                <PieChartWithLegend
                    title="All Properties"
                    totalValue={totalAllProperties}
                    totalLabel="Sold all the time"
                    data={mockAllPropertiesPieData}
                />
            </div>
        </div>
    );
};

export default Dashboard;
