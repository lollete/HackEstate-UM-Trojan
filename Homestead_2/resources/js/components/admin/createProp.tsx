import React, { useState, useMemo } from 'react';
// Lucide React Icons for Property Form and Event Table actions
import { Home, MapPin, DollarSign, Bed, Bath, Maximize, Image as ImageIcon, PlusCircle, X as CloseIcon } from 'lucide-react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// --- 1. Interface Definitions ---

// Interface for the Property Listing Form data
interface ListingFormData {
    propertyName: string;
    listingType: 'forSale' | 'forRent' | '';
    price: number | null;
    location: string;
    bedrooms: number | null;
    bathrooms: number | null;
    sizeSqFt: number | null;
    description: string;
    imageUrl: string; // Placeholder for image upload
}

// Interface for an Event object (used in the Event Table)
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

// --- 2. Dummy Data Generation for Events ---

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
    const baseDate = new Date('2025-07-30T00:00:00');

    return Array.from({ length: count }, (_, i) => {
        const eventDate = new Date(baseDate);
        eventDate.setDate(baseDate.getDate() + i * (Math.floor(Math.random() * 5) + 1));

        const randomHourStart = String(Math.floor(Math.random() * (17 - 8 + 1)) + 8).padStart(2, '0');
        const randomHourEnd = String(parseInt(randomHourStart) + Math.floor(Math.random() * 4) + 1).padStart(2, '0');

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
            price: i % 4 === 0 ? 0 : parseFloat((Math.random() * (1500 - 50) + 50).toFixed(2)),
            image: `https://picsum.photos/id/${100 + i}/300/200`,
        };
    });
};

const initialEvents = generateDummyEvents(50);

// --- 3. Main Integrated Management Dashboard Component ---
const IntegratedManagementDashboard: React.FC = () => {
    // State for the Property Listing Form
    const [listingFormData, setListingFormData] = useState<ListingFormData>({
        propertyName: '',
        listingType: '',
        price: null,
        location: '',
        bedrooms: null,
        bathrooms: null,
        sizeSqFt: null,
        description: '',
        imageUrl: '',
    });

    // State to control modal visibility for the property listing form
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);

    // State for the Event Management Table
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Event | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const eventsPerPage = 8;

    // --- Property Form Handlers ---
    const handleListingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        setListingFormData(prev => ({
            ...prev,
            [id]: type === 'number' ? (value ? parseFloat(value) : null) : value,
        }));
    };

    const handleListingSelectChange = (id: keyof ListingFormData, value: string) => {
        setListingFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleListingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Property Listing Data Submitted:', listingFormData);
        alert('Property listing creation form submitted! Check console for data.');
        // Close modal and reset form on successful submission
        setIsListingModalOpen(false);
        setListingFormData({
            propertyName: '',
            listingType: '',
            price: null,
            location: '',
            bedrooms: null,
            bathrooms: null,
            sizeSqFt: null,
            description: '',
            imageUrl: '',
        });
    };

    // --- Event Table Helper Functions ---
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

    // --- Event Data Filtering and Sorting Logic (Memoized for performance) ---
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
                return 0;
            });
        }
        return filtered;
    }, [events, searchTerm, sortColumn, sortDirection]);

    // --- Event Table Pagination Logic ---
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

    // --- Event Table Action Handlers (Simulated API calls) ---
    const handleEditEvent = (eventId: string) => {
        console.log(`[Event Action] Edit event with ID: ${eventId}`);
        alert(`Simulating edit action for event ID: ${eventId}`);
    };

    const handleToggleStatus = (eventId: string, currentStatus: 'published' | 'archived' | 'draft') => {
        console.log(`[Event Action] Toggle status for event ID: ${eventId}. Current status: ${currentStatus}`);
        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId
                    ? { ...event, status: currentStatus === 'published' ? 'archived' : 'published' }
                    : event
            )
        );
        alert(`Simulating status toggle for event ${eventId}. New status: ${currentStatus === 'published' ? 'Archived' : 'Published'}.`);
    };

    const handleViewDetails = (eventId: string) => {
        console.log(`[Event Action] View details for event ID: ${eventId}`);
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
        console.log(`[Event Action] Attempting to delete event with ID: ${eventId}`);
        if (window.confirm(`Are you sure you want to delete event "${events.find(e => e.id === eventId)?.name || eventId}"? This action cannot be undone.`)) {
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            alert(`Simulating deletion of event: ${eventId}. It has been removed from the list.`);
        } else {
            console.log(`Deletion cancelled for event: ${eventId}`);
        }
    };

    return (
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8 font-inter">
            <div className="container mx-auto space-y-10">
             

                {/* Button to Open Listing Form Modal */}
                <div className="text-end mb-8">
                    <Button
                        onClick={() => setIsListingModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01]"
                    >
                        <PlusCircle size={20} className="mr-2" /> Create Listing
                    </Button>
                </div>

                {/* --- Property Listing Form Modal --- */}
                {isListingModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                        <Card className="w-full max-w-2xl overflow-y-auto max-h-[90vh]"> {/* Added overflow-y-auto and max-h */}
                            <CardHeader className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10"> {/* Sticky header */}
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-3xl font-extrabold text-gray-800 flex items-center">
                                        <PlusCircle size={28} className="mr-3 text-green-600" /> Create New Property Listing
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsListingModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-800"
                                    >
                                        <CloseIcon size={24} />
                                    </Button>
                                </div>
                                <CardDescription className="text-gray-600 mt-2 text-base">
                                    Fill in the details below to add a new property listing to your portfolio.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                <form onSubmit={handleListingSubmit} className="space-y-7">
                                    {/* Property Name */}
                                    <div>
                                        <label htmlFor="propertyName" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Property Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="propertyName"
                                            type="text"
                                            placeholder="e.g., Spacious Family Home"
                                            value={listingFormData.propertyName}
                                            onChange={handleListingFormChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Listing Type and Price */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="listingType" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Listing Type <span className="text-red-500">*</span>
                                            </label>
                                            <Select value={listingFormData.listingType} onValueChange={(value) => handleListingSelectChange('listingType', value)}>
                                                <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="forSale">For Sale</SelectItem>
                                                    <SelectItem value="forRent">For Rent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Price <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="e.g., 5000000"
                                                value={listingFormData.price === null ? '' : listingFormData.price}
                                                onChange={handleListingFormChange}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Location <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="location"
                                            type="text"
                                            placeholder="e.g., Ma-a, Davao City, 8000"
                                            value={listingFormData.location}
                                            onChange={handleListingFormChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Bedrooms, Bathrooms, Size */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Bedrooms
                                            </label>
                                            <Input
                                                id="bedrooms"
                                                type="number"
                                                placeholder="e.g., 3"
                                                value={listingFormData.bedrooms === null ? '' : listingFormData.bedrooms}
                                                onChange={handleListingFormChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Bathrooms
                                            </label>
                                            <Input
                                                id="bathrooms"
                                                type="number"
                                                placeholder="e.g., 2"
                                                value={listingFormData.bathrooms === null ? '' : listingFormData.bathrooms}
                                                onChange={handleListingFormChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="sizeSqFt" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Size (sq. ft.)
                                            </label>
                                            <Input
                                                id="sizeSqFt"
                                                type="number"
                                                placeholder="e.g., 1500"
                                                value={listingFormData.sizeSqFt === null ? '' : listingFormData.sizeSqFt}
                                                onChange={handleListingFormChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Description
                                        </label>
                                        <Textarea
                                            id="description"
                                            placeholder="Provide a detailed description of the property..."
                                            value={listingFormData.description}
                                            onChange={handleListingFormChange}
                                            rows={5}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-y text-gray-800 placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Image Upload (Placeholder) */}
                                    <div>
                                        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Property Image (URL)
                                        </label>
                                        <Input
                                            id="imageUrl"
                                            type="text"
                                            placeholder="e.g., https://example.com/property-image.jpg"
                                            value={listingFormData.imageUrl}
                                            onChange={handleListingFormChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">For demonstration, use an image URL. In a real app, this would be a file upload.</p>
                                    </div>

                                    {/* Submit Button */}
                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3.5 text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                        Create Listing
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- Event Management Table Section --- */}
                <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mt-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Property Management</h2>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Search events (name, location, type, description)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
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
                                                        <button
                                                            onClick={() => handleViewDetails(event.id)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
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
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntegratedManagementDashboard;