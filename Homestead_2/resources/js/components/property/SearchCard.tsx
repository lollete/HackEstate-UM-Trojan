import React from "react";

interface SearchCardProps {
    query: string;
    setQuery: (value: string) => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ query, setQuery }) => {
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search properties (e.g., '3 bedroom in Davao under 2M for rent')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
};

export default SearchCard;
