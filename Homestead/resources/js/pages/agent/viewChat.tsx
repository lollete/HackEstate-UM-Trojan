// resources/js/Pages/agent/viewChat.tsx

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PropertyList from '@/components/EventListing';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
import ChatList from '@/components/users/chatPanel';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: '/Chat',
    },
];

export default function ChatView() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-col justify-between min-h-screen">
             <ChatList/>
            </div>
        </AppLayout>
    );
}
