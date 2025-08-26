// import { type SharedData } from '@/types';
// import { Head, Link, usePage } from '@inertiajs/react';
// import { Bookmark, Cable, Mail, MapPin, Search } from "lucide-react";
import { NavLanding } from '@/components/nav-landing';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, Cable, Mail, MapPin, Search, MessageCircle } from "lucide-react";
import { useState } from "react";
// import { type BreadcrumbItem, type PaginatedEvents } from '@/types';

import { EventCard } from '@/components/event/eventCard';
import { type PaginatedEvents } from '@/types';

interface EventIndexProps {
    events: PaginatedEvents;
}

export default function Appsw({ events }: EventIndexProps) {


    // Define footer navigation items
    const items: { label: string; href: string }[] = [];
    const defaultItems = [
        { label: "Home", href: "/" },
        { label: "Buy Properties", href: "/buyProperties" },
        { label: "Rent Properties", href: "/rentProperties" },
        { label: "Events", href: "/events" },
        { label: "Agessnts", href: "/agents" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <>
            <Head title="Homestead">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="text-gray-800">
                <NavLanding items={[]} />
                <header
                    className="relative bg-cover bg-center bg-no-repeat h-[600px]"
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/0f/a6/89/0fa6892787841abdc4d6275511d14f91.jpg')" }}
                >

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
                        <h1 className="text-5xl font-bold mb-6">
                            Find your perfect property or event, all in one place
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl">
                            Homestead is the smart property and event platform that helps agents manage
                            their listings effortlessly — while giving users a simple way to discover homes
                            and happenings tailored to their needs.
                        </p>
                        <div className="w-full max-w-2xl bg-white rounded-md shadow-lg flex overflow-hidden">
                            <select className="px-5 py-3 text-sm bg-gray-100 text-black outline-none border-r border-gray-300">
                                <option value="all">All</option>
                                <option value="buy">Buy</option>
                                <option value="rent">Rent</option>
                                <option value="event">Event</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search properties or events..."
                                className="flex-1 px-6 py-3 text-sm text-black outline-none"
                            />
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm font-bold flex items-center justify-center">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main>
                    <section className="max-w-7xl mx-auto py-10">
                        <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                            <span className="font-normal">Recommended</span>
                            <span className="text-green-600 font-extrabold">Properties</span>
                        </h2>
                        {/* Put here the cards for the recommended properties */}
                    </section>

                    <section className="max-w-7xl mx-auto py-10">
                        <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                            <span className="text-green-600 font-extrabold">Event</span>
                            <span className="font-normal">Highlights</span>
                        </h2>
                        {/* Put here the cards for the event highlights */}
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
                    </section>

                    <section className="max-w-7xl mx-auto py-10">
                        <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                            <span className="font-normal">Featured</span>
                            <span className="text-green-600 font-extrabold">Agents</span>
                        </h2>
                        {/* Put here the cards for the featured agents */}
                    </section>

                    <footer className="border-t border-gray-200 bg-white text-gray-700">
                        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
                            {/* Left Column */}
                            <div className="text-center sm:text-left">
                                <Link href="/" aria-label="Go to homepage">
                                    <img src="/hori-logo.png" alt="Homestead Logo" className="w-40 mx-auto sm:mx-0" />
                                </Link>
                                <p className="text-sm text-gray-500 mt-3">
                                    © {new Date().getFullYear()} Homestead. All rights reserved.
                                </p>
                            </div>

                            {/* Right Column: Links */}
                            <div className="text-center sm:text-right">
                                <ul className="flex flex-col gap-2 text-base">
                                    {(items.length > 0 ? items : defaultItems).map((item, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={item.href}
                                                className="hover:text-green-600 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </footer>
                </main>

                {/* Chat Button */}
          
            </div>
        </>
    );
}
