// src/components/modal/PaymentModal.tsx
import React, { useState } from 'react';
import { MapPin, CalendarDays, Minus, Plus } from 'lucide-react';
import { Event } from '@/types'; // Assuming Event type is available

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event; 
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, event }) => {
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<string>('credit_debit');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0); 

    if (!isOpen) return null;

    // Calculate subtotal based on event price and quantity
    const eventPrice = parseFloat(event.price.replace(/[^\d.]/g, '')) || 0;
    const subtotal = eventPrice * quantity;
    const total = subtotal - discount;

    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleApplyCoupon = () => {
        // FOR LATER: COUPON/DIS
        if (coupon === 'DISCOUNT500') {
            setDiscount(500);
        } else {
            setDiscount(0);
        }
    };

    const handleRegister = () => {
        //TODO: CREATE/EVENT REEGISTER
        console.log('Registering for event:', event.name, {
            quantity,
            paymentMethod,
            cardNumber,
            cardName,
            expiryDate,
            cvv,
            total,
        });
        // TODO:CREATE MODAL SUCCESS/ERROR REGITRATION FOR EVENT
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
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="gcash"
                                        checked={paymentMethod === 'gcash'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-3 text-gray-700">Gcash</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-3 text-gray-700">Paypal</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="google_pay"
                                        checked={paymentMethod === 'google_pay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-3 text-gray-700">Google Pay</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit_debit"
                                        checked={paymentMethod === 'credit_debit'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-3 text-gray-700">Credit/Debit Card</span>
                                </label>
                            </div>
                        </div>

                        {/* Credit/Debit Card Details */}
                        {paymentMethod === 'credit_debit' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        placeholder="XXXX XXXX XXXX XXXX"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Card Name
                                    </label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        placeholder="Full Name on Card"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            placeholder="XXX"
                                        />
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-200">
                                    Add Card
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Order summary</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">{quantity} x Ticket</span>
                            <span className="font-semibold text-gray-800">₱{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Enter coupon"
                                className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mr-2"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-200"
                            >
                                Apply
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Discount</span>
                            <span className="font-semibold text-red-600">-₱{discount.toLocaleString()}</span>
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
                            Register
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
