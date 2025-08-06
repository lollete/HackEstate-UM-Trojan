import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Home,  MapPin, Clock, User, MessageSquare, Phone, CheckCircle, XCircle, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Removed: import { Calendar } from '@/components/ui/calendar'; // Shadcn's Calendar component

// --- Data Interfaces ---
interface TourRequest {
    id: string;
    property: {
        name: string;
        location: string;
        imageUrl: string;
    };
    requester: {
        name: string;
        avatarUrl: string;
    };
    messageSnippet: string;
    requestedDate: Date; // The date the user requested the tour
    requestedTime: string; // e.g., "10:00 AM - 11:00 AM"
    status: 'pending' | 'accepted' | 'declined' | 'rescheduled';
}

// --- Mock Data ---
const mockTourRequests: TourRequest[] = [
    {
        id: 'req1',
        property: {
            name: 'Family Home',
            location: 'Ma-a, Davao City, 8000',
            imageUrl: 'https://placehold.co/80x80/E0E0E0/333333?text=Home1',
        },
        requester: {
            name: 'Juan dela Cruz',
            avatarUrl: 'https://placehold.co/40x40/CCCCCC/333333?text=JD',
        },
        messageSnippet: 'Hi, I\'m interested in scheduling a tour...',
        requestedDate: new Date(2025, 7, 10), // August 10, 2025
        requestedTime: '10:00 AM - 11:00 AM',
        status: 'pending',
    },
    {
        id: 'req2',
        property: {
            name: 'Modern Villa',
            location: 'Lanang, Davao City, 8000',
            imageUrl: 'https://placehold.co/80x80/D0D0D0/333333?text=Villa2',
        },
        requester: {
            name: 'Maria Santos',
            avatarUrl: 'https://placehold.co/40x40/CCCCCC/333333?text=MS',
        },
        messageSnippet: 'Could we arrange a visit next week?',
        requestedDate: new Date(2025, 7, 15), // August 15, 2025
        requestedTime: '02:00 PM - 03:00 PM',
        status: 'pending',
    },
    {
        id: 'req3',
        property: {
            name: 'Cozy Apartment',
            location: 'Poblacion, Davao City, 8000',
            imageUrl: 'https://placehold.co/80x80/C0C0C0/333333?text=Apt3',
        },
        requester: {
            name: 'Peter Jones',
            avatarUrl: 'https://placehold.co/40x40/CCCCCC/333333?text=PJ',
        },
        messageSnippet: 'Confirming the tour for tomorrow.',
        requestedDate: new Date(2025, 6, 30), // July 30, 2025 (today or very near future)
        requestedTime: '09:30 AM - 10:30 AM',
        status: 'accepted',
    },
    {
        id: 'req4',
        property: {
            name: 'Beach House',
            location: 'Samal Island',
            imageUrl: 'https://placehold.co/80x80/B0B0B0/333333?text=Beach4',
        },
        requester: {
            name: 'Sarah Lee',
            avatarUrl: 'https://placehold.co/40x40/CCCCCC/333333?text=SL',
        },
        messageSnippet: 'Unfortunately, I need to cancel the tour.',
        requestedDate: new Date(2025, 7, 5), // August 5, 2025
        requestedTime: '04:00 PM - 05:00 PM',
        status: 'declined',
    },
];

// --- Sub-Components ---

interface RequestListItemProps {
    request: TourRequest;
    isActive: boolean;
    onClick: (id: string) => void;
}

const RequestListItem: React.FC<RequestListItemProps> = ({ request, isActive, onClick }) => (
    <div
        className={`flex items-center w-full space-x-3 p-4 border-b cursor-pointer transition-colors duration-200 ${isActive ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'
            }`}
        onClick={() => onClick(request.id)}
    >
        <img
            src={request.requester.avatarUrl}
            alt={request.requester.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${request.requester.name.split(' ').map(n => n[0]).join('')}`;
            }}
        />
        <div className="flex-1">
            <div className="font-semibold text-gray-800">{request.requester.name}</div>
            <div className="text-sm text-gray-600 truncate">{request.messageSnippet}</div>
            <div className="text-xs text-gray-500 flex items-center mt-1">
                <Home size={12} className="mr-1" /> {request.property.name}
            </div>
        </div>
        <div className="flex flex-col items-end text-right">
            <span className="text-xs text-gray-500">{format(request.requestedDate, 'MMM dd')}</span>
            <span className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        request.status === 'declined' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
        </div>
    </div>
);

// --- Main Inbox Component ---
const InboxTourComponent: React.FC = () => {
    const [activeRequestId, setActiveRequestId] = useState<string | null>(mockTourRequests[0]?.id || null);
    const activeRequest = mockTourRequests.find(req => req.id === activeRequestId);
    // Removed: const [selectedDate, setSelectedDate] = useState<Date | undefined>(activeRequest?.requestedDate || new Date());

    // Removed: Handle date selection from calendar for rescheduling
    // const handleDateSelect = (date: Date | undefined) => {
    //   setSelectedDate(date);
    //   // In a real app, you'd likely update a state for the new proposed date for rescheduling
    // };

    return (
        <div className=" font-inter">
            <Card className="rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-64px-32px)]"> {/* Adjust height as needed */}
                {/* Left Pane: Request List */}
                <div className="w-full md:w-130 border-r border-gray-200 bg-white flex flex-col">
                    <CardHeader className="p-4 border-b">
                        <CardTitle className="text-xl font-semibold text-gray-800">Tour Requests</CardTitle>
                    </CardHeader>
                    <div className="flex-1 overflow-y-auto">
                        {mockTourRequests.length > 0 ? (
                            mockTourRequests.map(request => (
                                <RequestListItem
                                    key={request.id}
                                    request={request}
                                    isActive={request.id === activeRequestId}
                                    onClick={setActiveRequestId}
                                />
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">No tour requests found.</div>
                        )}
                    </div>
                </div>

                {/* Right Pane: Request Details & Calendar */}
                <div className="flex-1 flex flex-col bg-white">
                    {activeRequest ? (
                        <>
                            <CardHeader className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={activeRequest.property.imageUrl}
                                        alt={activeRequest.property.name}
                                        className="w-12 h-12 rounded-md object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://placehold.co/48x48/E0E0E0/333333?text=Prop';
                                        }}
                                    />
                                    <div>
                                        <CardTitle className="text-lg font-semibold text-gray-800">{activeRequest.property.name}</CardTitle>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            <MapPin size={14} className="mr-1" /> {activeRequest.property.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-3 sm:mt-0">
                                    <Button variant="outline" className="flex items-center">
                                        <Phone size={16} className="mr-2" /> Call
                                    </Button>
                                    <Button className="flex items-center bg-green-600 hover:bg-green-700">
                                        <MessageSquare size={16} className="mr-2" /> Message
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 p-4 overflow-y-auto">
                                {/* Requester Info */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <img
                                        src={activeRequest.requester.avatarUrl}
                                        alt={activeRequest.requester.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = `https://placehold.co/32x32/CCCCCC/333333?text=${activeRequest.requester.name.split(' ').map(n => n[0]).join('')}`;
                                        }}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{activeRequest.requester.name}</p>
                                        <p className="text-sm text-gray-500">Requester</p>
                                    </div>
                                </div>

                                {/* Requested Tour Details */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                                    <h3 className="font-semibold text-gray-800 mb-2">Requested Tour Details:</h3>
                                    <div className="flex items-center text-gray-700 text-sm mb-1">
                                        <CalendarCheck size={16} className="mr-2 text-green-600" />
                                        <span>Date: {format(activeRequest.requestedDate, 'PPP')}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 text-sm">
                                        <Clock size={16} className="mr-2 text-green-600" />
                                        <span>Time: {activeRequest.requestedTime}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-3">
                                        Message: "{activeRequest.messageSnippet}"
                                    </p>
                                </div>

                                {/* Tour Status Actions */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {activeRequest.status === 'pending' && (
                                        <>
                                            <Button className="bg-green-600 hover:bg-green-700 flex items-center">
                                                <CheckCircle size={16} className="mr-2" /> Accept Tour
                                            </Button>
                                            <Button variant="outline" className="flex items-center border-red-500 text-red-500 hover:bg-red-50">
                                                <XCircle size={16} className="mr-2" /> Decline Tour
                                            </Button>
                                        </>
                                    )}
                                    {activeRequest.status === 'accepted' && (
                                        <span className="text-green-600 font-semibold flex items-center">
                                            <CheckCircle size={18} className="mr-2" /> Tour Accepted!
                                        </span>
                                    )}
                                    {activeRequest.status === 'declined' && (
                                        <span className="text-red-600 font-semibold flex items-center">
                                            <XCircle size={18} className="mr-2" /> Tour Declined.
                                        </span>
                                    )}
                                </div>

                                {/* Reschedule Tour Section (Now just displays date/time) */}
                                <Card className="p-4 rounded-lg shadow-sm">
                                    <CardTitle className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <CalendarDays size={20} className="mr-2" /> Reschedule Tour
                                    </CardTitle>
                                    <div className="text-center text-gray-700 text-sm mb-4">
                                        <p>Current Requested Date: <span className="font-semibold">{format(activeRequest.requestedDate, 'PPP')}</span></p>
                                        <p>Current Requested Time: <span className="font-semibold">{activeRequest.requestedTime}</span></p>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                                            Propose New Date/Time
                                        </Button>
                                    </div>
                                </Card>
                            </CardContent>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a tour request to view details.
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default InboxTourComponent;
