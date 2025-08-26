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
import Fesd from '@/components/admin/listDocs';
import GEO from '@/components/admin/geo';
import { useState } from "react";
import axios from "axios";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            const response = await axios.post<{ answer: string }>("/api/search-ai", { query });
            setResult(response.data.answer);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col">
                <div className="min-h-screen">
                

                    {/* Existing components */}
                    <PropertyList />
             
                </div>
                <ChatBot/>
            </div>
        </AppLayout>
    );
}