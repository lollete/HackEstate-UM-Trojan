import React, { useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { EventCard } from '@/components/event/eventCard';

const EventListing: React.FC = () => {
    const page = usePage().props as unknown as {
        events: { data: any[] };
        sort: string;
    };

    const events = page.events.data;
    const [sortBy, setSortBy] = useState<'Top' | 'Relevance' | 'Latest'>(page.sort as any);

    const sortedEvents = useMemo(() => {
        let sorted = [...events];
        if (sortBy === 'Latest') {
            sorted.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        } else if (sortBy === 'Relevance') {
            sorted.sort((a, b) => b.name.length - a.name.length);
        }
        return sorted;
    }, [events, sortBy]);

    return (
        <div className="w-full">
            <div className="flex justify-end mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => {
                        window.location.href = `?sort=${e.target.value.toLowerCase()}`;
                    }}
                    className="border p-2 rounded"
                >
                    <option value="Top">Top</option>
                    <option value="Latest">Latest</option>
                    <option value="Relevance">Relevance</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                    <EventCard
                        key={event.event_id}
                        event={{
                            id: event.event_id,
                            name: event.name,
                            location: event.location,
                            date: event.date,
                            price: event.price,
                            image: event.image,
                            user: event.user
                        }}
                    />
                ))} : {
                    <h1>No Event</h1>
                }
            </div>
        </div>
    );
};

export default EventListing;
