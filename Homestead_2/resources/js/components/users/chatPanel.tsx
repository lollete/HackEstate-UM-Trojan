import React, { useState, useRef, useEffect } from 'react';
import { Phone, MoreVertical, MapPin, Image, ThumbsUp, Send, User, MessageSquareText, Search, PlusCircle, Home } from 'lucide-react'; // Importing necessary icons

// --- Interfaces ---
export interface Property {
    id: string;
    name: string;
    location: string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    agent: {
        name: string;
        avatar: string;
    };
    image: string;
    forSale: boolean;
    forRent: boolean;
    details: {
        bedroomsAndBathrooms: {
            bedrooms: number;
            bathrooms: number;
            fullBathrooms: number;
        };
        features: string[];
    };
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string; // Added timestamp for sorting
}

export interface ChatParticipant {
    id: string;
    name: string;
    avatar: string;
    lastMessageTime?: string; 
}

export interface ChatConversation {
    agent: ChatParticipant;
    messages: ChatMessage[];
    property: Property;
}

const agents: ChatParticipant[] = [
    { id: 'agent1', name: 'John Doe', avatar: 'https://picsum.photos/id/1005/50/50' },
    { id: 'agent2', name: 'Jane Smith', avatar: 'https://picsum.photos/id/1011/50/50' },
    { id: 'agent3', name: 'Robert Brown', avatar: 'https://picsum.photos/id/1025/50/50' },
];

const properties: Property[] = [
    {
        id: '1',
        name: 'Family Home',
        location: 'Ma-a, Davao City, 8000',
        size: 100,
        bedrooms: 3,
        bathrooms: 2,
        price: 10000000,
        agent: agents[0],
        image: 'https://picsum.photos/id/180/200/300',
        forSale: true,
        forRent: false,
        details: {
            bedroomsAndBathrooms: { bedrooms: 3, bathrooms: 2, fullBathrooms: 2 },
            features: ["Brand New Residential Home In Davao City.", "With 3 bedrooms and 2 bathrooms, swimming pool included"]
        }
    },
    {
        id: '2',
        name: 'Modern Condo',
        location: 'Poblacion, Davao City, 8000',
        size: 80,
        bedrooms: 2,
        bathrooms: 2,
        price: 7500000,
        agent: agents[1],
        image: 'https://picsum.photos/id/189/200/300',
        forSale: true,
        forRent: false,
        details: {
            bedroomsAndBathrooms: { bedrooms: 2, bathrooms: 2, fullBathrooms: 2 },
            features: ["City view.", "Gym access.", "24/7 security."]
        }
    },
    {
        id: '3',
        name: 'Beach House',
        location: 'Samal Island, Davao Del Norte, 8119',
        size: 200,
        bedrooms: 5,
        bathrooms: 4,
        price: 25000000,
        agent: agents[2],
        image: 'https://picsum.photos/id/200/200/300',
        forSale: true,
        forRent: false,
        details: {
            bedroomsAndBathrooms: { bedrooms: 5, bathrooms: 4, fullBathrooms: 4 },
            features: ["Private beach access.", "Large garden.", "Ocean view."]
        }
    }
];

const chatConversations: ChatConversation[] = [
    {
        agent: agents[0],
        property: properties[0],
        messages: [
            { id: 'm1-1', sender: 'agent', text: 'Hello world!', timestamp: '2025-07-27T09:00:00Z' },
            { id: 'm1-2', sender: 'user', text: 'Hello world goodbye!', timestamp: '2025-07-27T09:05:00Z' },
            { id: 'm1-3', sender: 'agent', text: 'How can I assist you with the Family Home?', timestamp: '2025-07-27T09:10:00Z' },
        ],
    },
    {
        agent: agents[1],
        property: properties[1],
        messages: [
            { id: 'm2-1', sender: 'agent', text: 'Hi! Interested in the Modern Condo?', timestamp: '2025-07-27T10:15:00Z' },
            { id: 'm2-2', sender: 'user', text: 'Yes, tell me more about the amenities.', timestamp: '2025-07-27T10:20:00Z' },
        ],
    },
    {
        agent: agents[2],
        property: properties[2],
        messages: [
            { id: 'm3-1', sender: 'agent', text: 'Welcome! Looking for a beach house?', timestamp: '2025-07-27T11:00:00Z' },
            { id: 'm3-2', sender: 'user', text: 'Tell me about Samal Island properties.', timestamp: '2025-07-27T11:05:00Z' },
            { id: 'm3-3', sender: 'agent', text: 'The Beach House offers stunning ocean views.', timestamp: '2025-07-27T11:15:00Z' },
            { id: 'm3-4', sender: 'user', text: 'That sounds amazing!', timestamp: '2025-07-27T11:20:00Z' },
        ],
    },
];

// to sort
const sortedConversations = [...chatConversations].sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    if (!lastMessageA || !lastMessageB) return 0; // Handle empty message arrays
    return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
});

interface PropertyChatCardProps {
    property: Property;
}

const PropertyChatCard: React.FC<PropertyChatCardProps> = ({ property }) => {
    return (
        <div className="flex items-center p-3 bg-white border-b border-gray-200">
            <img
                src={property.image}
                alt={property.name}
                className="w-20 h-20 rounded-lg object-cover mr-3 flex-shrink-0"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/80x80/E5E7EB/6B7280?text=Property`;
                }}
            />
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-base truncate">{property.name}</h4>
                <p className="text-gray-700 text-sm mb-1 truncate">
                    {property.details.features.join('. ')}
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                </div>
            </div>
        </div>
    );
};

interface ChatBubbleProps {
    message: ChatMessage;
    participant: ChatParticipant; 
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, participant }) => {
    const isUser = message.sender === 'user';
    const avatarSrc = isUser ? 'https://picsum.photos/id/1005/50/50' : participant.avatar;

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && (
                <img
                    src={avatarSrc}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/32x32/CCCCCC/333333?text=${participant.name.split(' ').map(n => n[0]).join('')}`;
                    }}
                />
            )}
            <div
                className={`max-w-[75%] p-3 rounded-xl shadow-sm ${isUser
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
            >
                <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                <span className={`block mt-1 text-xs ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                </span>
            </div>
            {isUser && (
                <img
                    src={avatarSrc}
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover ml-2 flex-shrink-0"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/32x32/CCCCCC/333333?text=You`;
                    }}
                />
            )}
        </div>
    );
};

const App: React.FC = () => {
    const [activeConversationId, setActiveConversationId] = useState<string>(sortedConversations[0]?.agent.id || '');
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = chatConversations.find(
        (conv) => conv.agent.id === activeConversationId
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversationId, activeConversation?.messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !activeConversation) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue.trim(),
            timestamp: new Date().toISOString(),
                    };

        const updatedConversations = chatConversations.map((conv) =>
            conv.agent.id === activeConversationId
                ? { ...conv, messages: [...conv.messages, newMessage] }
                : conv
        );

        // Re-sort convo
        const reSortedConversations = [...updatedConversations].sort((a, b) => {
            const lastMessageA = a.messages[a.messages.length - 1];
            const lastMessageB = b.messages[b.messages.length - 1];
            if (!lastMessageA || !lastMessageB) return 0;
            return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
        });

               Object.assign(chatConversations, reSortedConversations); 

        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6 font-sans antialiased">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] max-h-[700px] flex overflow-hidden">
                <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 border-r border-gray-200 flex flex-col bg-gray-50">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search agent..."
                                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {sortedConversations.map((conv) => (
                            <div
                                key={conv.agent.id}
                                className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors duration-150
                  ${activeConversationId === conv.agent.id ? 'bg-green-50 text-green-800 font-semibold' : ''}`}
                                onClick={() => setActiveConversationId(conv.agent.id)}
                            >
                                <img
                                    src={conv.agent.avatar}
                                    alt={conv.agent.name}
                                    className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${conv.agent.name.split(' ').map(n => n[0]).join('')}`;
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm truncate">{conv.agent.name}</span>
                                        {conv.messages.length > 0 && (
                                            <span className="text-xs text-gray-500">
                                                {new Date(conv.messages[conv.messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                    {conv.messages.length > 0 && (
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {conv.messages[conv.messages.length - 1].text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                        <button className="w-full flex items-center justify-center p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                            <PlusCircle size={20} className="mr-2" /> New Chat
                        </button>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={activeConversation.agent.avatar}
                                        alt={activeConversation.agent.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${activeConversation.agent.name.split(' ').map(n => n[0]).join('')}`;
                                        }}
                                    />
                                    <div>
                                        <span className="font-semibold text-gray-800 block">{activeConversation.agent.name}</span>
                                        <span className="text-xs text-gray-500">Active now</span> {/* Placeholder status */}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" aria-label="Call Agent">
                                        <Phone size={20} className="text-gray-600" />
                                    </button>
                                    <div className="relative group">
                                        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" aria-label="More Options">
                                            <MoreVertical size={20} className="text-gray-600" />
                                        </button>
                                        {/* Dropdown Menu */}
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <User size={16} className="mr-2" /> View Agent
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <MessageSquareText size={16} className="mr-2" /> Block
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <PropertyChatCard property={activeConversation.property} />

                            <div className="flex-1 p-4 overflow-y-auto bg-white">
                                {activeConversation.messages.map((msg) => (
                                    <ChatBubble key={msg.id} message={msg} participant={activeConversation.agent} />
                                ))}
                                <div ref={messagesEndRef} /> 
                            </div>

                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200" aria-label="Attach Image">
                                        <Image size={24} />
                                    </button>
                                    <textarea
                                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-12 overflow-hidden"
                                        placeholder="Aa"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        rows={1}
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                    />
                                    <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200" aria-label="Thumbs Up">
                                        <ThumbsUp size={24} />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-md"
                                        aria-label="Send Message"
                                    >
                                        <Send size={24} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a chat to view messages.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
