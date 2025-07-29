import React, { useState } from 'react';
import { Home, MapPin, DollarSign, Bed, Bath, Maximize, Image as ImageIcon, PlusCircle } from 'lucide-react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// --- Data Interfaces (can be moved to '@/types' if desired) ---
interface ListingFormData {
    propertyName: string;
    listingType: 'forSale' | 'forRent' | '';
    price: number | null;
    location: string;
    bedrooms: number | null;
    bathrooms: number | null;
    sizeSqFt: number | null;
    description: string;
    imageUrl: string; // Placeholder for image upload
}

// --- Main CreateListingForm Component ---
const CreateListingForm: React.FC = () => {
    const [formData, setFormData] = useState<ListingFormData>({
        propertyName: '',
        listingType: '',
        price: null,
        location: '',
        bedrooms: null,
        bathrooms: null,
        sizeSqFt: null,
        description: '',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'number' ? (value ? parseFloat(value) : null) : value,
        }));
    };

    const handleSelectChange = (id: keyof ListingFormData, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Listing Data Submitted:', formData);
        // Here you would typically send this data to your Laravel backend
        alert('Listing creation form submitted! Check console for data.');
        // Reset form or show success message
    };

    return (
        <div className=" sm:p-6  min-h-screen font-inter flex justify-center items-center">
            <Card className="w-full">
                <CardHeader className="p-6 border-b border-gray-200 bg-white rounded-t-xl">
                    <CardTitle className="text-3xl font-extrabold text-gray-800 flex items-center">
                        <PlusCircle size={28} className="mr-3 text-green-600" /> Create New Listing
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2 text-base">
                        Fill in the details below to add a new property listing to your portfolio.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white rounded-b-xl">
                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Property Name */}
                        <div>
                            <label htmlFor="propertyName" className="block text-sm font-semibold text-gray-800 mb-2">
                                Property Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="propertyName"
                                type="text"
                                placeholder="e.g., Spacious Family Home"
                                value={formData.propertyName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                            />
                        </div>

                        {/* Listing Type and Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="listingType" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Listing Type <span className="text-red-500">*</span>
                                </label>
                                <Select value={formData.listingType} onValueChange={(value) => handleSelectChange('listingType', value)}>
                                    <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800"> {/* Added py-2.5, text-gray-800 */}
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="forSale">For Sale</SelectItem>
                                        <SelectItem value="forRent">For Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="e.g., 5000000"
                                    value={formData.price === null ? '' : formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="e.g., Ma-a, Davao City, 8000"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                            />
                        </div>

                        {/* Bedrooms, Bathrooms, Size */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Bedrooms
                                </label>
                                <Input
                                    id="bedrooms"
                                    type="number"
                                    placeholder="e.g., 3"
                                    value={formData.bedrooms === null ? '' : formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                                />
                            </div>
                            <div>
                                <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Bathrooms
                                </label>
                                <Input
                                    id="bathrooms"
                                    type="number"
                                    placeholder="e.g., 2"
                                    value={formData.bathrooms === null ? '' : formData.bathrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                                />
                            </div>
                            <div>
                                <label htmlFor="sizeSqFt" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Size (sq. ft.)
                                </label>
                                <Input
                                    id="sizeSqFt"
                                    type="number"
                                    placeholder="e.g., 1500"
                                    value={formData.sizeSqFt === null ? '' : formData.sizeSqFt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Provide a detailed description of the property..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-y text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                            />
                        </div>

                        {/* Image Upload (Placeholder) */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-800 mb-2">
                                Property Image (URL)
                            </label>
                            <Input
                                id="imageUrl"
                                type="text"
                                placeholder="e.g., https://example.com/property-image.jpg"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400" // Added py-2.5, text-gray-800, placeholder-gray-400
                            />
                            <p className="text-xs text-gray-500 mt-2">For demonstration, use an image URL. In a real app, this would be a file upload.</p>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3.5 text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"> {/* Increased py-3.5, added focus ring */}
                            Create Listing
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateListingForm;
