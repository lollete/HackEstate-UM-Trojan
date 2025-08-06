import React, { useState, useMemo } from 'react';

// --- 1. Interface Definitions ---
// Define the interface for an Event object
interface Event {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    start_time: string; // HH:MM
    end_time: string; // HH:MM
    location: string;
    description: string;
    status: 'published' | 'archived' | 'draft';
    type: string;
    price: number;
    image?: string; // Optional image URL
}

// --- 2. Dummy Data Generation ---
// Function to generate a large array of dummy event data
const generateDummyEvents = (count: number): Event[] => {
    const types = ['conference', 'seminar', 'workshop', 'meetup', 'webinar', 'exhibition', 'festival', 'other'];
    const locations = ['SMX Convention Center, Davao City', 'Ayala Malls Activity Center, Davao City', 'Online', 'Park Inn by Radisson, Davao City', 'World Trade Center, Davao City', 'Malagos Garden Resort, Davao City'];
    const statuses = ['published', 'archived', 'draft'];
    const descriptions = [
        'A deep dive into the latest industry trends and innovations. Networking opportunities included.',
        'Hands-on workshop to learn practical skills in web development. Bring your laptop!',
        'An exclusive gathering for startups to pitch their ideas to investors and mentors.',
        'Explore sustainable practices for a greener future. Open to all environmental advocates.',
        'Celebration of local arts and culture featuring live performances and artisan crafts.',
        'Annual summit bringing together leaders and experts from various sectors.',
        'Community cleanup drive to preserve our natural environment. Volunteers welcome.',
        'Virtual event focusing on advanced data science techniques. Interactive Q&A session.',
        'Local food fair showcasing the best culinary delights from Davao region.',
        'Family-friendly event with games, rides, and entertainment for all ages.'
    ];
    const baseDate = new Date('2025-07-30'); // Starting from today in Davao City

    return Array.from({ length: count }, (_, i) => {
        const eventDate = new Date(baseDate);
        eventDate.setDate(baseDate.getDate() + i * (Math.floor(Math.random() * 5) + 1)); // Events spread out

        const randomHourStart = String(Math.floor(Math.random() * (17 - 8 + 1)) + 8).padStart(2, '0'); // 08-17
        const randomHourEnd = String(parseInt(randomHourStart) + Math.floor(Math.random() * 4) + 1).padStart(2, '0'); // 1-4 hours later

        return {
            id: `evt-${i + 1}`,
            name: `Davao ${types[i % types.length].replace(/\b\w/g, char => char.toUpperCase())} Series ${i + 1}`,
            date: eventDate.toISOString().split('T')[0],
            start_time: `${randomHourStart}:00`,
            end_time: `${randomHourEnd}:00`,
            location: locations[i % locations.length],
            description: descriptions[i % descriptions.length],
            status: statuses[i % statuses.length] as 'published' | 'archived' | 'draft',
            type: types[i % types.length],
            price: i % 4 === 0 ? 0 : parseFloat((Math.random() * (1500 - 50) + 50).toFixed(2)), // Price between 50 and 1500 or free
            image: `https://picsum.photos/id/${100 + i}/300/200`,
        };
    });
};

const initialEvents = generateDummyEvents(50); // Generate 50 dummy events for the table

// --- 3. Main Event Management Dashboard Component ---
// This component now encapsulates all logic and rendering for the event table.
const EventManagementDashboard: React.FC = () => {
    // State for the main list of events
    const [events, setEvents] = useState<Event[]>(initialEvents);

    // State for table features (search, sort, pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Event | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const eventsPerPage = 8; // Number of events to display per page

    // --- Helper Functions for Table Rendering ---
    const renderStatusBadge = (status: Event['status']) => {
        let colorClass = '';
        switch (status) {
            case 'published':
                colorClass = 'bg-green-100 text-green-800';
                break;
            case 'archived':
                colorClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'draft':
                colorClass = 'bg-blue-100 text-blue-800';
                break;
            default:
                colorClass = 'bg-gray-100 text-gray-800';
        }
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatPrice = (price: number) => {
        return price === 0 ? 'Free' : `₱${price.toFixed(2)}`;
    };

    // --- Data Filtering and Sorting Logic (Memoized for performance) ---
    const filteredAndSortedEvents = useMemo(() => {
        let filtered = events.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortColumn) {
            filtered.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0; // Fallback for other types
            });
        }
        return filtered;
    }, [events, searchTerm, sortColumn, sortDirection]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage);
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const currentEvents = filteredAndSortedEvents.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSort = (column: keyof Event) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIndicator = (column: keyof Event) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    // --- Action Handlers (These would interact with your actual backend/API) ---
    const handleEditEvent = (eventId: string) => {
        console.log(`[Action] Edit event with ID: ${eventId}`);
        alert(`Simulating edit action for event ID: ${eventId}`);
        // In a real application, you would typically:
        // 1. Fetch the specific event data using eventId.
        // 2. Open an edit modal or navigate to an edit form, pre-filling it.
    };

    const handleToggleStatus = (eventId: string, currentStatus: 'published' | 'archived' | 'draft') => {
        console.log(`[Action] Toggle status for event ID: ${eventId}. Current status: ${currentStatus}`);
        // In a real application, you would:
        // 1. Make an API call to your backend to update the event's status.
        // 2. On success, update the local state to reflect the change.
        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId
                    ? { ...event, status: currentStatus === 'published' ? 'archived' : 'published' } // Simple toggle for demo
                    : event
            )
        );
        alert(`Simulating status toggle for event ${eventId}. New status: ${currentStatus === 'published' ? 'Archived' : 'Published'}.`);
    };

    const handleViewDetails = (eventId: string) => {
        console.log(`[Action] View details for event ID: ${eventId}`);
        // In a real application, you would:
        // 1. Fetch comprehensive details for eventId.
        // 2. Open a dedicated details modal or navigate to a full event details page.
        const eventDetails = events.find(event => event.id === eventId);
        if (eventDetails) {
            alert(
                `Detailed View for "${eventDetails.name}":\n\n` +
                `ID: ${eventDetails.id}\n` +
                `Date: ${eventDetails.date} (${eventDetails.start_time} - ${eventDetails.end_time})\n` +
                `Location: ${eventDetails.location}\n` +
                `Type: ${eventDetails.type}\n` +
                `Price: ${eventDetails.price === 0 ? 'Free' : `₱${eventDetails.price.toFixed(2)}`}\n` +
                `Status: ${eventDetails.status.toUpperCase()}\n` +
                `Description: ${eventDetails.description}\n` +
                `Image URL: ${eventDetails.image || 'N/A'}`
            );
        }
    };

    const handleDeleteEvent = (eventId: string) => {
        console.log(`[Action] Attempting to delete event with ID: ${eventId}`);
        if (window.confirm(`Are you sure you want to delete event "${events.find(e => e.id === eventId)?.name || eventId}"? This action cannot be undone.`)) {
            // In a real application, you would:
            // 1. Make an API call to delete the event from your backend.
            // 2. On success, update the local state to remove the event.
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            alert(`Simulating deletion of event: ${eventId}. It has been removed from the list.`);
        } else {
            console.log(`Deletion cancelled for event: ${eventId}`);
        }
    };

    return (
        <div className="min-h-screenp-4 sm:p-6 lg:p-8">
            <div className=" mx-auto">
            
                <div className="bg-white border rounded-lg p-6 md:p-8">

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search events (name, location, type, description)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on new search
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                    </div>

                    {filteredAndSortedEvents.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg mb-2">No events found matching your criteria.</p>
                            <p>Try adjusting your search or creating a new event!</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {/* Table Headers with Sorting */}
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('name')}
                                            >
                                                Event Name {getSortIndicator('name')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('date')}
                                            >
                                                Date & Time {getSortIndicator('date')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('location')}
                                            >
                                                Location {getSortIndicator('location')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('type')}
                                            >
                                                Type {getSortIndicator('type')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('price')}
                                            >
                                                Price {getSortIndicator('price')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('status')}
                                            >
                                                Status {getSortIndicator('status')}
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentEvents.map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{event.name}</div>
                                                    <div className="text-xs text-gray-500 max-w-xs truncate">{event.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.date}</div>
                                                    <div className="text-xs text-gray-500">{event.start_time} - {event.end_time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 capitalize">{event.type}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{formatPrice(event.price)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {renderStatusBadge(event.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        {/* <button
                                                            onClick={() => onViewDetails(event.id)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button> */}
                                                        <button
                                                            onClick={() => handleEditEvent(event.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                                                            title="Edit Event"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(event.id, event.status)}
                                                            className={`p-1 rounded-md hover:opacity-80 transition-colors ${event.status === 'published'
                                                                    ? 'text-yellow-600 hover:bg-yellow-50'
                                                                    : 'text-green-600 hover:bg-green-50'
                                                                }`}
                                                            title={event.status === 'published' ? 'Archive Event' : 'Publish Event'}
                                                        >
                                                            {event.status === 'published' ? (
                                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEvent(event.id)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                                                            title="Delete Event"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-6">
                                <span className="text-sm text-gray-700">
                                    Showing {Math.min(startIndex + 1, filteredAndSortedEvents.length)} to {Math.min(endIndex, filteredAndSortedEvents.length)} of {filteredAndSortedEvents.length} events
                                </span>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventManagementDashboard;