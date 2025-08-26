import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '@/components/property/propertyCard';
import { Property } from '@/types/index';
import { ArrowUpDown } from 'lucide-react';
import SearchCard from '@/components/property/search-card';

interface SearchFilters {
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    maxPrice?: number;
    forSale?: boolean;
    forRent?: boolean;
}

const PropertyListings: React.FC = () => {
    const [sortBy, setSortBy] = useState<'Top' | 'Relevance' | 'Latest'>('Top');
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/properties');
                const data = await response.json();
                setProperties(data);
                setFilteredProperties(data); // Initialize filteredProperties with all properties
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Handle regular search
    const handleSearch = (filters: SearchFilters) => {
        setSearchFilters(filters);

        // First try to use the API search
        fetch('http://127.0.0.1:8000/api/properties/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(filters),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('API search failed');
                }
                return response.json();
            })
            .then(properties => {
                setFilteredProperties(properties);
            })
            .catch(error => {
                console.error('API search error, using client-side filtering:', error);
                // Fallback to client-side filtering
                let filtered = [...properties];

                if (filters.location) {
                    filtered = filtered.filter(property =>
                        property.location.toLowerCase().includes(filters.location!.toLowerCase())
                    );
                }

                if (filters.bedrooms) {
                    filtered = filtered.filter(property =>
                        property.bedrooms >= filters.bedrooms!
                    );
                }

                if (filters.bathrooms) {
                    filtered = filtered.filter(property =>
                        property.bathrooms >= filters.bathrooms!
                    );
                }

                if (filters.maxPrice) {
                    filtered = filtered.filter(property =>
                        property.price <= filters.maxPrice!
                    );
                }

                if (filters.forSale) {
                    filtered = filtered.filter(property =>
                        property.forSale
                    );
                }

                if (filters.forRent) {
                    filtered = filtered.filter(property =>
                        property.forRent
                    );
                }

                setFilteredProperties(filtered);
            });
    };

    // Handle AI search
    const handleAISearch = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/ai-search-get?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Search failed with status: ${response.status}`);
            }

            const properties = await response.json();
            setFilteredProperties(properties);

        } catch (error) {
            console.error('Error with AI search:', error);
            // Fallback to basic search using the query as location
            handleSearch({ location: query });
        } finally {
            setLoading(false);
        }
    };

    const sortedProperties = useMemo(() => {
        // Make sure filteredProperties is always an array
        let filtered = Array.isArray(filteredProperties) ? filteredProperties : [];
        let sorted = [...filtered];

        if (sortBy === 'Latest') {
            sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        } else if (sortBy === 'Relevance') {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    }, [filteredProperties, sortBy]);

    return (
        <div className="w-full flex flex-row sm:p-1 lg:p-8">
            {/* Search Sidebar */}
            <div className="mx-5 border rounded w-90">
                <SearchCard onSearch={handleSearch} onAISearch={handleAISearch} />
            </div>

            {/* Listings Section */}
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full">
                    <h2 className="text font-semibold text-gray-800 mb-4 sm:mb-0">
                        Showing {sortedProperties.length} results
                        {Object.keys(searchFilters).length > 0 && ' (filtered)'}
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
                        <div className="col-span-full text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading properties...</p>
                        </div>
                    ) : sortedProperties.length > 0 ? (
                        sortedProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 text-lg">No properties found.</p>
                            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyListings;