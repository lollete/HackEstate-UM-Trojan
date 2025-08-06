import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { DollarSign, Wrench, Home, MessageSquareText, Calendar, Clock, MapPin, Send } from 'lucide-react'; // Added Send icon for message button

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
// Define these interfaces in your global types file (e.g., '@/types/index.ts')
interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ElementType; // Lucide icon component
    iconColor: string;
    bgColor: string;
}

interface SalesData {
    month: string;
    sales: number;
}

interface PropertyListItem {
    id: string;
    name: string;
    location: string;
    time: string; // e.g., "2:30 PM to 3:30 PM, July 28, 2025"
    agentName: string;
    agentAvatar: string;
    imageUrl: string;
}

interface CircularProgressProps {
    title: string;
    current: number;
    total: number;
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

const mockSalesChartData: SalesData[] = [
    { month: 'Jan 2025', sales: 30000 },
    { month: 'Feb 2025', sales: 35000 },
    { month: 'Mar 2025', sales: 40000 },
    { month: 'Apr 2025', sales: 80000 },
    { month: 'May 2025', sales: 120000 },
    { month: 'Jun 2025', sales: 150000 },
    { month: 'Jul 2025', sales: 180000 },
    { month: 'Aug 2025', sales: 200000 },
];

const mockTourRequests: PropertyListItem[] = [
    {
        id: 'tr1',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop1',
    },
    {
        id: 'tr2',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop2',
    },
    {
        id: 'tr3',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop3',
    },
];

const mockEventBookings: PropertyListItem[] = [
    {
        id: 'eb1',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Event1',
    },
    {
        id: 'eb2',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Event2',
    },
    {
        id: 'eb3',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000, Philippines',
        time: '2:30 PM to 3:30 PM, July 28, 2025',
        agentName: 'John Doe',
        agentAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Event3',
    },
];

const mockCircularProgressData = {
    availableListings: { current: 62, total: 124 },
    soldProperties: { current: 79, total: 124 },
};

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

const PropertyRequestItem: React.FC<PropertyListItem> = ({ name, location, time, agentName, agentAvatar, imageUrl }) => (
    <div className="flex items-center space-x-3 p-3 border-b last:border-b-0">
        <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-md object-cover"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://placehold.co/64x64/E0E0E0/333333?text=Prop';
            }}
        />
        <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-xs text-gray-500 flex items-center">
                <MapPin size={12} className="mr-1" /> {location}
            </p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
                <Clock size={12} className="mr-1" /> {time}
            </p>
            <div className="flex items-center mt-2">
                <img
                    src={agentAvatar}
                    alt={agentName}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/24x24/CCCCCC/333333?text=A';
                    }}
                />
                <span className="text-sm text-gray-700">{agentName}</span>
            </div>
        </div>
        <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center hover:bg-green-600 transition-colors duration-200">
            <Send size={14} className="mr-1" /> Message
        </button>
    </div>
);

const CircularProgressChart: React.FC<CircularProgressProps> = ({ title, current, total }) => {
    const percentage = (current / total) * 100;
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <Card className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm">
            <CardTitle className="text-md font-medium text-gray-700 mb-4">{title}</CardTitle>
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                    />
                    <circle
                        className="text-green-500"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-xl font-bold text-gray-800">
                    {current} / {total}
                </div>
            </div>
        </Card>
    );
};

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
                {/* Total Sales Chart */}
                <Card className="lg:col-span-2 rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800">Total Sales</CardTitle>
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
                            <LineChart data={mockSalesChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <YAxis tickFormatter={(value) => `${value / 1000}K`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px' }}
                                    labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#10b981' }}
                                    formatter={(value: number) => `$${value.toLocaleString()}`}
                                />
                                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6, fill: '#10b981', stroke: '#10b981', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Tour Requests */}
                <Card className="rounded-lg shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Tour Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {mockTourRequests.map(item => (
                            <PropertyRequestItem key={item.id} {...item} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Available Listings & Sold Properties */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CircularProgressChart
                        title="Available Listings"
                        current={mockCircularProgressData.availableListings.current}
                        total={mockCircularProgressData.availableListings.total}
                    />
                    <CircularProgressChart
                        title="Sold Properties"
                        current={mockCircularProgressData.soldProperties.current}
                        total={mockCircularProgressData.soldProperties.total}
                    />
                </div>

                {/* Event Bookings */}
                <Card className="rounded-lg shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Event Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {mockEventBookings.map(item => (
                            <PropertyRequestItem key={item.id} {...item} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
