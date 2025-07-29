import AppLayout from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';
import RequestItem from '@/components/admin/ReqestItem';
import Dashcom from '@/components/admin/dashboardComponent';
import Fesd from '@/components/admin/feedComponent';
import CreateEvent from '@/components/admin/createEvent';
import Ancom from '@/components/admin/analyticComponent';
import Trancom from '@/components/admin/transactionComponent';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';
import PropertyList from '@/components/EventListing';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Event',
        href: '/admin/event',
    },
];

export default function AdminEvent() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="createEvent" />
            <CreateEvent />
        </AppLayout>
    );
}
