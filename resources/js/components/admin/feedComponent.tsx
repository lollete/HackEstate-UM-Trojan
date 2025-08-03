import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, Wrench, Home, MessageSquareText, Calendar, Clock, MapPin, Send, ReceiptText, RefreshCcw, MoreHorizontal, Star, Search } from 'lucide-react'; // Added Star, Search icons

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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

interface PropertyListItem {
    id: string;
    name: string;
    location: string;
    time: string; // e.g., "2:30 PM to 3:30 PM, July 28, 2025"
    agentName: string;
    agentAvatar: string;
    imageUrl: string;
}

interface RecentTransaction {
    id: string;
    customer: string;
    propertyName: string;
    type: string;
    amount: string;
    transactionNo: string;
    payment: string;
    customerAvatar: string;
}

interface ReviewItem {
    id: string;
    reviewerName: string;
    reviewerAvatar: string;
    comment: string;
    timestamp: string; // e.g., "10:30 PM July 19, 2025"
    propertyName: string;
    propertyLocation: string;
    propertyImageUrl: string;
    rating: number;
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
    { name: 'House', value: 8000, color: '#22C55E' },
    { name: 'Apartment', value: 5000, color: '#16A34A' },
    { name: 'Condominium', value: 3954, color: '#0F766E' },
];
const totalAvailableProperties = mockAvailablePropertiesPieData.reduce((sum, entry) => sum + entry.value, 0);


const mockAllPropertiesPieData: PieChartData[] = [
    { name: 'House', value: 1500, color: '#22C55E' },
    { name: 'Apartment', value: 600, color: '#16A34A' },
    { name: 'Condominium', value: 388, color: '#0F766E' },
];
const totalAllProperties = mockAllPropertiesPieData.reduce((sum, entry) => sum + entry.value, 0);


const mockRecentTransactions: RecentTransaction[] = [
    { id: 't1', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218', transactionNo: '#REC001', payment: 'Cash', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD' },
    { id: 't2', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218', transactionNo: '#REC002', payment: 'Card', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD' },
    { id: 't3', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218', transactionNo: '#REC003', payment: 'Wire Transfer', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD' },
    { id: 't4', customer: 'Juan dela Cruz', propertyName: 'Family House', type: 'House', amount: 'P150,218', transactionNo: '#REC004', payment: 'Cash', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD' },
];

const mockTransactionHistorySummary: SummaryCardProps[] = [
    {
        title: "Total Sales",
        value: "$190,243",
        icon: DollarSign,
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        title: "Total Refunds",
        value: "$190,243",
        icon: RefreshCcw,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Total Transactions",
        value: "24",
        icon: ReceiptText,
        iconColor: "text-gray-600",
        bgColor: "bg-gray-50",
    },
];

const mockFullTransactions: RecentTransaction[] = [
    { id: 'ft1', transactionNo: '#119502643109', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
    { id: 'ft2', transactionNo: '#119502643110', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
    { id: 'ft3', transactionNo: '#119502643111', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
    { id: 'ft4', transactionNo: '#119502643112', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
    { id: 'ft5', transactionNo: '#119502643113', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
    { id: 'ft6', transactionNo: '#119502643114', customer: 'Juan dela Cruz', customerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD', propertyName: 'Family House', type: 'House', payment: 'Wire Transfer', amount: 'P150,218' },
];

// New mock data for Reviews
const mockReviews: ReviewItem[] = [
    {
        id: 'rev1',
        reviewerName: 'Juan dela Cruz',
        reviewerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        comment: 'This property is fantastic, there was a nice backyard.',
        timestamp: '10:30 PM July 19, 2025',
        propertyName: 'Family Home',
        propertyLocation: 'Ma-a, Davao City, 8000, Philippines',
        propertyImageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop1',
        rating: 4,
    },
    {
        id: 'rev2',
        reviewerName: 'Juan dela Cruz',
        reviewerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        comment: 'This property is fantastic, there was a nice backyard.',
        timestamp: '10:30 PM July 19, 2025',
        propertyName: 'Family Home',
        propertyLocation: 'Ma-a, Davao City, 8000, Philippines',
        propertyImageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop2',
        rating: 4,
    },
    {
        id: 'rev3',
        reviewerName: 'Juan dela Cruz',
        reviewerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        comment: 'This property is fantastic, there was a nice backyard.',
        timestamp: '10:30 PM July 19, 2025',
        propertyName: 'Family Home',
        propertyLocation: 'Ma-a, Davao City, 8000, Philippines',
        propertyImageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop3',
        rating: 4,
    },
    {
        id: 'rev4',
        reviewerName: 'Juan dela Cruz',
        reviewerAvatar: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        comment: 'This property is fantastic, there was a nice backyard.',
        timestamp: '10:30 PM July 19, 2025',
        propertyName: 'Family Home',
        propertyLocation: 'Ma-a, Davao City, 8000, Philippines',
        propertyImageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Prop4',
        rating: 4,
    },
];

const mockTotalRatingsPieData: PieChartData[] = [
    { name: 'Available', value: 16954, color: '#22C55E' }, // Green
    // You might have other categories for ratings breakdown if needed
];
const totalTotalRatings = mockTotalRatingsPieData.reduce((sum, entry) => sum + entry.value, 0);


const mockTopPropertiesPieData: PieChartData[] = [
    { name: 'House', value: 1500, color: '#22C55E' },
    { name: 'Apartment', value: 600, color: '#16A34A' },
    { name: 'Condominium', value: 388, color: '#0F766E' },
];
const totalTopProperties = mockTopPropertiesPieData.reduce((sum, entry) => sum + entry.value, 0);


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

const TransactionHistoryItem: React.FC<RecentTransaction> = ({ transactionNo, customer, customerAvatar, propertyName, type, payment, amount }) => (
    <div className="grid grid-cols-6 items-center py-3 px-4 border-b last:border-b-0 text-sm text-gray-700">
        <div className="font-medium">{transactionNo}</div>
        <div className="flex items-center">
            <img
                src={customerAvatar}
                alt={customer}
                className="w-8 h-8 rounded-full object-cover mr-2"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/32x32/CCCCCC/333333?text=C';
                }}
            />
            <span>{customer}</span>
        </div>
        <div>{propertyName}</div>
        <div>{type}</div>
        <div>{payment}</div>
        <div className="flex items-center justify-between">
            <span className="font-semibold text-green-600">{amount}</span>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="More options">
                <MoreHorizontal size={18} className="text-gray-500" />
            </button>
        </div>
    </div>
);

interface ReviewCardProps {
    review: ReviewItem;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
    <div className="flex space-x-4 p-4 border-b last:border-b-0">
        {/* Reviewer Avatar */}
        <div>
            <img
                src={review.reviewerAvatar}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${review.reviewerName.split(' ').map(n => n[0]).join('')}`;
                }}
            />
        </div>
        {/* Review Content */}
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                <span className="text-xs text-gray-500">{review.timestamp}</span>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            {/* Property Info */}
            <div className="flex items-center space-x-3 mb-2">
                <img
                    src={review.propertyImageUrl}
                    alt={review.propertyName}
                    className="w-12 h-12 rounded-md object-cover"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/48x48/E0E0E0/333333?text=Prop';
                    }}
                />
                <div>
                    <p className="font-medium text-sm text-gray-800">{review.propertyName}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                        <MapPin size={12} className="mr-1" /> {review.propertyLocation}
                    </p>
                </div>
            </div>
            {/* Rating and Reply */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                </div>
                <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600 transition-colors duration-200">
                    Reply
                </button>
            </div>
        </div>
    </div>
);


// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen font-inter">
            {/* Summary Cards */}
     
            {/* Transaction History Section (from previous request) */}
    
            {/* Reviews Section (New) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <Card className="lg:col-span-2 rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-800">Reviews</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search"
                                className="w-40 rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                            />
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[120px] text-sm">
                                    <SelectValue placeholder="Filter by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="5star">5 Stars</SelectItem>
                                    <SelectItem value="4star">4 Stars</SelectItem>
                                    <SelectItem value="3star">3 Stars</SelectItem>
                                    <SelectItem value="2star">2 Stars</SelectItem>
                                    <SelectItem value="1star">1 Star</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {mockReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </CardContent>
                </Card>

                {/* Total Ratings Donut Chart */}
                <PieChartWithLegend
                    title="Total Ratings"
                    totalValue={totalTotalRatings}
                    totalLabel="Available" // Assuming "Available" is the label for total ratings
                    data={mockTotalRatingsPieData}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Top Properties Donut Chart (This seems to be the "All Properties" from previous image, renamed for context) */}
                <PieChartWithLegend
                    title="Top Properties"
                    totalValue={totalTopProperties}
                    totalLabel="Sold all the time" // Assuming "Sold all the time" is the label for top properties
                    data={mockTopPropertiesPieData}
                />
            </div>
        </div>
    );
};

export default Dashboard;
