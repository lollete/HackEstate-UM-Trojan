import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    id: number;

    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}



// 

export type Agent = {
    id: number;
    name: string;
    avatar: string;
};

export interface Property {
    id: string;
    name: string;
    location: string;
    size: number; // in square feet
    bedrooms: number;
    bathrooms: number;
    price: number;
    agent: Agent;
    image: string; // URL to the property image
    forSale: boolean;
    forRent: boolean;
    details?: {
        bedroomsAndBathrooms?: {
            bedrooms: number;
            bathrooms: number;
            fullBathrooms?: number;
        };
        features?: string[]; // e.g., ["Ceiling Fan(s)", "Flooring: Luxury Vinyl, Tile", "Has basement: No"]
        // Add other details as needed
    };
}

// resources/js/types/event.ts
export interface Event {
    id: any;
    event_id: string;
    name: string;
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    image: string;
    gallery_images?: string[];
    description: string;
    type_of_event: string[];
    user: {
        id: number;
        name: string;
        avatar: string;
    };
    participants_count: number;
    created_at: string;
    updated_at: string;
}

export interface PaginatedEvents {
    data: Event[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    path: string;
}

export interface BookmarkEvent {
    userId: string;
    eventId: string; // Changed from propertyId to eventId
}
export interface Bookmark {
    userId: string;
    propertyId: string;
}


// CHAT AREA -----------------
export interface ChatMessage {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
}

export interface ChatParticipant {
    id: number;
    name: string;
    avatar: string;
    lastMessageTime?: string;
}

export interface ChatConversation {
    agent: ChatParticipant;
    messages: ChatMessage[];
    property: Property;
}
