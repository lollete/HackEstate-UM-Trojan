import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';

const breadcrumbs = [
    {
        title: 'Chat',
        href: '/Chat',
    },
];

export default function ChatView() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-col justify-between">
                <ChatPanel />
            </div>
        </AppLayout>
    );
}