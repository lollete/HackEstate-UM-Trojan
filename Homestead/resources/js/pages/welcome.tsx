import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, Cable, Mail, MapPin, Search } from "lucide-react";

function App() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>


            <nav className="shadow">
                <div className="max-w-7xl mx-auto p-5 flex items-center justify-between ">
                    <a href="#">
                        <img src="/hori-logo.png" alt="homestead logo" className="w-50" />
                    </a>

                    <ul className="flex items-center gap-5">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">How it works</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <button className="text-white bg-dark-green py-2 px-10 rounded-md font-bold">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <header>
                <div className="grid grid-cols-2 gap-16 justify-between max-w-7xl mx-auto pt-16 pb-24">
                    <div>
                        <h1 className="flex flex-col gap-5 mb-10">
                            <span className="font-bold text-5xl">
                                Find your perfect property or event, all in one place
                            </span>
                            <span className="text-2xl">
                                Homestead is the smart property and event platform that helps
                                agents manage their listings effortlessly — while giving users a
                                simple way to discover homes and happenings tailored to their
                                needs.
                            </span>
                        </h1>
                        <div className="flex items-center gap-5">
                            <button className="text-white bg-dark-green py-2 px-10 rounded-md font-bold cursor-pointer">
                                Try it now
                            </button>
                            <button className="border border-dark-green text-dark-green py-2 px-10 rounded-md cursor-pointer">
                                Learn more
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <img src="/square-logo.png" alt="homestead" className="w-[300px]" />
                    </div>
                </div>
            </header>

            <main>
                <section className="max-w-7xl mx-auto pb-26">
                    <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                        <span className="text-dark-green">About</span>
                        <span>Us</span>
                    </h2>

                    <p className="text-lg text-justify mb-16">
                        Homestead is the all‑in‑one platform that makes it easy to discover,
                        manage, and share properties and events. Whether you’re a client
                        looking for the perfect home or an agent managing your listings,
                        Homestead brings security, smart tools, and simplicity together in
                        one place.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Clients Column */}
                        <div className="border border-dark-green p-5 rounded-md">
                            <h3 className="text-2xl font-semibold mb-6">For Clients</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li>
                                    🔍 <b>Smart Search</b>: Filter by category, budget, and
                                    location.
                                </li>
                                <li>
                                    🏠 <b>3D Walkthroughs</b>: Explore properties virtually before
                                    visiting.
                                </li>
                                <li>
                                    ⭐ <b>Feedback & Ratings</b>: Rate agents and bookmark
                                    listings.
                                </li>
                                <li>
                                    🛡 <b>Trusted & Secure</b>: AI detects fake listings and scams.
                                </li>
                                <li>
                                    📍 <b>Geo‑tagging & Risk Info</b>: See nearby amenities and
                                    risks.
                                </li>
                                <li>
                                    💬 <b>Direct Communication</b>: Chat with agents easily.
                                </li>
                            </ul>
                        </div>

                        {/* Agents Column */}
                        <div className="border border-dark-green p-5 rounded-md">
                            <h3 className="text-2xl font-semibold mb-6">
                                For Agents & Listers
                            </h3>
                            <ul className="space-y-4 text-gray-700">
                                <li>
                                    📊 <b>Analytics Dashboard</b>: Track views, sales, and
                                    performance.
                                </li>
                                <li>
                                    🗓 <b>Property & Event Management</b>: Manage rentals and
                                    bookings.
                                </li>
                                <li>
                                    🎟 <b>Event Hosting Tools</b>: Tickets, QR validation, and
                                    participant tracking.
                                </li>
                                <li>
                                    🎨 <b>Customizable Listings</b>: Personalize layouts.
                                </li>
                                <li>
                                    👥 <b>Team Collaboration</b>: Add team members.
                                </li>
                                <li>
                                    🔔 <b>Notifications & Security</b>: Stay updated with logs &
                                    KYC.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto pb-26">
                    <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                        <span className="text-dark-green">How</span>
                        <span>It Works</span>
                    </h2>

                    <div className="grid grid-cols-3 gap-5">
                        <div className="border border-dark-green p-5 rounded-md">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="border border-dark-green w-15 h-15 flex items-center justify-center rounded-full">
                                    <Cable color="#1f8505" size={30} />
                                </div>
                                <p className="text-dark-green text-2xl font-bold">
                                    Connect & Verify
                                </p>
                            </div>

                            <p className="text-lg">
                                Chat directly with trusted agents and sellers. Every agent goes
                                through KYC verification, and our AI security checks help
                                protect you from scams, fake documents, or risky listings.
                            </p>
                        </div>
                        <div className="border border-dark-green p-5 rounded-md">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="border border-dark-green w-15 h-15 flex items-center justify-center rounded-full">
                                    <Search color="#1f8505" size={30} />
                                </div>
                                <p className="text-dark-green text-2xl font-bold">
                                    Search & Discover
                                </p>
                            </div>

                            <p className="text-lg">
                                Find your perfect property or event in seconds. Our powerful
                                filters, categories, and geo‑tagging make it easy to explore
                                listings that match your needs, whether it’s a dream home, land,
                                or a special event venue.
                            </p>
                        </div>
                        <div className="border border-dark-green p-5 rounded-md">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="border border-dark-green w-15 h-15 flex items-center justify-center rounded-full">
                                    <Bookmark color="#1f8505" size={30} />
                                </div>
                                <p className="text-dark-green text-2xl font-bold">
                                    Book or List
                                </p>
                            </div>

                            <p className="text-lg">
                                Rent, buy, or host — all in one place. Whether you’re booking
                                your next home or creating an event, Homestead makes the process
                                smooth with built‑in calendars, smart reminders, and instant
                                confirmations.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto pb-28">
                    <h2 className="text-3xl font-bold flex items-center gap-2 mb-5">
                        <span className="text-dark-green">Contact</span>
                        <span>Us</span>
                    </h2>

                    <div className="max-w-7xl mx-auto border border-dark-green rounded-md p-5">
                        <p className="font-bold text-2xl mb-5">Talk With Us</p>

                        <p className="text-lg mb-2">
                            Questions, comments, or suggestions? Just fill the for and we will
                            be in touch.
                        </p>

                        <ul className="text-lg">
                            <li className="flex items-center gap-2">
                                <MapPin color="#FF0000" />
                                <span>Davao City</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail color="#964B00" />
                                <span>homestead@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <footer className="border-t border-dark-green">
                    <div className="max-w-7xl mx-auto p-10 grid grid-cols-2">
                        <a href="#">
                            <img src="/hori-logo.png" alt="homestead" className="w-50" />
                        </a>

                        <ul className="flex flex-col items-end gap-2 text-lg">
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Our Team</a>
                            </li>
                            <li>
                                <a href="#">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#">Locations</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </main>
        </>
    );
}

export default App;