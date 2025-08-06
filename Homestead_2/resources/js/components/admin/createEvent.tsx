import React, { useState, useEffect } from 'react';

// Interface for the event form data
interface EventFormData {
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    description: string;
    type_of_event: string;
    price: string;
    image: string;
}

// Props for the CreateEventForm component (now accepting an onClose function)
interface CreateEventFormProps {
    onClose?: () => void; // Optional function to call when the form is successfully submitted/closed
}

// CreateEventForm Component
const CreateEventForm: React.FC<CreateEventFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<EventFormData>({
        name: '',
        date: '',
        start_time: '08:00',
        end_time: '17:00',
        location: '',
        description: '',
        type_of_event: '',
        price: '0',
        image: ''
    });

    const [imageOption, setImageOption] = useState<'url' | 'file'>('url');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Attempt to get CSRF token from a meta tag, common in Laravel/Blade setups
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!token) {
            console.error('CSRF token meta tag not found. Ensure it is present in your HTML head.');
            setError('Security token missing. Please refresh the page.');
            return;
        }
        setCsrfToken(token);
    }, []);

    // Handles changes for all text, date, time, select inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handles file input change specifically for image upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Formats time from "HH:MM" to "HH:MM:00" for database compatibility
    const formatTimeForDB = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    // Handles the form submission logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!csrfToken) {
            setError('Security token missing. Please refresh the page.');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const formDataToSend = new FormData();

            // Format time values for database before appending
            const dbStartTime = formatTimeForDB(formData.start_time);
            const dbEndTime = formatTimeForDB(formData.end_time);

            // Append all standard form data fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('start_time', dbStartTime);
            formDataToSend.append('end_time', dbEndTime);
            formDataToSend.append('type', formData.type_of_event);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description', formData.description);

            // Append image based on selected option (URL or file)
            if (imageOption === 'file' && imageFile) {
                formDataToSend.append('image', imageFile);
            } else if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            // Append CSRF token
            formDataToSend.append('_token', csrfToken);

            // Send the request to the backend
            const response = await fetch('/admin/event', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Accept': 'application/json', // Indicate that we prefer JSON response
                },
                credentials: 'include' // Include cookies (for sessions/CSRF)
            });

            // Check if the response was successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create event');
            }

            // Handle success: show message, reset form, and close modal
            setSuccess(true);
            setFormData({
                name: '',
                date: '',
                start_time: '08:00',
                end_time: '17:00',
                location: '',
                description: '',
                type_of_event: '',
                price: '0',
                image: ''
            });
            setImageFile(null); // Clear selected file

            // Call the onClose prop to trigger modal closure from the parent
            if (onClose) {
                onClose();
            }

        } catch (err) {
            console.error('Error creating event:', err);
            setError(err instanceof Error ? err.message : 'Failed to create event');
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" rounded-3xl shadow-xl space-y-7">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Create New Event</h2>

            {/* Error message display */}
            {error && (
                <div className="p-4 bg-red-100 border border-red-500 text-red-800 rounded-lg flex items-center space-x-3" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Success message display */}
            {success && (
                <div className="p-4 bg-green-100 border border-green-500 text-green-800 rounded-lg flex items-center space-x-3" role="status">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Event created successfully!</span>
                </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Event Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                        maxLength={50}
                        placeholder="e.g., Annual Tech Conference"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
                        Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="start_time" className="block text-sm font-semibold text-gray-700 mb-1">
                        Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                        step="3600" // Allows choosing full hours
                    />
                </div>

                <div>
                    <label htmlFor="end_time" className="block text-sm font-semibold text-gray-700 mb-1">
                        End Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                        step="3600" // Allows choosing full hours
                    />
                </div>
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                    maxLength={100}
                    placeholder="e.g., SMX Convention Center, Manila"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    rows={4}
                    required
                    maxLength={250}
                    placeholder="Provide a brief overview of the event..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="type_of_event" className="block text-sm font-semibold text-gray-700 mb-1">
                        Type of Event <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="type_of_event"
                        name="type_of_event"
                        value={formData.type_of_event}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                        required
                    >
                        <option value="">Select type</option>
                        <option value="conference">Conference</option>
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="meetup">Meetup</option>
                        <option value="webinar">Webinar</option>
                        <option value="exhibition">Exhibition</option>
                        <option value="festival">Festival</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        min="0"
                        step="0.01"
                        required
                        placeholder="e.g., 99.99 (enter 0 for free)"
                    />
                </div>
            </div>

            {/* Image input selection (URL or file upload) */}
            <div>
                <label className="\ text-sm font-semibold text-gray-700 mb-2">Event Image</label>
                <div className="flex space-x-3 mb-3">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${imageOption === 'url'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setImageOption('url')}
                    >
                        Use Image URL
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${imageOption === 'file'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setImageOption('file')}
                    >
                        Upload Image File
                    </button>
                </div>

                {imageOption === 'url' ? (
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Paste image URL here (e.g., https://example.com/event.jpg)"
                        maxLength={1000}
                    />
                ) : (
                    <input
                        type="file"
                        name="image"
                        accept="image/*" // Restrict to image files
                        onChange={handleFileChange}
                        className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-200"
                    />
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={isSubmitting} // Disable button during submission
            >
                {isSubmitting ? (
                    <>
                        {/* Spinner SVG for loading state */}
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Event...</span>
                    </>
                ) : (
                    'Create Event'
                )}
            </button>
        </form>
    );
};

// EventModal Component (the main component to render in your App)
const EventModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggles the visibility of the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to call after the event form is successfully submitted
    const handleEventCreated = () => {
        setIsModalOpen(false); // Close the modal
        // Optionally, add logic here to refresh event lists or show a global notification
        alert('Event created successfully! You can now view it in your list.');
    };

    return (
        <div className="flex justify-end items-center">
            {/* Button to open the modal */}
            <button
                onClick={toggleModal}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
                Create New Event
            </button>

            {/* Modal Overlay and Content */}
            {isModalOpen && (
                <div className="fixed inset-0  flex justify-center items-center z-50 p-10">
                    <div className="relative bg-white shadow-xl max-h-[90vh] overflow-y-auto w-full p-2 max-w-2xl">
                        {/* Close button for the modal */}
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200 z-10"
                            aria-label="Close modal"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Render the CreateEventForm inside the modal, passing the onClose prop */}
                        <CreateEventForm onClose={handleEventCreated} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventModal;