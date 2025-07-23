import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarDays, MapPin, Info, X, Ticket, AlertCircle } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    link?: string;
}

const PhilippinesEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                // Fetch from multiple public APIs
                const [publicEvents, holidays] = await Promise.all([
                    // Public events from Eventherder (Philippines events)
                    axios.get('https://eventherder.com/api/v1/events?country=PH'),

                    // Philippines public holidays
                    axios.get('https://date.nager.at/api/v3/PublicHolidays/2024/PH')
                ]);

                // Transform data to common format
                const transformedEvents = [
                    ...publicEvents.data.map((event: any) => ({
                        id: event.id,
                        title: event.title,
                        description: event.description || 'No description available',
                        date: event.date,
                        location: event.venue?.name || 'Location not specified',
                        imageUrl: event.image,
                        link: event.url
                    })),
                    ...holidays.data.map((holiday: any) => ({
                        id: `holiday-${holiday.date}`,
                        title: holiday.name,
                        description: 'Philippine Public Holiday',
                        date: holiday.date,
                        location: 'Nationwide',
                        imageUrl: 'https://via.placeholder.com/400x200?text=Public+Holiday'
                    }))
                ];

                // Sort by date
                transformedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                setEvents(transformedEvents);
            } catch (err) {
                setError('Failed to fetch events. Using sample data instead.');
                console.error('Error fetching events:', err);

                // Fallback sample data
                setEvents([
                    {
                        id: '1',
                        title: 'Manila International Book Fair',
                        description: 'Annual book fair featuring local and international publishers.',
                        date: '2024-09-12',
                        location: 'SMX Convention Center, Manila',
                        imageUrl: 'https://via.placeholder.com/400x200?text=Book+Fair'
                    },
                    {
                        id: '2',
                        title: 'Independence Day',
                        description: 'Philippine Independence Day celebrations',
                        date: '2024-06-12',
                        location: 'Nationwide',
                        imageUrl: 'https://via.placeholder.com/400x200?text=Independence+Day'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-PH', options);
    };

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    if (loading) {
        return (
            <div className="text-center py-8 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="inline-flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                    <AlertCircle className="mr-2 h-6 w-6" />
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events in the Philippines</h1>

            {events.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No upcoming events found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event+Image'}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{event.title}</h2>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    <span className="line-clamp-1">{event.location}</span>
                                </div>
                                <button
                                    onClick={() => openModal(event)}
                                    className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                                >
                                    <Info className="mr-1 h-4 w-4" /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <img
                                src={selectedEvent.imageUrl || 'https://via.placeholder.com/800x400?text=Event+Image'}
                                alt={selectedEvent.title}
                                className="w-full h-64 object-cover mb-4 rounded"
                            />

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {selectedEvent.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Date</h3>
                                    <div className="flex items-center text-gray-700">
                                        <CalendarDays className="mr-2 h-5 w-5" />
                                        <span>{formatDate(selectedEvent.date)}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                                    <div className="flex items-start text-gray-700">
                                        <MapPin className="mr-2 mt-1 h-5 w-5" />
                                        <span>{selectedEvent.location}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedEvent.link && (
                                <a
                                    href={selectedEvent.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    <Ticket className="h-4 w-4" /> More Information
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhilippinesEvents;