// src/components/PropertyListings.tsx
import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '@/components/property/propertyCard';
import { Property } from '@/types/index';
import { ArrowUpDown } from 'lucide-react';
import { usePage } from '@inertiajs/react';

import SearchCard from '@/components/property/search-card';

const PropertyListings: React.FC = () => {
    const [sortBy, setSortBy] = useState<'Top' | 'Relevance' | 'Latest'>('Top');
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/properties');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);


    const sortedProperties = useMemo(() => {
        let sorted = [...properties];

        if (sortBy === 'Latest') {
            sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Assuming newer has higher ID
        } else if (sortBy === 'Relevance') {
            sorted.sort((a, b) => b.price - a.price); // Higher price = more relevant
        }
        return sorted;
    }, [properties, sortBy]);

    return (
        <div className="w-full flex flex-row sm:p-1 lg:p-8">
            {/* Search Sidebar */}
            <div className="h-500 mx-5 border rounded w-90">
                <SearchCard />
            </div>

            {/* Listings Section */}
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full">
                    <h2 className="text font-semibold text-gray-800 mb-4 sm:mb-0">
                        Showing {sortedProperties.length} results
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="flex text-gray-700"><ArrowUpDown className="text w-4 me-1" />Sort by:</span>
                        <div className="flex space-x-2">
                            {['Top', 'Relevance', 'Latest'].map(option => (
                                <button
                                    key={option}
                                    onClick={() => setSortBy(option as typeof sortBy)}
                                    className={`px-4 py-1 rounded-sm text-sm font-medium ${sortBy === option ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-300'
                                        } transition-colors duration-200`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="col-span-full text-center text-gray-500">Loading properties...</p>
                    ) : sortedProperties.length > 0 ? (
                        sortedProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No properties found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyListings;
