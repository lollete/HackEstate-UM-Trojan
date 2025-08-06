import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X } from 'lucide-react';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: 'Hello 👋 Please describe your issue so I can help you.',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue.trim(),
        };
        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsThinking(true);

        try {
            const botResponse = await generateBotResponse(newUserMessage.text);
            const newBotMessage: Message = {
                id: Date.now().toString() + '-bot',
                sender: 'bot',
                text: botResponse,
            };
            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: Date.now().toString() + '-error',
                sender: 'bot',
                text: "Oops! Something went wrong. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // 🔑 Gemini API Integration
    const generateBotResponse = async (userMessage: string): Promise<string> => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: userMessage }],
                },
            ],
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) return text;

            console.error("Unexpected response structure:", result);
            return "I'm sorry, I couldn't generate a response at this time.";
        } catch (error) {
            console.error("Gemini API call failed:", error);
            throw new Error("API call failed");
        }
    };

    return (
        <div className="font-sans antialiased bg-gray-100 flex items-center justify-center min-h-screen">
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 z-50"
                aria-label="Open Chatbot"
            >
                <Bot size={32} />
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col h-[90vh] max-h-[600px] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 rounded-t-2xl">
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Bot size={24} className="text-green-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">Dodong</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                aria-label="Close Chatbot"
                            >
                                <X size={24} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex items-start max-w-[80%] p-3 rounded-xl shadow-sm ${message.sender === 'user'
                                                ? 'bg-blue-500 text-white rounded-br-none'
                                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {message.sender === 'bot' && (
                                            <Bot size={20} className="mr-2 flex-shrink-0 text-gray-600" />
                                        )}
                                        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                                        {message.sender === 'user' && (
                                            <User size={20} className="ml-2 flex-shrink-0 text-white" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="flex items-center max-w-[80%] p-3 rounded-xl shadow-sm bg-gray-200 text-gray-800 rounded-bl-none">
                                        <Bot size={20} className="mr-2 flex-shrink-0 text-gray-600" />
                                        <p className="text-sm">Dodong is thinking<span className="animate-pulse">...</span></p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                            <div className="relative">
                                <textarea
                                    className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24 sm:h-auto overflow-hidden"
                                    placeholder="Write your question..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    rows={1}
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                    disabled={isThinking}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute bottom-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    aria-label="Send Message"
                                    disabled={isThinking || inputValue.trim() === ''}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Dodong may produce inaccurate responses
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
