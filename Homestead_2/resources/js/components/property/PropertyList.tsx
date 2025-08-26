// src/components/property/PropertyList.tsx
import React, { useState, useMemo } from "react";
import PropertyCard from "./propertyCard";
import { Property } from "@/types";

interface PropertyListProps {
    properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
    const [query, setQuery] = useState("");

    // 🧠 Smart Search Logic
    const filteredProperties = useMemo(() => {
        if (!query.trim()) return properties;

        const q = query.toLowerCase();

        return properties.filter((p) => {
            const priceLimitMatch = q.match(/under\s?(\d+[,.]?\d*)/);
            const minPriceMatch = q.match(/above\s?(\d+[,.]?\d*)/);

            const conditions = [
                // Match name / location
                p.name.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q),

                // Bedrooms
                q.includes("bedroom") ? q.includes(`${p.bedrooms} bedroom`) : true,

                // Bathrooms
                q.includes("bathroom") ? q.includes(`${p.bathrooms} bathroom`) : true,

                // For Sale / Rent
                q.includes("sale") ? p.forSale : true,
                q.includes("rent") ? p.forRent : true,

                // Size (e.g., "100sqm")
                /\d+\s?(sqm|sqft)/.test(q)
                    ? q.includes(`${p.size.toString().toLowerCase()}`)
                    : true,

                // Price filtering (e.g., "under 2000000")
                priceLimitMatch ? p.price <= parseInt(priceLimitMatch[1]) : true,
                minPriceMatch ? p.price >= parseInt(minPriceMatch[1]) : true,
            ];

            return conditions.every(Boolean);
        });
    }, [query, properties]);

    return (
        <div className="space-y-4">
            {/* 🔍 Smart Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search properties (e.g., '3 bedroom in Davao under 2M for rent')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* 🏡 Filtered Property Cards */}
            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No properties match your search.</p>
            )}
        </div>
    );
};

export default PropertyList;
