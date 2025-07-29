import React from 'react';
import {
    MapPin, Mail, CheckCircle, UserCheck, Star,
    Home, MessageSquareText, AlertTriangle
} from 'lucide-react';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import PropertyCard from '@/components/property/propertyCard'; // Ensure this is imported
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Adjust based on your actual path
import { Property } from '@/types'; // Import the Property interface

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agent', href: '/Agent' },
];

interface PropertyCardProps {
    property: Property;
}


interface Feedback {
    id: number;
    comment: string;
    rating: number;
}

interface Agent {
    id: string;
    name: string;
    feedbackCount: number;
    rating: number;
    description: string;
    location: string;
    email: string;
    avatar: string;
    banner: string;
    isVerifiedAgent: boolean;
    agentSince: number;
    properties?: Property[];
    feedbacks?: Feedback[];
}

interface Props {
    agent: Agent;
}

const AgentProfile: React.FC<Props> = ({ agent }) => {
    const { properties = [], feedbacks = [] } = agent;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agent" />

            {/* Top Profile Section */}
            <div className="relative sm:p-8 font-sans antialiased">
                <div className="relative shadow-lg overflow-hidden mx-auto my-8">
                    <div className="relative h-36 sm:h-48">
                        <img
                            src={agent.banner}
                            alt="Banner"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x200/E5E7EB/6B7280?text=Banner+Image';
                            }}
                        />
                        <div className="absolute -bottom-12 left-4 sm:left-6 z-10">
                            <img
                                src={agent.avatar}
                                alt="Avatar"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover bg-gray-100"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/128x128/CCCCCC/333333?text=Agent';
                                }}
                            />
                        </div>
                    </div>

                    <div className="pt-20 pb-6 px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                                <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-600 text-sm">
                                    <span>{agent.feedbackCount} Feedbacks</span>
                                    <Star size={16} className="ml-3 mr-1 text-yellow-500 fill-yellow-500" />
                                    <span>{agent.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                                Talk to {agent.name.split(' ')[0]}
                            </button>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-4 text-center sm:text-left">{agent.description}</p>

                        <div className="space-y-2 mb-4 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start text-gray-600">
                                <MapPin size={18} className="mr-2 text-gray-500" />
                                <span className="text-sm">{agent.location}</span>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start text-gray-600">
                                <Mail size={18} className="mr-2 text-gray-500" />
                                <span className="text-sm">{agent.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {agent.isVerifiedAgent && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <CheckCircle size={14} className="mr-1" /> Verified Agent
                                </span>
                            )}
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <UserCheck size={14} className="mr-1" /> Agent since {agent.agentSince}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔽 Vertical Tabs Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row w-full max-w-6xl mx-auto my-8">
                <Tabs defaultValue="listings" className="w-full flex flex-col md:flex-row">
                    <TabsList className="flex flex-col h-auto rounded-none border-b md:border-b-0 md:border-r border-gray-200 p-2 w-full md:w-52">
                        <TabsTrigger
                            value="listings"
                            className="flex items-center justify-start space-x-2 py-3 px-4 w-full rounded-md mb-1
                data-[state=active]:border-l-2 data-[state=active]:border-green-600 data-[state=active]:bg-gray-50 data-[state=active]:text-green-600
                hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Home size={18} />
                            <span>Listings</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="feedbacks"
                            className="flex items-center justify-start space-x-2 py-3 px-4 w-full rounded-md mb-1
                data-[state=active]:border-l-2 data-[state=active]:border-green-600 data-[state=active]:bg-gray-50 data-[state=active]:text-green-600
                hover:bg-gray-100 transition-colors duration-200"
                        >
                            <MessageSquareText size={18} />
                            <span>Feedbacks</span>
                        </TabsTrigger>
                        <button className="flex items-center justify-start px-4 py-3 text-red-700 rounded-md hover:bg-red-50 transition-colors duration-200 font-semibold w-full mt-2">
                            <AlertTriangle size={18} className="text-red-500 mr-2" />
                            Report
                        </button>
                    </TabsList>

                    {/* Tabs Content */}
                    <div className="flex-1 p-6">
                        <TabsContent value="listings">
                            {properties.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {properties.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">No properties found.</p>
                            )}
                        </TabsContent>

                        <TabsContent value="feedbacks">
                            {feedbacks.length > 0 ? (
                                <ul className="space-y-4">
                                    {feedbacks.map((feedback) => (
                                        <li key={feedback.id} className="border p-4 rounded shadow-sm">
                                            <p className="text-gray-700">{feedback.comment}</p>
                                            <p className="text-sm text-yellow-600 mt-1">Rating: {feedback.rating}/5</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center">No feedbacks available.</p>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </AppLayout>
    );
};

export default AgentProfile;
