import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';

const breadcrumbs = [
    {
        title: 'Chat',
        href: '/chat',
    },
];
type Agent = {
    id: number;
    name: string;
    avatar: string;
};


export default function ChatView({ agent }: { agent: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chat with ${agent?.name || 'Agent'}`} />
            <div className="flex h-full flex-col justify-between">
                <ChatPanel agent={agent} />
            </div>
        </AppLayout>
    );
}
