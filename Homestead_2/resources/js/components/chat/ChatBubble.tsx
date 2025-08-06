import { ChatMessage, ChatParticipant } from '@/types';
import { MapPin } from 'lucide-react';

interface ChatBubbleProps {
    message: ChatMessage;
    participant: ChatParticipant;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, participant }) => {
    const isUser = message.sender === 'user';
    const avatarSrc = isUser ? 'https://picsum.photos/id/1005/50/50' : participant.avatar;

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && (
                <img
                    src={avatarSrc}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/32x32/CCCCCC/333333?text=${participant.name.split(' ').map(n => n[0]).join('')}`;
                    }}
                />
            )}
            <div
                className={`max-w-[75%] p-3 rounded-xl shadow-sm ${isUser
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
            >
                <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                <p className={`block mt-1 text-xs ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                </p>
            </div>
            {isUser && (
                <img
                    src={avatarSrc}
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover ml-2 flex-shrink-0"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/32x32/CCCCCC/333333?text=You`;
                    }}
                />
            )}
        </div>
    );
};

export default ChatBubble;