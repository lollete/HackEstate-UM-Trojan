// src/components/property/search-card.tsx
import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle } from 'lucide-react';

interface SearchFilters {
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    maxPrice?: number;
    forSale?: boolean;
    forRent?: boolean;
}

interface SearchCardProps {
    onSearch: (filters: SearchFilters) => void;
    onAISearch: (query: string) => Promise<void>;
}

const SearchCard: React.FC<SearchCardProps> = ({ onSearch, onAISearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({});
    const [isAISearch, setIsAISearch] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');

    const handleAISearch = async () => {
        if (!searchQuery.trim()) return;

        setAiLoading(true);
        setAiError('');
        try {
            await onAISearch(searchQuery);
        } catch (error) {
            console.error('AI search error:', error);
            setAiError('AI search encountered an issue. Using basic search instead.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleRegularSearch = () => {
        onSearch(filters);
        setAiError('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && isAISearch) {
            handleAISearch();
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Search Properties</h3>

            {/* AI Search Toggle */}
            <div className="flex items-center mb-4">
                <button
                    onClick={() => {
                        setIsAISearch(!isAISearch);
                        setAiError('');
                    }}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isAISearch
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Smart Search
                </button>
            </div>

            {aiError && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-700 text-sm">{aiError}</span>
                </div>
            )}

            {isAISearch ? (
                /* AI Search Interface */
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Describe your dream property (e.g., '3 bedroom apartment near downtown under $500k')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full p-3 border border-gray-300 rounded-md pr-10"
                            disabled={aiLoading}
                        />
                        <button
                            onClick={handleAISearch}
                            disabled={aiLoading || !searchQuery.trim()}
                            className="absolute right-2 top-2 p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                        >
                            {aiLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">
                        Our AI will understand your natural language query and find the perfect matches.
                    </p>
                </div>
            ) : (
                /* Regular Search Interface */
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            placeholder="City, address, or zipcode"
                            value={filters.location || ''}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bedrooms
                            </label>
                            <select
                                value={filters.bedrooms || ''}
                                onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) || undefined })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bathrooms
                            </label>
                            <select
                                value={filters.bathrooms || ''}
                                onChange={(e) => setFilters({ ...filters, bathrooms: parseInt(e.target.value) || undefined })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Price
                        </label>
                        <input
                            type="number"
                            placeholder="Maximum price"
                            value={filters.maxPrice || ''}
                            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || undefined })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.forSale || false}
                                onChange={(e) => setFilters({ ...filters, forSale: e.target.checked })}
                                className="rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">For Sale</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.forRent || false}
                                onChange={(e) => setFilters({ ...filters, forRent: e.target.checked })}
                                className="rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">For Rent</span>
                        </label>
                    </div>

                    <button
                        onClick={handleRegularSearch}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Search
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchCard;