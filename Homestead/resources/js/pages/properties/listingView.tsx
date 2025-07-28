import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem, type Property } from '@/types';
import { Ruler, BedDouble, Bath, MapPin, Heart, Bookmark, Share2, Calendar, Star, Eye } from 'lucide-react';
import RequestTourModal from '@/components/modal/RequestTour';

type Props = {
    property: Property;
};

const ListingView: React.FC<Props> = ({ property }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Listings',
            href: '/view',
        },
        {
            title: property.name,
            href: window.location.pathname,
        },
    ];

    const getMapEmbedUrl = (location: string) => {
        const encodedLocation = encodeURIComponent(location);
        return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={property.name} />

            <div className="min-h-screen sm:p-6 lg:p-2 font-sans">
                <div className="max-w-6xl mx-auto border rounded-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
                        {/* Left Column: Image & Gallery */}
                        <div className="flex flex-col">
                            <img
                                src={property.image}
                                alt={property.name}
                                className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/800x400/cccccc/333333?text=Main+Image';
                                }}
                            />
                            <div className="space-x-2 flex flex-row">
                                <img src="https://i.pinimg.com/1200x/00/01/44/00014489ecd72916d18d100471ccf901.jpg" alt="Gallery 1" className="w-30 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition" />
                                <img src="https://i.pinimg.com/1200x/00/01/44/00014489ecd72916d18d100471ccf901.jpg" alt="Gallery 2" className="w-30 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition" />
                                <img src="https://i.pinimg.com/1200x/47/17/b4/4717b49880d80ea3f6bf32249e31c727.jpg" alt="Gallery 3" className="w-30 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition" />
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div>
                            <div className="mb-3">
                                <a href="/dashboard" className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Back to listings
                                </a>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
                                <div className="flex items-center space-x-2 text-sm">
                                    {property.forSale && (
                                        <span className="inline-flex border border-green-600 items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-1"></span> For Sale
                                        </span>
                                    )}
                                    {property.forRent && (
                                        <span className="inline-flex border border-orange-600 items-center px-2.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                            <span className="h-1.5 w-1.5 rounded-full bg-orange-600 mr-1"></span> For Rent
                                        </span>
                                    )}
                                    <span className="flex items-center text-gray-600">
                                        5 Reviews <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" /> 4.5
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-700 text-base mb-4">
                                Brand New Residential Home In Davao City. With {property.bedrooms} bedrooms and {property.bathrooms} bathrooms, swimming pool included
                            </p>

                            <div className="flex items-center text-gray-600 mb-4">
                                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                                <p className="text-sm">{property.location}</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-700 text-sm mb-6">
                                <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-gray-500" /><span>Built in 2005</span></div>
                                <div className="flex items-center"><BedDouble className="w-4 h-4 mr-1 text-gray-500" /><span>{property.bedrooms} Bedrooms</span></div>
                                <div className="flex items-center"><Bath className="w-4 h-4 mr-1 text-gray-500" /><span>{property.bathrooms} Bathrooms</span></div>
                                <div className="flex items-center"><Ruler className="w-4 h-4 mr-1 text-gray-500" /><span>{property.size} Sqft</span></div>
                            </div>

                            <p className="text-4xl font-extrabold text-green-600 mb-6">₱{property.price.toLocaleString()}</p>

                            <div className="flex space-x-4 mb-6">
                                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"><Heart className="w-5 h-5 mr-2" /> Like</button>
                                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"><Bookmark className="w-5 h-5 mr-2" /> Bookmark</button>
                                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"><Share2 className="w-5 h-5 mr-2" /> Share</button>
                            </div>

                            <div className="border rounded-sm px-5 py-4 border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">Agent</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={property.agent.avatar}
                                            alt={property.agent.name}
                                            className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-300"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/cccccc/333333?text=Agent'; }}
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900 flex">{property.agent.name}<Eye className="text-[6px] text-white fill-green-700 ms-2" /></p>
                                            <p className="text-sm text-gray-600 flex items-center">5 Reviews |<Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" /> 4.5</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-4 py-1 outline outline-green-700 rounded-sm hover:bg-green-100 text-green-700 transition duration-300 shadow-md text-sm">
                                            Contact {property.agent.name.split(' ')[0]}
                                        </button>
                                        <RequestTourModal />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 mt-6">
                        <div className="flex border-b border-gray-200 mb-4">
                            <button
                                className={`px-6 py-3 text-lg font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('details')}
                            >Details</button>
                            <button
                                className={`px-6 py-3 text-lg font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                onClick={() => setActiveTab('reviews')}
                            >Reviews</button>
                        </div>

                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {property.details?.bedroomsAndBathrooms && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bedrooms & bathrooms</h3>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            <li>Bedrooms: {property.details.bedroomsAndBathrooms.bedrooms}</li>
                                            <li>Bathrooms: {property.details.bedroomsAndBathrooms.bathrooms}</li>
                                            <li>Full bathrooms: {property.details.bedroomsAndBathrooms.fullBathrooms}</li>
                                        </ul>
                                    </div>
                                )}

                                {property.details?.features && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Features</h3>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {property.details.features.map((feature, index) => <li key={index}>{feature}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {/* Map Embed */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Map</h3>
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            src={getMapEmbedUrl(property.location)}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map of ${property.name} at ${property.location}`}
                                            className="rounded-lg shadow-md"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Reviews</h3>
                                <p className="text-gray-600">No reviews yet. Be the first to review this property!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ListingView;
