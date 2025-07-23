// js/data/property.ts
import { Property, Bookmark } from '@/types'; // Adjust path if your types folder is elsewhere



// tagged users of true?false = booked, toured, rented, lived
const properties: Property[] = [
    {
        id: '1',
        name: 'Hehehe Home',
        location: 'Ma-a, Davao City, 8000',
        size: 100,
        bedrooms: 3,
        bathrooms: 2,
        price: 10000000,
        agent: {
            name: 'John Doe',
            avatar: 'https://picsum.photos/id/237/200/300' 
        },
        image: 'https://picsum.photos/id/180/200/300',
        forSale: true,
        forRent: false,
        details: {
            bedroomsAndBathrooms: {
                bedrooms: 3,
                bathrooms: 2,
                fullBathrooms: 2,
            },
            features: [
                "Ceiling Fan(s)",
                "Flooring: Luxury Vinyl, Tile",
                "Has basement: No",
                "Spacious backyard",
                "Modern kitchen appliances"
            ]
        }
        // createdAt: '2025-07-01T10:00:00Z', // Example for 'Latest' sort
    },
    {
        id: '2',
        name: 'Modern Villa',
        location: 'Lanang, Davao City, 8000',
        size: 150,
        bedrooms: 4,
        bathrooms: 3,
        price: 15000000,
        agent: {
            name: 'Jane Smith',
            avatar: 'https://picsum.photos/id/237/200/300'
        },
        image: 'https://i.pinimg.com/1200x/f4/5e/66/f45e66a57195833aff26b8614b5c056d.jpg',
        forSale: true,
        forRent: true,
        details: {
            bedroomsAndBathrooms: {
                bedrooms: 3,
                bathrooms: 2,
                fullBathrooms: 2,
            },
            features: [
                "Ceiling Fan(s)",
                "Flooring: Luxury Vinyl, Tile",
                "Has basement: No",
                "Spacious backyard",
                "Modern kitchen appliances"
            ]
        }
        // createdAt: '2025-07-05T12:30:00Z',
    },
    {
        id: '3',
        name: 'Cozy Apartment',
        location: 'Poblacion District, Davao City, 8000',
        size: 70,
        bedrooms: 2,
        bathrooms: 1,
        price: 5000000,
        agent: {
            name: 'Peter Jones',
            avatar: 'https://picsum.photos/id/237/200/300'
        },
        image: 'https://i.pinimg.com/1200x/f4/5e/66/f45e66a57195833aff26b8614b5c056d.jpg',
        forSale: false,
        forRent: true,
        details: {
            bedroomsAndBathrooms: {
                bedrooms: 3,
                bathrooms: 2,
                fullBathrooms: 2,
            },
            features: [
                "Ceiling Fan(s)",
                "Flooring: Luxury Vinyl, Tile",
                "Has basement: No",
                "Spacious backyard",
                "Modern kitchen appliances"
            ]
        }
        // createdAt: '2025-06-20T08:00:00Z',
    },
];


const bookmarks: Bookmark[] = [
    { userId: '1', propertyId: '1' }, // User 1 bookmarked property 1
    { userId: '1', propertyId: '3' }, // User 1 bookmarked property 3
    { userId: '2', propertyId: '2' }, // Another user bookmarked property 2
];

export default properties;