// js/data/events.ts
import { Event, BookmarkEvent } from '@/types'; 

const events: Event[] = [
    {
        id: '1',
        name: 'FlipTop Battle',
        location: 'Ma-a, Davao City, 8000',
        date: 'Friday, October 23 - 7:00 PM',
        price: 'Free',
        image: 'https://placehold.co/600x400/FF5733/FFFFFF?text=FlipTop+Battle+Main', // Placeholder image
        galleryImages: [
            'https://placehold.co/200x150/FF5733/FFFFFF?text=Gallery+1',
            'https://placehold.co/200x150/FF5733/FFFFFF?text=Gallery+2',
            'https://placehold.co/200x150/FF5733/FFFFFF?text=Gallery+3'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. See more...',
        organizer: {
        // ADD USER_ID
            name: 'HOMESTEAD',
            avatar: 'https://picsum.photos/id/237/200/300', 
            reviews: 5,
            rating: 4.5,
            responsiveness: 'Very Responsive'
        },
        typeOfEvent: ['Seminars'], 
        isBooked: false,
        isInterested: false,
        isAttended: false,
        createdAt: '2025-07-01T10:00:00Z',
    },
    {
        id: '2',
        name: 'Music Festival 2025',
        location: 'Lanang, Davao City, 8000',
        date: 'Saturday, November 15 - 5:00 PM',
        price: 'Starts at P1,000',
        image: 'https://placehold.co/600x400/33FF57/FFFFFF?text=Music+Festival+Main',
        galleryImages: [
            'https://placehold.co/200x150/33FF57/FFFFFF?text=Gallery+A',
            'https://placehold.co/200x150/33FF57/FFFFFF?text=Gallery+B'
        ],
        description: 'Join us for an electrifying night of music with top local and international artists. Experience unforgettable performances and a vibrant atmosphere.',
        organizer: {
            name: 'Event Masters Inc.',
            avatar: 'https://picsum.photos/id/238/200/300',
            reviews: 12,
            rating: 4.8,
            responsiveness: 'Excellent'
        },
        typeOfEvent: ['Workshops'], 
        isBooked: false,
        isInterested: true,
        isAttended: false,
        createdAt: '2025-06-25T14:30:00Z',
    },
    {
        id: '3',
        name: 'TEDxDavaoCity',
        location: 'Poblacion District, Davao City, 8000',
        date: 'Sunday, December 10 - 9:00 AM',
        price: 'P500',
        image: 'https://placehold.co/600x400/5733FF/FFFFFF?text=TEDx+Main',
        galleryImages: [], 
        description: 'An independent TEDx event featuring inspiring speakers from various fields, sharing ideas worth spreading. Limited seats available.',
        organizer: {
            name: 'Davao Ideas Group',
            avatar: 'https://picsum.photos/id/239/200/300',
            reviews: 8,
            rating: 4.6,
            responsiveness: 'Good'
        },
        typeOfEvent: ['TEDx'],
        isBooked: true,
        isInterested: true,
        isAttended: false,
        createdAt: '2025-07-10T09:00:00Z',
    },
];

const bookmarks: BookmarkEvent[] = [
    { userId: '1', eventId: '1' }, 
    { userId: '1', eventId: '3' }, 
    { userId: '2', eventId: '2' }, 
];


export default events; 
