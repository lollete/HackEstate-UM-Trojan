import { Property, ChatParticipant, ChatMessage, ChatConversation } from '@/types';

// Agents Data
export const agents: ChatParticipant[] = [
    { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/id/1005/50/50' },
    { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/id/1011/50/50' },
    { id: 3, name: 'Robert Brown', avatar: 'https://picsum.photos/id/1025/50/50' },
];

// Properties Data (you can import this from your existing property.ts if needed)
export const properties: Property[] = [
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
    // Add other properties...
];

// Chat Conversations Data
export const chatConversations: ChatConversation[] = [
    {
        agent: agents[0],
        property: properties[0],
        messages: [
            { id: 'm1-1', sender: 'agent', text: 'Hello world!', timestamp: '2025-07-27T09:00:00Z' },
            { id: 'm1-2', sender: 'user', text: 'Hello world goodbye!', timestamp: '2025-07-27T09:05:00Z' },
        ],
    },
    // Add other conversations...
];

// Helper function to get sorted conversations
export const getSortedConversations = () => {
    return [...chatConversations].sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        if (!lastMessageA || !lastMessageB) return 0;
        return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
    });
};