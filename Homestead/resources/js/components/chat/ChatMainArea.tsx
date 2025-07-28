import { ChatConversation } from '@/types';
import PropertyChatCard from './PropertyChatCard';
import ChatBubble from './ChatBubble';
import { MapPin, Image, Phone, MoreVertical, ThumbsUp, Send } from 'lucide-react';

interface ChatMainAreaProps {
    activeConversation: ChatConversation | undefined;
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSendMessage: () => void;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMainArea: React.FC<ChatMainAreaProps> = ({
    activeConversation,
    inputValue,
    setInputValue,
    handleSendMessage,
    messagesEndRef
}) => {
    return (
        <div className="flex-1 flex flex-col border rounded">
            {activeConversation ? (
                <>
                    {/* Chat Header */}
                    <div className="flex items-center  justify-between p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <img
                                src={activeConversation.agent.avatar}
                                alt={activeConversation.agent.name}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${activeConversation.agent.name.split(' ').map(n => n[0]).join('')}`;
                                }}
                            />
                            <div>
                                <span className="font-semibold text-gray-800 block">{activeConversation.agent.name}</span>
                                <span className="text-xs text-gray-500">Active now</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" aria-label="Call Agent">
                                <Phone size={20} className="text-gray-600" />
                            </button>
                            <div className="relative group">
                                <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" aria-label="More Options">
                                    <MoreVertical size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Property Detail Card */}
                    <PropertyChatCard property={activeConversation.property} />

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        {activeConversation.messages.map((msg) => (
                            <ChatBubble
                                key={msg.id}
                                message={msg}
                                participant={activeConversation.agent}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Area */}
                    <div className="p-4  border-gray-200">
                        <div className="flex items-center space-x-2">
                            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200" aria-label="Attach Image">
                                <Image size={24} />
                            </button>
                            <textarea
                                className="flex-1 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-500 h-12 overflow-hidden"
                                placeholder="Aa"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={1}
                                style={{ minHeight: '48px', maxHeight: '120px' }}
                            />
                            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200" aria-label="Thumbs Up">
                                <ThumbsUp size={24} />
                            </button>
                            <button
                                onClick={handleSendMessage}
                                className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-md"
                                aria-label="Send Message"
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a chat to view messages.
                </div>
            )}
        </div>
    );
};

export default ChatMainArea;