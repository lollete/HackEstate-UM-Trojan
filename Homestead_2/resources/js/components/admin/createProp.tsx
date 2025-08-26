import React, { useState, useEffect } from 'react';
import { Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { Property } from '@/types/index';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

// --- Confirmation Modal Component ---
interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-sm rounded-lg shadow-xl">
                <CardHeader className="p-4 sm:p-6 border-b border-gray-200">
                    <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
                </CardHeader>
                <div className="p-6">
                    <p className="text-gray-700 mb-6">{message}</p>
                    <div className="flex justify-end gap-3">
                        <Button onClick={onCancel} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
                            Confirm
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// --- Dashboard (Simplified) ---
const IntegratedManagementDashboard: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmModalDetails, setConfirmModalDetails] = useState<{
        title: string;
        message: string;
        onConfirm: () => void;
    }>({ title: '', message: '', onConfirm: () => { } });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/properties');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleDelete = (id: number) => {
        setConfirmModalDetails({
            title: 'Delete Listing',
            message: 'Are you sure you want to delete this property? This action cannot be undone.',
            onConfirm: () => {
                setProperties((prev) => prev.filter((p) => p.id !== id));
                setIsConfirmModalOpen(false);
            },
        });
        setIsConfirmModalOpen(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Property Listings</h2>

            {loading ? (
                <p>Loading properties...</p>
            ) : properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {properties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{property.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{property.location}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">${property.price}</td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(property.id)}
                                                    className="text-red-600 cursor-pointer"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Global Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                title={confirmModalDetails.title}
                message={confirmModalDetails.message}
                onConfirm={confirmModalDetails.onConfirm}
                onCancel={() => setIsConfirmModalOpen(false)}
            />
        </div>
    );
};

export default IntegratedManagementDashboard;
