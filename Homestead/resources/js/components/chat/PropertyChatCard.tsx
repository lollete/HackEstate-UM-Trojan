import { Property } from '@/types';
import { MapPin } from 'lucide-react';

interface PropertyChatCardProps {
    property: Property;
}

const PropertyChatCard: React.FC<PropertyChatCardProps> = ({ property }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 bg-white border-b border-gray-200 gap-3 sm:gap-4">
            <img
                src={property.image}
                alt={property.name}
                className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/80x80/E5E7EB/6B7280?text=Property`;
                }}
            />
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1 sm:line-clamp-none">
                    {property.name}
                </h4>
                <p className="text-gray-700 text-sm mb-1 line-clamp-2 sm:line-clamp-none">
                    {property.details?.features?.join('. ') || 'No features listed'}
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyChatCard;
