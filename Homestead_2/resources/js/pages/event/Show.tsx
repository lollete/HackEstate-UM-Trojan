// resources/js/Pages/Event/Show.tsx
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MapPin, CalendarDays, Clock, Tag, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { PaymentModal } from '@/components/modal/PaymentModal';

interface EventUser {
    id: number;
    name: string;
    avatar: string;
}

interface Event {
    id: number;
    name: string;
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    image: string;
    gallery_images: string[];
    description: string;
    type_of_event: string[];
    user: EventUser;
    participants_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    event: Event;
    isBookmarked: boolean;
    isParticipating: boolean;
}

export default function EventShow({ event, isBookmarked, isParticipating }: Props) {
    const [activeTab, setActiveTab] = useState<'details' | 'participants'>('details');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleBookmark = () => {
        router.post(`/events/${event.id}/bookmark`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setBookmarked(!bookmarked);
            },
        });
    };

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const getMapEmbedUrl = (location: string) => {
        const encodedLocation = encodeURIComponent(location);
        return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    };

    return (
        <AppLayout>
            <Head title={event.name} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-4">
                    <Link
                        href="/Event"
                        className="text-green-600 hover:text-green-800 flex items-center"
                        preserveScroll
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Events
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Event Image Gallery */}
                        <div className="md:w-1/2">
                            <div className="h-64 md:h-full">
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x400/cccccc/333333?text=Event+Image';
                                    }}
                                />
                            </div>

                            {event.gallery_images?.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 p-4">
                                    {event.gallery_images.map((image, index) => (
                                        <div key={index} className="aspect-square">
                                            <img
                                                src={image}
                                                alt={`${event.name} gallery ${index + 1}`}
                                                className="w-full h-full object-cover rounded"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://placehold.co/200x200/cccccc/333333?text=Gallery';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Event Details */}
                        <div className="md:w-1/2 p-6">
                            <div className="flex justify-between items-start">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.name}</h1>
                                <button
                                    onClick={handleBookmark}
                                    className={`p-2 rounded-full ${bookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                >
                                    <Heart className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                                <span>{event.location}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <CalendarDays className="w-4 h-4 mr-1 text-green-600" />
                                <span>{formattedDate}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-4">
                                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                                <span>
                                    {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                    {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {event.type_of_event.map((type, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                                        <Tag className="w-3 h-3 mr-1" />
                                        {type}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">About this event</h3>
                                <p className="text-gray-700">{event.description}</p>
                            </div>

                            <div className="border-t border-b border-gray-200 py-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {event.participants_count} {event.participants_count === 1 ? 'person is' : 'people are'} attending
                                </h3>

                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        ₱{event.price.toFixed(2)}
                                    </div>

                                    {isParticipating ? (
                                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
                                            You're attending!
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => setIsPaymentModalOpen(true)}
                                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                        >
                                            Get Tickets
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={event.user.avatar}
                                        alt={event.user.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/100x100/cccccc/333333?text=Avatar';
                                        }}
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">Organized by</p>
                                        <p className="text-gray-600">{event.user.name}</p>
                                    </div>
                                </div>

                                <button className="flex items-center text-gray-500 hover:text-gray-700">
                                    <Share2 className="w-4 h-4 mr-1" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-t border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`px-6 py-4 font-medium text-sm ${activeTab === 'details' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Event Details
                            </button>
                            <button
                                onClick={() => setActiveTab('participants')}
                                className={`px-6 py-4 font-medium text-sm ${activeTab === 'participants' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Participants ({event.participants_count})
                            </button>
                        </nav>

                        <div className="p-6">
                            {activeTab === 'details' ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">More About This Event</h3>
                                    <p className="text-gray-700 mb-6">{event.description}</p>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                                    <div className="h-64 w-full rounded-lg overflow-hidden">
                                        <iframe
                                            src={getMapEmbedUrl(event.location)}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map of ${event.name}`}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        {event.participants_count} {event.participants_count === 1 ? 'Person is' : 'People are'} Attending
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600">
                                            {isParticipating
                                                ? "You're attending this event!"
                                                : "Be the first to attend this event!"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
// In your Show.tsx
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                event={{
                    id: event.id,  // Now using id instead of event_id
                    name: event.name,
                    price: event.price
                }}
                onSuccess={() => router.reload()}
            />
        </AppLayout>
    );
}