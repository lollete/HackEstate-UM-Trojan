import AppLayout from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';
import RequestItem from '@/components/admin/ReqestItem';
import Dashcom from '@/components/admin/dashboardComponent';
import CreateProp from '@/components/admin/createProp';
import Ancom from '@/components/admin/analyticComponent';
import Trancom from '@/components/admin/transactionComponent';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';
import PropertyList from '@/components/event/EventListing';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Property',
        href: '/admin/property',
    },
];

export default function Property() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Property" />
            <CreateProp />
        </AppLayout>
    );
}
