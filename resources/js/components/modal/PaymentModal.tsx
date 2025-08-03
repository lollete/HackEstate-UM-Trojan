import React, { useState } from 'react';
import { MapPin, CalendarDays, Minus, Plus } from 'lucide-react';
import { Event } from '@/types'; // Assuming Event type is available
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, event }) => {
    const [quantity, setQuantity] = useState(1);
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user.id;

    if (!isOpen) return null;

    // Calculate subtotal based on event price and quantity
    const eventPrice = parseFloat(event.price.replace(/[^\d.]/g, '')) || 0;
    const subtotal = eventPrice * quantity;
    const total = subtotal; // No discount with coupon removed
    const eventId = event.id;

    const link = `https://fourtybytes.com/homestead/events/payments/charge_user.php?amount=${total}&user_id=${userId}&event_id=${eventId}`;
    // https://fourtybytes.com/homestead/events/payments/charge_user.php/amount=
    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleRegister = () => {
        //TODO: CREATE/EVENT REGISTRATION
        console.log('Registering for event:', event.name, {
            quantity,
            paymentMethod: 'paypal', // Only PayPal is available
            total,
        });
        // TODO:CREATE MODAL SUCCESS/ERROR REGISTRATION FOR EVENT
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50 font-sans">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        {/* Event Details Section */}
                        <div className="flex items-center mb-6 border border-gray-200 rounded-lg p-4">
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-24 h-24 object-cover rounded-md mr-4"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/96x96/cccccc/333333?text=Event'; }}
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <CalendarDays className="w-4 h-4 mr-1 text-green-600" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 text-sm mr-2">Quantity:</span>
                                    <button
                                        onClick={() => handleQuantityChange('decrement')}
                                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="mx-3 text-lg font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increment')}
                                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">20 Tickets Remaining</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select a payment method</h3>
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">

                                    <link rel="stylesheet" href={link} />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={true} // PayPal is always selected
                                        readOnly // Make it non-changeable
                                        className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-3 text-gray-700">Paypal</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Order summary</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">{quantity} x Ticket</span>
                            <span className="font-semibold text-gray-800">₱{subtotal.toLocaleString()}</span>
                        </div>

                        <hr className="my-4 border-gray-300" />

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-extrabold text-green-600">₱{total.toLocaleString()}</span>
                        </div>


                        <button 
                            onClick={handleRegister}
                            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition duration-200"
                        >
                            {/* <link rel="stylesheet" href={link} > */}
                                <a href={link} >Pay with PayPal</a>

                            </button>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;