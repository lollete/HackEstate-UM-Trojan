import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PropertyList from '@/components/EventListing';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event',
        href: '/Event',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-col ">
                <div className="min-h-screen">
                    <PropertyList />
                </div>
              
            </div>
        </AppLayout>
    );
}
