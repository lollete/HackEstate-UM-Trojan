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


export interface Event {
    id: string;
    name: string;
    location: string;
    date: string; // e.g., "Friday, October 23 - 7:00 PM"
    price: string; // e.g., "Free", "Starts at P1,000"
    image: string; // Main event image URL
    galleryImages?: string[]; // Additional images for the detail page
    description: string;
    organizer: {
        name: string;
        avatar?: string; // Agent/Organizer avatar URL
        reviews?: number; // Number of reviews for the organizer
        rating?: number; // Rating for the organizer (e.g., 4.5)
        responsiveness?: string; // e.g., "Very Responsive"
    };
    typeOfEvent: string[]; // Categories like ["Seminars", "Workshops", "TEDx"]
    // User interaction flags, based on your comment "tagged users of true?false = booked, toured, rented, lived"
    // Adapted for events:
    isBooked?: boolean; // True if the current user has booked tickets
    isInterested?: boolean; // True if the current user has marked interest/liked
    isAttended?: boolean; // True if the current user has attended (or marked as attended)
    createdAt: string; // For sorting by 'Latest'
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
