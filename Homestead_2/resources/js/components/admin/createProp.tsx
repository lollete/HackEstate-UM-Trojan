import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Home, MapPin, DollarSign, Bed, Bath, Maximize, Image as ImageIcon, PlusCircle, X as CloseIcon, Edit, Eye, Trash2, Repeat, MoreHorizontal, Upload } from 'lucide-react';

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- 1. Interface Definitions ---

interface PropertyListing {
    id: string;
    propertyName: string;
    listingType: 'forSale' | 'forRent' | '';
    price: number | null;
    location: string;
    numBedrooms: number | null;
    numBathrooms: number | null;
    areaSqFt: number | null;
    description: string;
    imageUrl: string[]; // Array of image URLs (can include Data URLs for local previews)
    status: 'available' | 'pending' | 'sold' | 'rented' | 'draft';
}

// --- 2. Dummy Data Generation for Property Listings (Simulating AdminController Data) ---

const generateDummyListings = (count: number): PropertyListing[] => {
    const propertyTypes = ['house', 'condo', 'apartment', 'land', 'commercial'];
    const locations = ['Ma-a, Davao City', 'Bajada, Davao City', 'Cabantian, Davao City', 'Toril, Davao City', 'Catalunan Grande, Davao City'];
    const statuses = ['available', 'pending', 'sold', 'rented', 'draft'];
    const descriptions = [
        'A beautiful family home with a spacious garden and modern amenities.',
        'Luxurious condominium unit with a stunning city view, close to central business district.',
        'Affordable apartment perfect for students or young professionals, near universities.',
        'Prime commercial lot suitable for office buildings or retail development.',
        'Expansive land for future development, excellent investment opportunity.',
        'Cozy bungalow with two bedrooms, ideal for a small family.',
        'High-rise condo with premium facilities, including a gym and swimming pool.',
        'Beachfront property, perfect for a vacation home or resort development.',
        'Industrial warehouse with ample space and easy access to major roads.',
        'Townhouse with three levels, multiple bathrooms, and a private garage.',
    ];

    return Array.from({ length: count }, (_, i) => {
        const listingType = i % 2 === 0 ? 'forSale' : 'forRent';
        const status = statuses[i % statuses.length] as PropertyListing['status'];

        const numImages = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 images
        const imageUrls = Array.from({ length: numImages }, (_, imgIdx) =>
            `https://placehold.co/300x200/ADD8E6/000000?text=Property+${i + 1}+Img+${imgIdx + 1}`
        );

        return {
            id: `prop-${i + 1}`,
            propertyName: `${propertyTypes[i % propertyTypes.length].charAt(0).toUpperCase() + propertyTypes[i % propertyTypes.length].slice(1)} in ${locations[i % locations.length]}`,
            listingType: listingType,
            price: listingType === 'forSale'
                ? parseFloat((Math.random() * (20000000 - 1000000) + 1000000).toFixed(2))
                : parseFloat((Math.random() * (50000 - 10000) + 10000).toFixed(2)),
            location: locations[i % locations.length],
            numBedrooms: Math.floor(Math.random() * 5) + 1,
            numBathrooms: Math.floor(Math.random() * 3) + 1,
            areaSqFt: Math.floor(Math.random() * (3000 - 500) + 500),
            description: descriptions[i % descriptions.length],
            imageUrl: imageUrls,
            status: status,
        };
    });
};

const initialListings = generateDummyListings(50);

// --- Custom Confirmation Modal Component ---
interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-sm rounded-lg shadow-xl">
                <CardHeader className="p-4 sm:p-6 border-b border-gray-200">
                    <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <p className="text-gray-700">{message}</p>
                    <div className="flex justify-end space-x-3">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


// --- 3. Main Integrated Management Dashboard Component ---
const IntegratedManagementDashboard: React.FC = () => {
    // Define initial empty form data for a new listing
    const initialListingFormData: PropertyListing = {
        id: '',
        propertyName: '',
        listingType: '',
        price: null,
        location: '',
        numBedrooms: null,
        numBathrooms: null,
        areaSqFt: null,
        description: '',
        imageUrl: [], // Initialize as empty array
        status: 'draft',
    };

    // State for the Property Listing Form (used for create/edit)
    const [listingFormData, setListingFormData] = useState<PropertyListing>(initialListingFormData);
    const [newImageUrl, setNewImageUrl] = useState<string>(''); // State for the single image URL input
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

    // State for the currently viewed/edited listing (for the modal)
    const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);

    // State to control modal visibility for the property listing form
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    type ModalAction = 'create' | 'edit' | 'view';
    const [currentModalAction, setCurrentModalAction] = useState<ModalAction>('create');


    // State for the Property Listings Management Table
    const [listings, setListings] = useState<PropertyListing[]>(initialListings); // Using local dummy data
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof PropertyListing | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const listingsPerPage = 8;

    // --- Filtration Bar States ---
    const [filterListingType, setFilterListingType] = useState<'forSale' | 'forRent' | 'all-types'>('all-types');
    const [filterStatus, setFilterStatus] = useState<PropertyListing['status'] | 'all-statuses'>('all-statuses');
    const [filterMinBedrooms, setFilterMinBedrooms] = useState<number | ''>('');
    const [filterMinBathrooms, setFilterMinBathrooms] = useState<number | ''>('');

    // State for custom confirmation modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmModalDetails, setConfirmModalDetails] = useState({
        title: '',
        message: '',
        onConfirm: () => { },
    });

    // Effect to update form data when selectedListing changes for edit/view
    useEffect(() => {
        if (selectedListing && (currentModalAction === 'edit' || currentModalAction === 'view')) {
            setListingFormData(selectedListing);
        } else if (currentModalAction === 'create') {
            setListingFormData(initialListingFormData);
        }
    }, [selectedListing, currentModalAction]);


    // --- Property Form Handlers ---
    const handleListingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        setListingFormData(prev => ({
            ...prev,
            [id]: type === 'number' ? (value ? parseFloat(value) : null) : value,
        }));
    };

    const handleListingSelectChange = (id: keyof PropertyListing, value: string) => {
        setListingFormData(prev => ({ ...prev, [id]: value as any })); // Type assertion for select values
    };

    const handleAddImage = useCallback(() => {
        if (newImageUrl.trim() && !listingFormData.imageUrl.includes(newImageUrl.trim())) {
            setListingFormData(prev => ({
                ...prev,
                imageUrl: [...prev.imageUrl, newImageUrl.trim()],
            }));
            setNewImageUrl(''); // Clear the input after adding
        }
    }, [newImageUrl, listingFormData.imageUrl]);

    const handleRemoveImage = useCallback((indexToRemove: number) => {
        setListingFormData(prev => ({
            ...prev,
            imageUrl: prev.imageUrl.filter((_, index) => index !== indexToRemove),
        }));
    }, []);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                if (!listingFormData.imageUrl.includes(dataUrl)) {
                    setListingFormData(prev => ({
                        ...prev,
                        imageUrl: [...prev.imageUrl, dataUrl],
                    }));
                }
            };
            reader.readAsDataURL(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input
            }
        }
    }, [listingFormData.imageUrl]);


    const handleListingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentModalAction === 'create') {
            const newListing: PropertyListing = {
                ...listingFormData,
                id: `prop-${listings.length + 1}-${Date.now()}`, // Simple unique ID generation
                status: 'available', // New listings are available by default
            };
            setListings(prev => [...prev, newListing]);
            alert('New property listing created!');
        } else if (currentModalAction === 'edit' && selectedListing) {
            setListings(prev => prev.map(listing =>
                listing.id === selectedListing.id ? listingFormData : listing
            ));
            alert(`Property listing "${selectedListing.propertyName}" updated!`);
        }

        console.log('Property Listing Data Submitted:', listingFormData);

        // Close modal and reset form on successful submission
        setIsListingModalOpen(false);
        setSelectedListing(null);
        setListingFormData(initialListingFormData);
        setNewImageUrl(''); // Clear the new image URL input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
    };

    // --- Property Listing Table Helper Functions ---
    const renderStatusBadge = (status: PropertyListing['status']) => {
        let colorClass = '';
        switch (status) {
            case 'available':
                colorClass = 'bg-green-100 text-green-800';
                break;
            case 'pending':
                colorClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'sold':
                colorClass = 'bg-red-100 text-red-800';
                break;
            case 'rented':
                colorClass = 'bg-indigo-100 text-indigo-800';
                break;
            case 'draft':
                colorClass = 'bg-blue-100 text-blue-800';
                break;
            default:
                colorClass = 'bg-gray-100 text-gray-800';
        }
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatPrice = useCallback((price: number | null, listingType: 'forSale' | 'forRent' | '') => {
        if (price === null) return 'N/A';
        const prefix = listingType === 'forSale' ? '₱' : '₱'; // Or '₱/mo' for rent
        return `${prefix}${price.toFixed(2)}`;
    }, []);

    // --- Property Listing Data Filtering and Sorting Logic (Memoized for performance) ---
    const filteredAndSortedListings = useMemo(() => {
        let filtered = listings.filter(listing =>
            (listing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.listingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.description.toLowerCase().includes(searchTerm.toLowerCase())) &&

            // Filter by Listing Type
            (filterListingType === 'all-types' || listing.listingType === filterListingType) &&

            // Filter by Status
            (filterStatus === 'all-statuses' || listing.status === filterStatus) &&

            // Filter by Min Bedrooms
            (filterMinBedrooms === '' || (listing.numBedrooms !== null && listing.numBedrooms >= filterMinBedrooms)) &&

            // Filter by Min Bathrooms
            (filterMinBathrooms === '' || (listing.numBathrooms !== null && listing.numBathrooms >= filterMinBathrooms))
        );

        if (sortColumn) {
            filtered.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? (aValue || 0) - (bValue || 0) : (bValue || 0) - (aValue || 0);
                }
                return 0;
            });
        }
        return filtered;
    }, [listings, searchTerm, sortColumn, sortDirection, filterListingType, filterStatus, filterMinBedrooms, filterMinBathrooms]);

    // --- Property Listing Table Pagination Logic ---
    const totalPages = Math.ceil(filteredAndSortedListings.length / listingsPerPage);
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const currentListings = filteredAndSortedListings.slice(startIndex, endIndex);

    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // Reset pagination when filters or search terms change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterListingType, filterStatus, filterMinBedrooms, filterMinBathrooms]);


    const handleSort = useCallback((column: keyof PropertyListing) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    const getSortIndicator = useCallback((column: keyof PropertyListing) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    }, [sortColumn, sortDirection]);

    // --- Property Listing Action Handlers (Local State Updates) ---
    const handleCreateNewListing = useCallback(() => {
        setCurrentModalAction('create');
        setSelectedListing(null); // Ensure form is reset for new creation
        setListingFormData(initialListingFormData); // Reset form data
        setNewImageUrl(''); // Clear new image URL input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
        setIsListingModalOpen(true);
    }, []);


    const handleEditListing = useCallback((listingId: string) => {
        if (!listings || listings.length === 0) return;
        const listingToEdit = listings.find(listing => listing.id === listingId);
        if (listingToEdit) {
            setSelectedListing(listingToEdit);
            setCurrentModalAction('edit');
            setNewImageUrl(''); // Clear new image URL input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input
            }
            setIsListingModalOpen(true);
        }
    }, [listings]);

    const handleToggleListingStatus = useCallback((listingId: string, currentStatus: PropertyListing['status']) => {
        setListings(prevListings =>
            prevListings.map(listing =>
                listing.id === listingId
                    ? {
                        ...listing,
                        status:
                            currentStatus === 'available' ? 'pending' :
                                currentStatus === 'pending' ? 'available' :
                                    currentStatus === 'sold' ? 'available' : // Option to re-list
                                        currentStatus === 'rented' ? 'available' : // Option to re-list
                                            'available', // Default toggle for draft
                    }
                    : listing
            )
        );
        alert(`Status for listing ${listingId} updated.`);
    }, []);

    const handleViewListingDetails = useCallback((listingId: string) => {
        if (!listings || listings.length === 0) return;
        const listingToView = listings.find(listing => listing.id === listingId);
        if (listingToView) {
            setSelectedListing(listingToView);
            setCurrentModalAction('view');
            setNewImageUrl(''); // Clear new image URL input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input
            }
            setIsListingModalOpen(true);
        }
    }, [listings]);

    const handleDeleteListing = useCallback((listingId: string) => {
        const listingToDelete = listings.find(e => e.id === listingId);
        setConfirmModalDetails({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete listing "${listingToDelete?.propertyName || listingId}"? This action cannot be undone.`,
            onConfirm: () => {
                setListings(prevListings => prevListings.filter(listing => listing.id !== listingId));
                alert(`Listing "${listingId}" has been deleted.`);
                setIsConfirmModalOpen(false);
            },
        });
        setIsConfirmModalOpen(true);
    }, [listings]);


    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-inter bg-gray-100">
            <div className="container mx-auto space-y-10">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Integrated Property Listings Management</h1>

                {/* Button to Open Listing Form Modal */}
                <div className="text-end mb-8">
                    <Button
                        onClick={handleCreateNewListing}
                        className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01]"
                    >
                        <PlusCircle size={20} className="mr-2" /> Create New Listing
                    </Button>
                </div>

                {/* --- Property Listing Form/View/Edit Modal --- */}
                {isListingModalOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50 backdrop-blur-sm p-4 transition-all duration-300 ease-in-out">
                        <Card className="w-full max-w-xl md:max-w-md lg:max-w-lg overflow-y-auto max-h-[calc(100vh-2rem)] rounded-lg shadow-2xl transform translate-x-0 transition-transform duration-300 ease-in-out">
                            <CardHeader className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-3xl font-extrabold text-gray-800 flex items-center">
                                        {currentModalAction === 'create' && <><PlusCircle size={28} className="mr-3 text-green-600" /> Create New Property Listing</>}
                                        {currentModalAction === 'edit' && <><Edit size={28} className="mr-3 text-blue-600" /> Edit Property Listing</>}
                                        {currentModalAction === 'view' && <><Eye size={28} className="mr-3 text-gray-600" /> View Property Details</>}
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsListingModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-800"
                                    >
                                        <CloseIcon size={24} />
                                    </Button>
                                </div>
                                <CardDescription className="text-gray-600 mt-2 text-base">
                                    {currentModalAction === 'create' && 'Fill in the details below to add a new property listing to your portfolio.'}
                                    {currentModalAction === 'edit' && 'Update the details for this property listing.'}
                                    {currentModalAction === 'view' && 'Review the full details of this property listing.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                {/* Always show image gallery if images exist, regardless of modal action */}
                                {listingFormData.imageUrl.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Property Images</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                                            {listingFormData.imageUrl.map((url, index) => (
                                                <div key={index} className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                                    <img
                                                        src={url}
                                                        alt={`Property Image ${index + 1}`}
                                                        className="w-full h-24 object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://placehold.co/150x100/cccccc/333333?text=Img+Err`;
                                                            e.currentTarget.alt = "Image not available";
                                                        }}
                                                    />
                                                    {currentModalAction === 'edit' && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            title="Remove Image"
                                                        >
                                                            <CloseIcon size={16} />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-2">Currently added images</p>
                                    </div>
                                )}
                                <form onSubmit={handleListingSubmit} className="space-y-7">
                                    {/* Property Name */}
                                    <div>
                                        <label htmlFor="propertyName" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Property Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="propertyName"
                                            type="text"
                                            placeholder="e.g., Spacious Family Home"
                                            value={listingFormData.propertyName}
                                            onChange={handleListingFormChange}
                                            required
                                            disabled={currentModalAction === 'view'}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Listing Type and Price */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="listingType" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Listing Type <span className="text-red-500">*</span>
                                            </label>
                                            <Select
                                                value={listingFormData.listingType}
                                                onValueChange={(value) => handleListingSelectChange('listingType', value as 'forSale' | 'forRent' | '')}
                                                disabled={currentModalAction === 'view'}
                                            >
                                                <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed">
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
                                                value={listingFormData.price === null ? '' : listingFormData.price}
                                                onChange={handleListingFormChange}
                                                required
                                                disabled={currentModalAction === 'view'}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                                            value={listingFormData.location}
                                            onChange={handleListingFormChange}
                                            required
                                            disabled={currentModalAction === 'view'}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Bedrooms, Bathrooms, Size */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label htmlFor="numBedrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Bedrooms
                                            </label>
                                            <Input
                                                id="numBedrooms"
                                                type="number"
                                                placeholder="e.g., 3"
                                                value={listingFormData.numBedrooms === null ? '' : listingFormData.numBedrooms}
                                                onChange={handleListingFormChange}
                                                disabled={currentModalAction === 'view'}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="numBathrooms" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Bathrooms
                                            </label>
                                            <Input
                                                id="numBathrooms"
                                                type="number"
                                                placeholder="e.g., 2"
                                                value={listingFormData.numBathrooms === null ? '' : listingFormData.numBathrooms}
                                                onChange={handleListingFormChange}
                                                disabled={currentModalAction === 'view'}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="areaSqFt" className="block text-sm font-semibold text-gray-800 mb-2">
                                                Area (sq. ft.)
                                            </label>
                                            <Input
                                                id="areaSqFt"
                                                type="number"
                                                placeholder="e.g., 1500"
                                                value={listingFormData.areaSqFt === null ? '' : listingFormData.areaSqFt}
                                                onChange={handleListingFormChange}
                                                disabled={currentModalAction === 'view'}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                                            value={listingFormData.description}
                                            onChange={handleListingFormChange}
                                            rows={5}
                                            disabled={currentModalAction === 'view'}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-y text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Image Upload/Link Section */}
                                    {currentModalAction !== 'view' && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Add Property Images</h3>

                                            {/* Add from URL */}
                                            <div className="space-y-2">
                                                <label htmlFor="newImageUrl" className="block text-sm font-semibold text-gray-800">
                                                    Image URL
                                                </label>
                                                <div className="flex space-x-2">
                                                    <Input
                                                        id="newImageUrl"
                                                        type="text"
                                                        placeholder="e.g., https://example.com/property-image.jpg"
                                                        value={newImageUrl}
                                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                                        className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={handleAddImage}
                                                        disabled={!newImageUrl.trim()}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Add Link
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Or divider */}
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-gray-500">Or</span>
                                                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" />
                                            </div>

                                            {/* Upload Local File */}
                                            <div className="space-y-2">
                                                <label htmlFor="fileUpload" className="block text-sm font-semibold text-gray-800">
                                                    Upload Local Image
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        id="fileUpload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">Select an image file from your computer (.jpg, .png, etc.).</p>
                                            </div>

                                            {/* Current Images Display (for create/edit) */}
                                            {listingFormData.imageUrl.length > 0 && (
                                                <div className="mt-4 border rounded-lg p-3 bg-gray-50 max-h-40 overflow-y-auto">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                                                    <ul className="space-y-1">
                                                        {listingFormData.imageUrl.map((url, index) => (
                                                            <li key={index} className="flex items-center justify-between text-xs text-gray-700 bg-white p-2 rounded-md shadow-sm">
                                                                <span className="truncate flex-grow mr-2">{url.length > 50 ? url.substring(0, 47) + '...' : url}</span>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleRemoveImage(index)}
                                                                    className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                                                                    title="Remove image"
                                                                >
                                                                    <CloseIcon size={14} />
                                                                </Button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500 mt-2">Images added from URLs or local files will appear in the preview above.</p>
                                        </div>
                                    )}

                                    {/* Status (Always rendered, but disabled in view mode) */}
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={listingFormData.status}
                                            onValueChange={(value) => handleListingSelectChange('status', value as PropertyListing['status'])}
                                            disabled={currentModalAction === 'view'}
                                        >
                                            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="available">Available</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="sold">Sold</SelectItem>
                                                <SelectItem value="rented">Rented</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    {/* Action Buttons (Submit for create/edit, Close for view) */}
                                    {currentModalAction !== 'view' ? (
                                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3.5 text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                            {currentModalAction === 'create' ? 'Create Listing' : 'Save Changes'}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setIsListingModalOpen(false);
                                                setSelectedListing(null);
                                            }}
                                            className="w-full bg-gray-600 hover:bg-gray-700 py-3.5 text-xl font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Close
                                        </Button>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- Property Listings Management Table Section --- */}
                <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mt-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Property Listings Management</h2>

                    {/* Search Bar and Filtration Bar */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <Input
                            type="text"
                            placeholder="Search listings (name, location, description)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            className="col-span-full md:col-span-2 lg:col-span-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        {/* Listing Type Filter */}
                        <div>
                            <Select
                                value={filterListingType}
                                onValueChange={(value: 'forSale' | 'forRent' | 'all-types') => setFilterListingType(value)}
                            >
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                    <SelectValue placeholder="Filter by Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-types">All Types</SelectItem>
                                    <SelectItem value="forSale">For Sale</SelectItem>
                                    <SelectItem value="forRent">For Rent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <Select
                                value={filterStatus}
                                onValueChange={(value: PropertyListing['status'] | 'all-statuses') => setFilterStatus(value)}
                            >
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="sold">Sold</SelectItem>
                                    <SelectItem value="rented">Rented</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Min Bedrooms Filter */}
                        <div>
                            <Input
                                type="number"
                                placeholder="Min Beds"
                                value={filterMinBedrooms === '' ? '' : filterMinBedrooms}
                                onChange={(e) => setFilterMinBedrooms(e.target.value === '' ? '' : parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* Min Bathrooms Filter */}
                        <div>
                            <Input
                                type="number"
                                placeholder="Min Baths"
                                value={filterMinBathrooms === '' ? '' : filterMinBathrooms}
                                onChange={(e) => setFilterMinBathrooms(e.target.value === '' ? '' : parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        </div>
                    </div>

                    {filteredAndSortedListings.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg mb-2">No property listings found matching your criteria.</p>
                            <p>Try adjusting your search or creating a new listing!</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {/* Table Headers with Sorting */}
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('propertyName')}
                                            >
                                                Property Name {getSortIndicator('propertyName')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('location')}
                                            >
                                                Location {getSortIndicator('location')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('listingType')}
                                            >
                                                Type {getSortIndicator('listingType')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Beds/Baths/Area
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('price')}
                                            >
                                                Price {getSortIndicator('price')}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort('status')}
                                            >
                                                Status {getSortIndicator('status')}
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentListings.map((listing) => (
                                            <tr key={listing.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{listing.propertyName}</div>
                                                    <div className="text-xs text-gray-500 max-w-xs truncate">{listing.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{listing.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 capitalize">
                                                        {listing.listingType === 'forSale' ? 'For Sale' : 'For Rent'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {listing.numBedrooms || 'N/A'} <Bed className="inline-block h-4 w-4 mr-1 text-gray-500" /> / {listing.numBathrooms || 'N/A'} <Bath className="inline-block h-4 w-4 mr-1 text-gray-500" />
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {listing.areaSqFt ? `${listing.areaSqFt} sq. ft.` : 'N/A'} <Maximize className="inline-block h-3 w-3 mr-1 text-gray-400" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{formatPrice(listing.price, listing.listingType)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {renderStatusBadge(listing.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {/* Dropdown Menu for Actions */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => handleEditListing(listing.id)} className="cursor-pointer">
                                                                <Edit className="mr-2 h-4 w-4" /> Edit Listing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleViewListingDetails(listing.id)} className="cursor-pointer">
                                                                <Eye className="mr-2 h-4 w-4" /> View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleToggleListingStatus(listing.id, listing.status)} className="cursor-pointer">
                                                                <Repeat className="mr-2 h-4 w-4" /> Toggle Status
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDeleteListing(listing.id)} className="text-red-600 focus:text-red-700 cursor-pointer">
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete Listing
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-6">
                                <span className="text-sm text-gray-700">
                                    Showing {Math.min(startIndex + 1, filteredAndSortedListings.length)} to {Math.min(endIndex, filteredAndSortedListings.length)} of {filteredAndSortedListings.length} listings
                                </span>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </Button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </Button>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Global Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                title={confirmModalDetails.title}
                message={confirmModalDetails.message}
                onConfirm={confirmModalDetails.onConfirm}
                onCancel={() => setIsConfirmModalOpen(false)}
            />
        </div>
    );
};

export default IntegratedManagementDashboard;
