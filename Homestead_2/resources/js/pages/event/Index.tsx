import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedEvents } from '@/types';

import { EventCard } from '@/components/event/eventCard';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event',
        href: '/Events',
    },
];

interface EventIndexProps {
    events: PaginatedEvents;
    filters: {
        search?: string;
        type?: string;
    };
    sort: string;
}

export default function EventIndex({ events, filters, sort }: EventIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');

    const handleSearch = () => {
        router.get('/events', {
            search,
            type: selectedType,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSortChange = (value: string) => {
        router.get('/events', {
            sort: value,
            search,
            type: selectedType,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Events" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Input
                            placeholder="Search events..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full md:w-64"
                        />

                        <Select
                            value={selectedType}
                            onValueChange={(value) => {
                                setSelectedType(value);
                                handleSearch();
                            }}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="concert">Concerts</SelectItem>
                                <SelectItem value="conference">Conferences</SelectItem>
                                <SelectItem value="workshop">Workshops</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={sort}
                            onValueChange={handleSortChange}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="top">Top Events</SelectItem>
                                <SelectItem value="latest">Latest</SelectItem>
                                <SelectItem value="relevance">Relevance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {events.data.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearch('');
                                setSelectedType('');
                                handleSearch();
                            }}
                            className="mt-4 text-green-600 hover:text-green-800"
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.data.map((event) => (
                                <EventCard
                                    key={event.event_id}
                                    event={{
                                        id: Number(event.event_id),
                                        name: event.name,
                                        location: event.location,
                                        date: event.date,
                                        price: event.price,
                                        image: event.image,
                                        user: event.user,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (events.current_page > 1) {
                                                    router.get(`${events.path}?page=${events.current_page - 1}`);
                                                }
                                            }}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: events.last_page }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === events.current_page}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.get(`${events.path}?page=${page}`);
                                                }}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (events.current_page < events.last_page) {
                                                    router.get(`${events.path}?page=${events.current_page + 1}`);
                                                }
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
