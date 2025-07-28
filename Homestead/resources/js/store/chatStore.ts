import { create } from 'zustand';
import { ChatConversation, ChatMessage } from '@/types';
import { getSortedConversations } from '@/data/chatData';

interface ChatStore {
    conversations: ChatConversation[];
    activeConversationId: string;
    setActiveConversationId: (id: string) => void;
    addMessage: (conversationId: string, message: ChatMessage) => void;
}

const useChatStore = create<ChatStore>((set) => ({
    conversations: getSortedConversations(),
    activeConversationId: getSortedConversations()[0]?.agent.id || '',
    setActiveConversationId: (id) => set({ activeConversationId: id }),
    addMessage: (conversationId, message) =>
        set((state) => ({
            conversations: state.conversations.map(conv =>
                conv.agent.id === conversationId
                    ? { ...conv, messages: [...conv.messages, message] }
                    : conv
            ).sort((a, b) => {
                const lastA = a.messages[a.messages.length - 1]?.timestamp || '';
                const lastB = b.messages[b.messages.length - 1]?.timestamp || '';
                return new Date(lastB).getTime() - new Date(lastA).getTime();
            })
        })),
}));

export default useChatStore;