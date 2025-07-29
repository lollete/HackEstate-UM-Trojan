import AppLayout from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
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
            </div>
        </AppLayout>
    );
}
