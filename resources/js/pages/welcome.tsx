import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, Cable, Mail, MapPin, Search, MessageCircle } from "lucide-react";
import { useState } from "react";

function App() {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false); // Chat toggle state

    return (
        <>
            <Head title="Homestead">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="text-gray-800">
                <nav className="shadow sticky top-0 z-50 bg-white">
                    <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                        <a href="#">
                            <img src="/hori-logo.png" alt="homestead logo" className="w-40" />
                        </a>
                        <div className="flex-1 flex justify-center">
                            <ul className="flex items-center gap-8 text-sm font-medium">
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
                                <li className="relative group">
                                        <Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Rent</Link>
                                    <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 z-50">
                                        <li><Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Short Term</Link></li>
                                        <li><Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Long Term</Link></li>
                                        <li><Link href={route('landing.rent')} className="block px-4 py-2 hover:text-green-600">Co-living</Link></li>
                                    </ul>
                                </li>
                                <li><Link href={route('landing.events')} className="block px-4 py-2 hover:text-green-600">Events</Link></li>
                                <li><Link href={route('landing.agents')} className="block px-4 py-2 hover:text-green-600">Agents</Link></li>
                                <li><Link href={route('landing.contactUs')} className="block px-4 py-2 hover:text-green-600">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="flex items-center">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-[#19140035] hover:bg-green-500 px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <header
                    className="relative bg-cover bg-center bg-no-repeat h-[600px]"
                    style={{ backgroundImage: `url('/first.jpg')` }}
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
                    </section>

                    <section className="max-w-7xl mx-auto py-10">
                        <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                            <span className="font-normal">Featured</span>
                            <span className="text-green-600 font-extrabold">Agents</span>
                        </h2>
                        {/* Put here the cards for the featured agents */}
                    </section>

                    <footer className="border-t border-dark-green bg-white">
                        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 items-center">
                            <div className="mb-6 md:mb-0">
                                <a href="#">
                                    <img src="/hori-logo.png" alt="Homestead Logo" className="w-40" />
                                </a>
                                <p className="text-sm text-gray-500 mt-2">
                                    © {new Date().getFullYear()} Homestead. All rights reserved.
                                </p>
                            </div>
                            <ul className="flex flex-col md:items-end gap-2 text-lg text-gray-700">
                                <li><a href="#" className="hover:text-dark-green transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-dark-green transition-colors">Our Team</a></li>
                                <li><a href="#" className="hover:text-dark-green transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-dark-green transition-colors">Locations</a></li>
                            </ul>
                        </div>
                    </footer>
                </main>

                {/* Chat Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50"
                    aria-label="Chatbot"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>

                {/* Chatbox */}
                {open && (
                    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-lg border z-50">
                        <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                            <h4 className="font-semibold">Nestly Assistant</h4>
                        </div>
                        <div className="p-4 text-sm text-gray-700 h-60 overflow-y-auto">
                            <p>Hello! 👋 How can I assist you today?</p>
                            {/* Add more chat messages here */}
                        </div>
                        <div className="border-t p-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full text-sm px-3 py-2 border rounded focus:outline-none"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
