import React, { useState } from 'react';
import { CalendarIcon, MapPin, Clock, Users, Image, PlusCircle, User } from 'lucide-react';
import { format } from 'date-fns';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar'; // Re-introducing Calendar for date picking
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// --- Data Interfaces (can be moved to '@/types' if desired) ---
interface EventFormData {
    eventName: string;
    date: Date | undefined;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    host: string;
    capacity: number | null;
    imageUrl: string; // Placeholder for image upload
}

// --- Mock Data (for host select) ---
const mockHosts = [
    { id: 'agent1', name: 'Justine Nabunturan' },
    { id: 'agent2', name: 'John Doe' },
    { id: 'agent3', name: 'Jane Smith' },
];

// --- Main CreateEventForm Component ---
const CreateEventForm: React.FC = () => {
    const [formData, setFormData] = useState<EventFormData>({
        eventName: '',
        date: undefined,
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        host: '',
        capacity: null,
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setFormData(prev => ({ ...prev, date }));
    };

    const handleSelectChange = (id: keyof EventFormData, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Event Data Submitted:', formData);
        // Here you would typically send this data to your Laravel backend
        alert('Event creation form submitted! Check console for data.');
        // Reset form or show success message
    };

    return (
        <div className=" bg-gray-100 min-h-screen font-inter flex justify-center items-center">
            <Card className="w-full m-3 rounded-lg shadow-lg">
                <CardHeader className="p-6 border-b">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                        <PlusCircle size={24} className="mr-2 text-green-600" /> Create New Event
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                        Fill in the details below to create a new event.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Name */}
                        <div>
                            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
                                Event Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="eventName"
                                type="text"
                                placeholder="e.g., Open House at Modern Villa"
                                value={formData.eventName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={`w-full justify-start text-left font-normal ${!formData.date && "text-muted-foreground"
                                                }`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formData.date}
                                            onSelect={handleDateSelect}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Time <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                                    End Time <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="e.g., 123 Main St, Davao City"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Provide a brief description of the event..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        {/* Host and Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
                                    Host/Organizer <span className="text-red-500">*</span>
                                </label>
                                <Select value={formData.host} onValueChange={(value) => handleSelectChange('host', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a host" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockHosts.map(host => (
                                            <SelectItem key={host.id} value={host.id}>
                                                {host.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Capacity
                                </label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    placeholder="e.g., 50"
                                    value={formData.capacity === null ? '' : formData.capacity}
                                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value ? parseInt(e.target.value) : null }))}
                                />
                            </div>
                        </div>

                        {/* Image Upload (Placeholder) */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                Event Image (URL)
                            </label>
                            <Input
                                id="imageUrl"
                                type="text"
                                placeholder="e.g., https://example.com/event-image.jpg"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">For demonstration, use an image URL. In a real app, this would be a file upload.</p>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 text-lg">
                            Create Event
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateEventForm;
