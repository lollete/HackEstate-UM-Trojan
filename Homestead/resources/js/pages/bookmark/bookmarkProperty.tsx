import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

import propertiesData from '@/data/property';
import { Property, Bookmark, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import BookmarkLayout from '@/layouts/bookmark/layout';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bookmark',
        href: '/Bookmark',
    },
];

const currentUserId = '1';

const allBookmarks: Bookmark[] = [
    { userId: '1', propertyId: '1' },
    { userId: '1', propertyId: '3' },
    { userId: '1', propertyId: '2' },
    { userId: '1', propertyId: '5' },
    { userId: '1', propertyId: '6' },
    { userId: '1', propertyId: '7' },
    { userId: '2', propertyId: '2' },
];
//property nako kay taman lang 3 HAHAHAHA


const ITEMS_PER_PAGE = 5;

export default function BookmarkPage() {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const userBookmarks = allBookmarks
            .filter((b) => b.userId === currentUserId)
            .map((b) => b.propertyId);
        setBookmarks(userBookmarks);
    }, []);

    const bookmarkedProperties = propertiesData.filter((property) =>
        bookmarks.includes(String(property.id))
    );

    const totalPages = Math.ceil(bookmarkedProperties.length / ITEMS_PER_PAGE);

    const paginatedProperties = bookmarkedProperties.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Bookmarks" />
            <BookmarkLayout>
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Your Bookmarked Properties</h2>

                    {paginatedProperties.length === 0 ? (
                        <p className="text-gray-500">You have no bookmarked properties.</p>
                    ) : (
                        <>
                            {paginatedProperties.map((property) => (
                                <div key={property.id} className="flex border w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                                    <img
                                        src={property.image}
                                        alt={property.name}
                                        className="w-50 m-3 rounded object-cover h-30"
                                    />
                                    <div className="p-4 w-2/3">
                                        <h3 className="text-xl font-semibold">{property.name}</h3>
                                        <p className="text-gray-600 mt-1">→ {property.location}</p>
                                        <p className="text-gray-800 font-bold mt-2">
                                            ₱{Number(property.price).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-2 px-4'>
                                        <Button className='w-28 text-center' variant={"bgGreen"}>View</Button>
                                        <Button className='w-28 text-center' variant={"bgGreen"}>Contact</Button>
                                    </div>
                                </div>
                            ))}

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(currentPage - 1);
                                            }}
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                href="#"
                                                isActive={index + 1 === currentPage}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(index + 1);
                                                }}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(currentPage + 1);
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                    )}
                </div>
            </BookmarkLayout>
        </AppLayout>
    );
}
