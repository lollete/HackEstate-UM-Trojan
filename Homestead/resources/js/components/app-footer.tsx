import React from 'react';
import { Instagram, Facebook, X } from 'lucide-react'; // Importing social media icons

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Company Info Section (from original footer) */}
                <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center mb-4">
                        {/* Placeholder for Homestead Logo - ideally an SVG or image */}
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                            <span className="font-bold text-white text-xl">H</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">HOMESTEAD</h3>
                    </div>
                    <p className="text-sm mb-4">Future Homes, Today</p>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Imong balay puhon, karon Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>

                {/* About Section (from latest snippet) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-white text-xl font-semibold mb-4">About</h3>
                    <p className="text-gray-400 text-sm">
                        We craft furniture & plants with love and passion for every home. Thank you for supporting local.
                    </p>
                </div>

                {/* Quick Links (from latest snippet) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Shop</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Installment</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                    </ul>
                </div>

                {/* Support Section (from original footer) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">FAQ</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Contact Us</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Help Center</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Find Us Section (from original footer) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-lg font-semibold text-white mb-4">Find Us</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Events</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Locations</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Newsletter</a></li>
                    </ul>
                </div>

                {/* Our Social Section (from original footer) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 className="text-lg font-semibold text-white mb-4">Our Social</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="flex items-center justify-center md:justify-start hover:text-green-400 transition-colors duration-200">
                                <Instagram size={20} className="mr-2" /> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center md:justify-start hover:text-green-400 transition-colors duration-200">
                                <Facebook size={20} className="mr-2" /> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center md:justify-start hover:text-green-400 transition-colors duration-200">
                                <X size={20} className="mr-2" /> X
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info (from latest snippet) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-white text-xl font-semibold mb-4">Contact</h3>
                    <p className="text-gray-400 text-sm">
                        Ecoland Drive, Davao City<br />
                        +63 912 345 6789<br />
                        HomeStead@email.com
                    </p>
                </div>
            </div>

            {/* Bottom Footer (Copyright) */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                © 2025 HomeStead Furniture. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
