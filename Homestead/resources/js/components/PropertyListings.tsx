// src/components/PropertyListings.tsx
import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '@/components/property/propertyCard';
import initialProperties from '@/data/property'; // This will now be property.ts
import { Property } from '@/types/index'; // Import the Property interface
import { ArrowUpDown } from 'lucide-react';
import SearchCard from '@/components/property/search-card'
const PropertyListings: React.FC = () => {
    // Define the type for sortBy state
    const [sortBy, setSortBy] = useState<'Top' | 'Relevance' | 'Latest'>('Top');
    // Define the type for properties state
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        setProperties(initialProperties);
    }, []);

    const sortedProperties = useMemo(() => {
        let sorted = [...properties];
        if (sortBy === 'Latest') {
            // Assuming `Property` now has a `createdAt` field (string in ISO format)
            // If not, use `id` or another numeric/sortable field for example
            sorted.sort((a, b) => {
                //for 'createdAt' date
                // if (a.createdAt && b.createdAt) {
                //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                // }
                // Fallback to ID if no createdAt
                return parseInt(b.id) - parseInt(a.id);
            });
        } else if (sortBy === 'Relevance') {
            // Implement your relevance sorting logic here.
            // For example, sort by price (descending for higher price = more relevant perhaps?)
            sorted.sort((a, b) => b.price - a.price);
        }
        // 'Top' will return the default or current order
        return sorted;
    }, [properties, sortBy]);

    return (
        <div className="w-full flex flex-row sm:p-1 lg:p-8">
        {/* Listing */}
            <div className='h-500 mx-5 border rounded w-90'>
                <SearchCard/>
            </div>
            <div className='w-full'>
            
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full">
                    <h2 className="text font-semibold text-gray-800 mb-4 sm:mb-0">
                        Showing {sortedProperties.length} results
                    </h2>
                    <div className="flex items-center space-x-4">
                            <span className="flex text-gray-700"><ArrowUpDown className='text w-4 me-1'/>Sort by:</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSortBy('Top')}
                                className={`px-4 py-1 rounded-sm text-sm   ${sortBy === 'Top' ? 'bg-green-700 text-white' : ' text-gray-700 hover:bg-gray-300'
                                    } transition-colors duration-200`}
                            >
                                Top
                            </button>
                            <button
                                onClick={() => setSortBy('Relevance')}
                                className={`px-4 py-1 rounded-sm text-sm font-medium ${sortBy === 'Relevance' ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-300'
                                    } transition-colors duration-200`}
                            >
                                Relevance
                            </button>
                            <button
                                onClick={() => setSortBy('Latest')}
                                className={`px-4     py-1  rounded-sm text-sm font-medium ${sortBy === 'Latest' ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-300'
                                    } transition-colors duration-200`}>
                                Latest
                            </button>
                        </div>
                    </div>
                </div>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProperties.length > 0 ? (
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