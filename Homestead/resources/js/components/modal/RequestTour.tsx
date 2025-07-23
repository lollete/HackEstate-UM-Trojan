import React, { useState, MouseEventHandler, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// Define Prop Types for simulated Shadcn UI components
interface DialogProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface DialogContentProps {
    children: React.ReactNode;
}

interface DialogHeaderProps {
    children: React.ReactNode;
}

interface DialogTitleProps {
    children: React.ReactNode;
}

interface DialogDescriptionProps {
    children: React.ReactNode;
}

interface DialogCloseProps {
    onClick: () => void;
}

interface InputProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    id?: string;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean; // Added disabled prop
}



interface RequestTourModalProps {
    propertyId: number;
    propertyName: string;
}


// Shadcn UI components (simulated for this example as they would typically be imported)
// In a real Shadcn project, these would be imported from your UI library.
const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${open ? 'block' : 'hidden'}`}>
        <div className="relative w-full max-w-md mx-auto rounded-lg bg-white p-6 shadow-lg">
            {children}
        </div>
    </div>
);
const DialogContent: React.FC<DialogContentProps> = ({ children }) => <>{children}</>;
const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => <div className="text-center mb-6">{children}</div>;
const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => <h2 className="text-2xl font-bold text-gray-800">{children}</h2>;
const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => <p className="text-gray-600 text-sm">{children}</p>;
const DialogClose: React.FC<DialogCloseProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);
const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange, className = '', id }) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    />
);
const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false }) => (
    <button
        onClick={onClick}
        className={`w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
    >
        {children}
    </button>
);

// Calendar component
interface CalendarProps {
    selectedDate: number | null;
    selectedMonth: number | null;
    selectedYear: number | null;
    selectedTimeSlot: 'morning' | 'afternoon' | null;
    onSelectDateTime: (date: number, month: number, year: number, timeSlot: 'morning' | 'afternoon') => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, selectedMonth, selectedYear, selectedTimeSlot, onSelectDateTime }) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // 0-indexed
    const currentYear = today.getFullYear();

    const [currentViewingMonth, setCurrentViewingMonth] = useState(currentMonth);
    const [currentViewingYear, setCurrentViewingYear] = useState(currentYear);
    const [currentViewingDay, setCurrentViewingDay] = useState<number | null>(null); // To highlight the selected date for time slot picking

    // Hardcoded booked slots for demonstration: { date: number, month: number, year: number, timeSlot: 'morning' | 'afternoon' }
    const bookedSlots = [
        { date: 5, month: 6, year: 2025, timeSlot: 'morning' },
        { date: 5, month: 6, year: 2025, timeSlot: 'afternoon' }, // Day 5, July 2025 is fully booked
        { date: 12, month: 6, year: 2025, timeSlot: 'afternoon' },
        { date: 19, month: 6, year: 2025, timeSlot: 'morning' },
        { date: 26, month: 6, year: 2025, timeSlot: 'afternoon' },
        { date: 20, month: 6, year: 2025, timeSlot: 'morning' }, // Example: Only morning booked
        { date: 21, month: 6, year: 2025, timeSlot: 'afternoon' }, // Example: Only afternoon booked
        { date: 10, month: 7, year: 2025, timeSlot: 'morning' }, // Example for August 2025
    ];

    const timeSlots = [
        { id: 'morning', label: 'Morning (8 AM - 11 AM)' },
        { id: 'afternoon', label: 'Afternoon (1 PM - 5 PM)' },
    ];

    // Helper to get the number of days in a given month and year
    const getDaysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper to get the day of the week for the first day of the month
    const getFirstDayOfMonth = (month: number, year: number): number => {
        return new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday
    };

    const totalDaysInMonth = getDaysInMonth(currentViewingMonth, currentViewingYear);
    const firstDayOffset = getFirstDayOfMonth(currentViewingMonth, currentViewingYear);
    const dates = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

    // Helper to check if a specific date, month, year, and time slot is booked
    const isSlotBooked = (date: number, month: number, year: number, timeSlotId: 'morning' | 'afternoon'): boolean => {
        return bookedSlots.some(slot =>
            slot.date === date && slot.month === month && slot.year === year && slot.timeSlot === timeSlotId
        );
    };

    const goToPreviousMonth = () => {
        setCurrentViewingDay(null); // Reset selected day when changing month
        if (currentViewingMonth === 0) {
            setCurrentViewingMonth(11);
            setCurrentViewingYear(prevYear => prevYear - 1);
        } else {
            setCurrentViewingMonth(prevMonth => prevMonth - 1);
        }
    };

    const goToNextMonth = () => {
        setCurrentViewingDay(null); // Reset selected day when changing month
        if (currentViewingMonth === 11) {
            setCurrentViewingMonth(0);
            setCurrentViewingYear(prevYear => prevYear + 1);
        } else {
            setCurrentViewingMonth(prevMonth => prevMonth + 1);
        }
    };

    // Determine if the previous month button should be disabled
    const isPreviousMonthDisabled = currentViewingYear < currentYear || (currentViewingYear === currentYear && currentViewingMonth <= currentMonth);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center text-lg font-semibold mb-4 text-gray-700">
                <button
                    onClick={goToPreviousMonth}
                    className={`p-2 rounded-full ${isPreviousMonthDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`}
                    disabled={isPreviousMonthDisabled}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span>{monthNames[currentViewingMonth].toUpperCase()} {currentViewingYear}</span>
                <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm text-gray-500 font-medium mb-2">
                {days.map(day => (
                    <div key={day} className="text-center">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {/* Placeholder for empty leading days */}
                {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`empty-${i}`} className="p-2"></div>)}
                {dates.map(date => {
                    const isPastDate = (currentViewingYear < currentYear) ||
                        (currentViewingYear === currentYear && currentViewingMonth < currentMonth) ||
                        (currentViewingYear === currentYear && currentViewingMonth === currentMonth && date < currentDay);

                    const isMorningBooked = isSlotBooked(date, currentViewingMonth, currentViewingYear, 'morning');
                    const isAfternoonBooked = isSlotBooked(date, currentViewingMonth, currentViewingYear, 'afternoon');
                    const isFullyBooked = isMorningBooked && isAfternoonBooked;

                    // Define onClick handler explicitly to be MouseEventHandler<HTMLDivElement> or undefined
                    const handleDateClick: MouseEventHandler<HTMLDivElement> | undefined =
                        isFullyBooked || isPastDate ? undefined : () => setCurrentViewingDay(date);

                    const isSelectedForTimePicking = currentViewingDay === date;
                    const isSelectedFinal = selectedDate === date && selectedMonth === currentViewingMonth && selectedYear === currentViewingYear;

                    return (
                        <div
                            key={date}
                            className={`p-2 text-center rounded-md relative flex flex-col items-center justify-center
                ${isFullyBooked || isPastDate
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : isSelectedForTimePicking
                                        ? 'bg-blue-100 text-blue-800 font-bold cursor-pointer border border-blue-500' // Highlight selected date for time slot picking
                                        : isSelectedFinal
                                            ? 'bg-green-100 text-green-800 font-bold cursor-pointer border border-green-500' // Highlight finally selected date
                                            : 'hover:bg-gray-100 cursor-pointer text-gray-800'
                                }
              `}
                            onClick={handleDateClick}
                        >
                            <span className="text-base leading-none">{date}</span> {/* Date number */}
                            {isFullyBooked ? (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold whitespace-nowrap">
                                    Booked
                                </span>
                            ) : (
                                <>
                                    {isMorningBooked && (
                                        <span className="absolute top-1 left-1 px-1 py-0.5 bg-red-400 text-white text-xs rounded-full font-semibold">
                                            M
                                        </span>
                                    )}
                                    {isAfternoonBooked && (
                                        <span className="absolute top-1 right-1 px-1 py-0.5 bg-red-400 text-white text-xs rounded-full font-semibold">
                                            A
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {currentViewingDay && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        Select Time for {monthNames[currentViewingMonth]} {currentViewingDay}, {currentViewingYear}
                    </h3>
                    <div className="space-y-3">
                        {timeSlots.map(slot => {
                            const booked = isSlotBooked(currentViewingDay, currentViewingMonth, currentViewingYear, slot.id as 'morning' | 'afternoon');
                            const isSelected = selectedDate === currentViewingDay && selectedMonth === currentViewingMonth && selectedYear === currentViewingYear && selectedTimeSlot === slot.id;

                            return (
                                <button
                                    key={slot.id}
                                    className={`w-full text-left px-4 py-3 rounded-md border
                    ${booked
                                            ? 'bg-red-50 text-gray-500 cursor-not-allowed border-red-200'
                                            : isSelected
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800'
                                        }
                    transition-colors duration-200 flex justify-between items-center
                  `}
                                    disabled={booked}
                                    onClick={() => onSelectDateTime(currentViewingDay, currentViewingMonth, currentViewingYear, slot.id as 'morning' | 'afternoon')}
                                >
                                    <span>{slot.label}</span>
                                    {booked && (
                                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                                            Booked
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'afternoon' | null>(null);

    const handleSelectDateTime = (date: number, month: number, year: number, timeSlot: 'morning' | 'afternoon') => {
        setSelectedDate(date);
        setSelectedMonth(month);
        setSelectedYear(year);
        setSelectedTimeSlot(timeSlot);
    };

    const handleSubmit = () => {
        if (!name || !email || !selectedDate || !selectedMonth || !selectedYear || !selectedTimeSlot) {
            alert('Please fill in all fields and select a date and time.'); // Using alert for simplicity in this demo
            return;
        }
        // Handle form submission logic here
        console.log('Form submitted:', { name, email, selectedDate, selectedMonth, selectedYear, selectedTimeSlot });
        setIsOpen(false); // Close modal after submission
        setName('');
        setEmail('');
        setSelectedDate(null);
        setSelectedMonth(null);
        setSelectedYear(null);
        setSelectedTimeSlot(null);
    };

    const isSubmitDisabled = !name || !email || !selectedDate || !selectedTimeSlot;

    return (
        <div className="font-sans">
        
            <Button onClick={() => setIsOpen(true)} className='px-4 py-1 bg-green-700 text-white rounded-sm hover:bg-green-700 transition duration-300 shadow-md text-sm'
            >Request a Tour</Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request a tour</DialogTitle>
                        <DialogDescription>
                            Please fill out the form below to schedule your tour.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogClose onClick={() => setIsOpen(false)} />

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <p id="location" className="text-gray-800 font-semibold">
                                Ma-a, Davao City, 8000
                            </p>
                        </div>

                        <div>
                            <label htmlFor="select-date" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date and Time
                            </label>
                            <Calendar
                                selectedDate={selectedDate}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                                selectedTimeSlot={selectedTimeSlot}
                                onSelectDateTime={handleSelectDateTime}
                            />
                            {selectedDate && selectedMonth !== null && selectedYear && selectedTimeSlot && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected: {new Date(selectedYear, selectedMonth, selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {selectedTimeSlot === 'morning' ? 'Morning (8 AM - 11 AM)' : 'Afternoon (1 PM - 5 PM)'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>Send</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default App;
