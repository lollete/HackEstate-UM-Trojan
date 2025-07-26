// src/components/EventListings.tsx
import React, { useState, useEffect, useMemo } from 'react';
import EventCard from '@/components/event/eventCard';
import initialEvents from '@/data/event'; // now correct
import { Event } from '@/types';
import { ArrowUpDown } from 'lucide-react';
import SearchCard from '@/components/property/search-card';

const EventListings: React.FC = () => {
    const [sortBy, setSortBy] = useState<'Top' | 'Relevance' | 'Latest'>('Top');
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        setEvents(initialEvents); 
    }, []);

    const sortedEvents = useMemo(() => {
        let sorted = [...events];
        if (sortBy === 'Latest') {
            sorted.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        } else if (sortBy === 'Relevance') {
            sorted.sort((a, b) => b.name.length - a.name.length);
        }
        return sorted;
    }, [events, sortBy]);

    return (
        <div className="w-full flex flex-row sm:p-1 lg:p-8">
            <div className='h-500 mx-5 border rounded w-90'>
                <SearchCard />
            </div>
            <div className='w-full'>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full">
                    <h2 className="text font-semibold text-gray-800 mb-4 sm:mb-0">
                        Showing {sortedEvents.length} results
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="flex text-gray-700">
                            <ArrowUpDown className='text w-4 me-1' />Sort by:
                        </span>
                        <div className="flex space-x-2">
                            {['Top', 'Relevance', 'Latest'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSortBy(type as any)}
                                    className={`px-4 py-1 rounded-sm text-sm ${sortBy === type ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-300'} transition-colors duration-200`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedEvents.length > 0 ? (
                        sortedEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventListings;
