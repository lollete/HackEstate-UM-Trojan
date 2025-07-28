import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PropertyList from '@/components/property/PropertyListings';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
import ChatBot from '@/components/modal/Chatbot';
import Footer from '@/components/app-footer';
import AgentProfile from '@/components/users/agent-profile-card';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col ">
                <div className="min-h-screen">
                    <PropertyList />
                </div>
                {/* <ChatBot/> */}
                <AgentProfile/>
            </div>
            <Footer/>
        </AppLayout>
    );
}
