// resources/js/components/modal/PaymentModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Event } from '@/types';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: number;  // Change from event_id to id
        name: string;
        price: number;
    };
    onSuccess?: () => void;
}

export function PaymentModal({ isOpen, onClose, event, onSuccess }: PaymentModalProps) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        payment_method: 'credit_card',
    });
    const [quantity, setQuantity] = useState(1);
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user.id;
    // Calculate subtotal based on event price and quantity
    const eventPrice = event.price || 0;
    const subtotal = eventPrice * quantity;
    const total = subtotal; // No discount with coupon removed
    const eventId = event.id;

    const link = `https://fourtybytes.com/homestead/events/payments/charge_user.php?amount=${total}&user_id=${userId}&event_id=${eventId}`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/api/events/${event.id}/participate`, {
            onSuccess: () => {
                onClose();
                onSuccess?.();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register for {event.name}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                            Full Name
                        </label>
                        <Input
                            id="full_name"
                            name="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            required
                        />
                        {errors.full_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="payment_method" className="block text-sm font-medium mb-1">
                            Payment Method
                        </label>
                        <Select
                            value={data.payment_method}
                            onValueChange={(value) => setData('payment_method', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                                <SelectItem value="gcash">GCash</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Total Amount</span>
                            <span className="font-bold">₱{event.price.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        
                    <a href={link}>Confirm</a>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}