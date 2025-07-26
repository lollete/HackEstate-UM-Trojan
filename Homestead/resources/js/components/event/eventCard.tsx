// src/components/event/EventCard.tsx
import React from 'react';
import { MapPin, CalendarDays } from 'lucide-react'; // Using MapPin for location and CalendarDays for date
import { Event } from '@/types'; // Import the Event interface

// Define props interface for EventCard
interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const {
        id, // for dev only, not displayed directly on card
        name,
        location,
        date,
        price,
        organizer, // Changed from agent to organizer
        image,
        typeOfEvent // Added to potentially display event type tags if needed in the future
    } = event;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={image} alt={name} className="w-full h-40 object-cover" />
            <input type="hidden" value={id} />
            <div className="p-3 flex-grow">
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <CalendarDays className="w-4 h-4 mr-1 text-green-600" />
                    <span>{date}</span>
                </div>
                <p className="mb-0 text-green-600 font-bold text-base">
                    {price}
                </p>
            </div>
            <div className='px-3 font-bold'>
                <hr className='' />
            </div>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={organizer.avatar} alt={organizer.name} className="w-10 h-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{organizer.name}</p>
                        <p className="text-xs text-gray-500">Organizer</p> {/* Changed "Agent" to "Organizer" */}
                    </div>
                </div>
                <a href={`/Event/${id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</a>
            </div>
        </div>
    );
};

export default EventCard;
