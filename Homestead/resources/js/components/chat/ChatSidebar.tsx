import { ChatConversation } from '@/types';
import { Search, PlusCircle } from 'lucide-react';

interface ChatSidebarProps {
    conversations: ChatConversation[];
    activeConversationId: string;
    setActiveConversationId: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    conversations,
    activeConversationId,
    setActiveConversationId
}) => {
    return (
        <div className="w-full border sm:w-1/3 md:w-1/4 lg:w-1/5 border-r rounded-2xl me-3 border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search agent..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                    <div
                        key={conv.agent.id}
                        className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors duration-150
              ${activeConversationId === conv.agent.id ? 'bg-green-50 text-green-800 font-semibold' : ''}`}
                        onClick={() => setActiveConversationId(conv.agent.id)}
                    >
                        <img
                            src={conv.agent.avatar}
                            alt={conv.agent.name}
                            className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/333333?text=${conv.agent.name.split(' ').map(n => n[0]).join('')}`;
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <span className="text-sm truncate">{conv.agent.name}</span>
                                {conv.messages.length > 0 && (
                                    <span className="text-xs text-gray-500">
                                        {new Date(conv.messages[conv.messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                            {conv.messages.length > 0 && (
                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                    {conv.messages[conv.messages.length - 1].text}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    );
};

export default ChatSidebar;