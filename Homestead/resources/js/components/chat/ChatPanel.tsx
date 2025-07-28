import { useState, useRef, useEffect } from 'react';
import { getSortedConversations } from '@/data/chatData';
import ChatSidebar from './ChatSidebar';
import ChatMainArea from './ChatMainArea';
import { Phone, MoreVertical, Image, ThumbsUp, Send } from 'lucide-react';

const ChatPanel = () => {
    const [activeConversationId, setActiveConversationId] = useState<string>(
        getSortedConversations()[0]?.agent.id || ''
    );
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null!); // Using non-null assertion

    const sortedConversations = getSortedConversations();
    const activeConversation = sortedConversations.find(
        (conv) => conv.agent.id === activeConversationId
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversationId, activeConversation?.messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !activeConversation) return;

        const newMessage = {
            id: Date.now().toString(),
            sender: 'user' as const,
            text: inputValue.trim(),
            timestamp: new Date().toISOString(),
        };

        // In a real app, you would update the backend here
        activeConversation.messages.push(newMessage);
        setInputValue('');
    };

    return (
        <div className=" flex justify-center p-4 sm:p-6 font-sans antialiased">
            <div className=" w-full max-w-6xl h-[90vh] max-h-[700px] flex overflow-hidden">
                <ChatSidebar
                    conversations={sortedConversations}
                    activeConversationId={activeConversationId}
                    setActiveConversationId={setActiveConversationId}
                />
                <ChatMainArea
                    activeConversation={activeConversation}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleSendMessage={handleSendMessage}
                    messagesEndRef={messagesEndRef}
                />
            </div>
        </div>
    );
};

export default ChatPanel;