import { Link, usePage } from '@inertiajs/react';
import { NavItem } from '@/types'; // If you have a type defined for NavItem
import { type SharedData } from '@/types';
import { useState } from "react";

export function NavLanding({ items = [] }: { items: NavItem[] }) {
    const { auth } = usePage<SharedData>().props;
        const [open, setOpen] = useState(false); 

    return (
        <nav className="shadow sticky top-0 z-50 bg-white">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                <Link href={route('home')}>
                    <img src="/hori-logo.png" alt="homestead logo" className="w-40" />
                </Link>
                

                <div className="flex-1 flex justify-center">
                    <ul className="flex items-center gap-8 text-sm font-medium">
                        {/* Buy Dropdown */}
                        <li className="relative group">
                            <Link href={route('landing.buy')} className="hover:text-green-600">Buy</Link>
                            <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 z-50">
                                <li>
                                    <Link href={route('landing.buy')} className="block px-4 py-2 hover:text-green-600">Residential</Link>
                                </li>
                                <li>
                                    <Link href={route('landing.buy')} className="block px-4 py-2 hover:text-green-600">Commercial</Link>
                                </li>
                                <li>
                                    <Link href={route('landing.buy')} className="block px-4 py-2 hover:text-green-600">Land</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Rent Dropdown */}
                        <li className="relative group">
                            <Link href={route('landing.rent')} className="hover:text-green-600">Rent</Link>
                            <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 z-50">
                                <li>
                                    <Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Short Term</Link>
                                </li>
                                <li>
                                    <Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Long Term</Link>
                                </li>
                                <li>
                                    <Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Co-living</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Others */}
                        <li>
                            <Link href={route('landing.events')} className="hover:text-green-600">Events</Link>
                        </li>
                        <li>
                            <Link href={route('landing.agents')} className="hover:text-green-600">Agents</Link>
                        </li>
                        <li>
                            <Link href={route('landing.contactUs')} className="hover:text-green-600">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    {auth?.user ? (
                        <Link
                        href={route('dashboard')}
                        className="rounded-md bg-green-600 text-white px-5 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-green-700"
                        >
                        Dashboard
                        </Link>
                    ) : (
                        <Link
                        href={route('login')}
                        className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                        >
                        Sign In
                        </Link>
                    )}

                    <Link
                        href={route('register')}
                        className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                    >
                        List Your Property
                    </Link>
                </div>
            </div>
        </nav>
    );
}
