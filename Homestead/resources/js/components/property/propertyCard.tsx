// src/components/property/PropertyCard.tsx
import React from 'react';
import { Ruler, BedDouble, Bath } from 'lucide-react';
import { Property } from '@/types'; // Import the Property interface

// Define props interface for PropertyCard
interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const {
        id, // for dev only, not displayed directly on card
        name,
        location,
        size,
        bedrooms,
        bathrooms,
        price,
        agent,
        image,
        forSale,
        forRent
    } = property;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={image} alt={name} className="w-full h-60 object-cover" />
            <input type="hidden" value={id} />
            <div className="p-3 flex-grow">
                <h3 className="text-l mb-1">{name}</h3>
                <div className="flex items-center space-x-2 text-sm mb-2">
                    {forSale && (
                        <span className="inline-flex border border-green-600 items-center px-2.5 py-0.5 rounded  text-xs font-medium bg-green-100 text-green-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-1"></span> For Sale
                        </span>
                    )}
                    {forRent && (
                        <span className="inline-flex border border-orange-600 items-center px-2.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-1"></span> For Rent
                        </span>
                    )}
                </div>
                <p className="text-gray-600 text-[10px] mb-3">{location}</p>
                <div className='flex justify-between'>
                    <div className="flex items-center text-gray-700 text-[10px] space-x-2">
                        <div className="flex items-center">
                            <Ruler className="w-4 h-4 mr-1 text-green-600" />
                            <span>{size}Sqft</span>
                        </div>
                        <div className="flex items-center">
                            <BedDouble className="w-4 h-4 mr-1 text-green-600" />
                            <span>{bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1 text-green-600" />
                            <span>{bathrooms}</span>
                        </div>
                    </div>
                    <p className="mb-0 text-green-600 font-bold text-[14px]">
                        ₱{price.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className='px-3 font-bold'>
                <hr className=''/>
            </div>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-500">Agent</p>
                    </div>
                </div>
                <a href={`/Property/${id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</a>
            </div>
        </div>
    );
};

export default PropertyCard;