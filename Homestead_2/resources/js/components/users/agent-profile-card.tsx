import React from 'react';
import { MapPin, Mail, CheckCircle, UserCheck, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';

export interface AgentProfile {
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
}

export const agentProfile: AgentProfile[] = [
    {
        id: '1',
        name: 'Justine Nabunturan',
        feedbackCount: 5,
        rating: 4.5,
        description: 'Hello I am Justine Nabunturan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        location: 'Ma-a, Davao City, 8000',
        email: 'justinenabunturan@gmail.com',
        avatar: 'https://picsum.photos/id/237/200/300',
        banner: 'https://images.unsplash.com/photo-1582054238779-c5c7d235c5b9?q=80&w=2070&auto=format&fit=crop',
        isVerifiedAgent: true,
        agentSince: 2019,
    },
];

interface UserProfileCardProps {
    user: AgentProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
    return (
        <div className="relative shadow-lg overflow-hidden mx-auto my-8 ">
            {/* Banner */}
            <div className="relative h-36 sm:h-48">
                <img
                    src={user.banner}
                    alt="Banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/600x200/E5E7EB/6B7280?text=Banner+Image';
                    }}
                />
                {/* Avatar */}
                <div className="absolute -bottom-12 left-4 sm:left-6 z-10">

                    <Link href={`/agent-profile/${user.id}`}>
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-gray-100"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/128x128/CCCCCC/333333?text=${user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}`;
                            }}
                        />
                    </Link>
                
                </div>
            </div>

            {/* Info */}
            <div className="pt-20 pb-6 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-600 text-sm">
                            <span>{user.feedbackCount} Feedbacks</span>
                            <Star size={16} className="ml-3 mr-1 text-yellow-500 fill-yellow-500" />
                            <span>{user.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                        Talk to {user.name.split(' ')[0]}
                    </button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 text-center sm:text-left">
                    {user.description}
                </p>

                <div className="space-y-2 mb-4 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start text-gray-600">
                        <MapPin size={18} className="mr-2 text-gray-500" />
                        <span className="text-sm">{user.location}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start text-gray-600">
                        <Mail size={18} className="mr-2 text-gray-500" />
                        <span className="text-sm">{user.email}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {user.isVerifiedAgent && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <CheckCircle size={14} className="mr-1" /> Verified Agent
                        </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <UserCheck size={14} className="mr-1" /> Agent since {user.agentSince}
                    </span>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div className="relative sm:p-8 font-sans antialiased ">
            <div className="space-y-8">
                {agentProfile.map((user) => (
                    <UserProfileCard key={user.id} user={user} />
                ))}
            </div>

        </div>
    );
};

export default App;
