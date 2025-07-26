// src/components/event/EventView.tsx
import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem, type Event } from '@/types'; // Import Event from '@/types'
import eventsData from '@/data/event'; // Adjust path as necessary to import event data
import { MapPin, Heart, Bookmark, Share2, CalendarDays, Star, ChevronLeft } from 'lucide-react'; // Import necessary icons for events
import PaymentModal from '@/components/modal/PaymentModal'; // Import the PaymentModal component

const EventView: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details'); // State for tabs
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to control modal visibility

    // Define breadcrumbs for this specific view
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Event',
            href: '/Event', // Adjusted to a general events page
        },
        {
            title: event ? event.name : 'Event Details', // Dynamic title
            href: window.location.pathname, // Current URL
        },
    ];

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        // /event/1 -> 'evt-1'
        const id = pathSegments[pathSegments.length - 1];

        if (id) {
            const foundEvent = eventsData.find(e => e.id === id);

            if (foundEvent) {
                setEvent(foundEvent);
            } else {
                setError('Event not found.');
            }
        } else {
            setError('No event ID provided in the URL.');
        }
        setLoading(false);
    }, []);
    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Loading Event" />
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <p className="text-lg text-gray-700">Loading event details...</p>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Error" />
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </AppLayout>
        );
    }

    if (!event) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="No Event Selected" />
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <p className="text-lg text-gray-700">Select an event to view its details.</p>
                </div>
            </AppLayout>
        );
    }
    const getMapEmbedUrl = (location: string) => {
        const encodedLocation = encodeURIComponent(location);
        return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />

            <div className="min-h-screen sm:p-6 lg:p-2 font-sans">
                <div className="max-w-6xl mx-auto border rounded-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col">
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/cccccc/333333?text=Event+Main+Image'; }}
                            />
                            <div className="space-x-2 flex flex-row">
                                {event.galleryImages && event.galleryImages.length > 0 ? (
                                    event.galleryImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${event.name} gallery image ${index + 1}`}
                                            className="w-30 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/120x80/cccccc/333333?text=Gallery'; }}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No additional gallery images.</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div>
                            <div className="mb-3">
                                <a href="/Event" className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium">
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Back to events
                                </a>
                            </div>
                            {/* Event Name and Price */}
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
                                <p className="text-xl font-bold text-green-600">{event.price}</p>
                            </div>

                            <p className="text-gray-700 text-base mb-4">
                                {event.description.split('See more...')[0]}
                            </p>

                            {/* Location and Date */}
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                                <p className="text-sm">{event.location}</p>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                                <CalendarDays className="w-4 h-4 mr-1 text-green-600" />
                                <p className="text-sm">{event.date}</p>
                            </div>

                            {/* Organizer Information */}
                            <div className="flex items-center text-gray-700 text-sm mb-6">
                                <span className="font-semibold mr-2">Organized by</span>
                                <img src={event.organizer.avatar} alt={event.organizer.name} className="w-6 h-6 rounded-full mr-1" />
                                <span className="font-medium text-gray-900">{event.organizer.name}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-3 mb-6">
                                <button
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200"
                                >
                                    Get tickets
                                </button>
                                <div className="flex justify-between space-x-2">
                                    <button className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-200">
                                        <Heart className="w-5 h-5 mr-2" /> Like
                                    </button>
                                    <button className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-200">
                                        <Bookmark className="w-5 h-5 mr-2" /> Bookmark
                                    </button>
                                    <button className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-200">
                                        <Share2 className="w-5 h-5 mr-2" /> Share
                                    </button>
                                </div>
                            </div>

                            <div className="border rounded-sm px-5 py-4 border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">Organizer</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={event.organizer.avatar}
                                            alt={event.organizer.name}
                                            className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-300"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/cccccc/333333?text=Organizer'; }}
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900">{event.organizer.name}</p>
                                            <p className="text-sm text-gray-600 flex items-center">
                                                {event.organizer.reviews} Reviews |
                                                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" /> {event.organizer.rating}
                                                {event.organizer.responsiveness && <span className="ml-1">• {event.organizer.responsiveness}</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-4 py-1 outline outline-green-700 rounded-sm hover:bg-green-100 text-green-700 transition duration-300 shadow-md text-sm">
                                            Contact {event.organizer.name.split(' ')[0]}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details & Reviews Tabs */}
                    <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 mt-6">
                        <div className="flex border-b border-gray-200 mb-4">
                            <button
                                className={`px-6 py-3 text-lg font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('details')}
                            >
                                Details
                            </button>
                            <button
                                className={`px-6 py-3 text-lg font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                        </div>

                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Event Description */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                                </div>

                                {/* Map Location */}
                                <div className="md:col-span-2"> {/* Span full width on medium and larger screens */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Map</h3>
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                                        <iframe
                                            src={getMapEmbedUrl(event.location)}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map of ${event.name} at ${event.location}`}
                                            className="rounded-lg shadow-md"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Reviews</h3>
                                <p className="text-gray-600">No reviews yet. Be the first to review this event!</p>
                                {/* You would typically fetch and display reviews here */}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                event={event}
            />
        </AppLayout>
    );
};

export default EventView;
