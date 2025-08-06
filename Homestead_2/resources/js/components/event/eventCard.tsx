// resources/js/components/event/EventCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { MapPin, CalendarDays } from 'lucide-react';

interface EventCardProps {
    event: {
        id: number;
        name: string;
        location: string;
        date: string;
        price: number;
        image: string;
        user: {
            name: string;
            avatar: string;
        };
    };
}

export function EventCard({ event }: EventCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
    console.log(event.id)
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0 relative">
                <div className="aspect-video overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/400x300/cccccc/333333?text=Event+Image';
                        }}
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <CardTitle className="text-white">{event.name}</CardTitle>
                </div>
                <div className="absolute top-4 right-4 bg-background/90 text-foreground px-3 py-1 rounded-md text-sm font-medium">
                    ₱{event.price.toFixed(2)}
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <img
                        src={event.user.avatar}
                        alt={event.user.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/100x100/cccccc/333333?text=Avatar';
                        }}
                    />
                    <span className="text-sm text-muted-foreground">{event.user.name}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formattedDate}</span>
                </div>
            </CardContent>

            <CardFooter className="p-3 pt-0">
                <Button asChild className="w-full bg-green-700 text-white">
                    <Link href={`/events/${event.id}`} >View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}