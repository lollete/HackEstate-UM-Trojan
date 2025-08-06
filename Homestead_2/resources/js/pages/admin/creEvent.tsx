import AppLayout from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';
import RequestItem from '@/components/admin/ReqestItem';
import Dashcom from '@/components/admin/dashboardComponent';
import Fesd from '@/components/admin/feedComponent';
import CreateEvent from '@/components/admin/createEvent';
import TableEve from '@/components/admin/tableEvent';
import Ancom from '@/components/admin/analyticComponent';
import Trancom from '@/components/admin/transactionComponent';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';
import PropertyList from '@/components/event/EventListing';
import TextTyping from '@/components/type-writer';
import Luma from '@/components/api/LumaEvents';
import Bookmark from '@/pages/bookmark/bookmarkProperty';
import EventTbl from '@/components/event/event-table'
import Ana from '@/components/admin/analytics-dashboard-event'

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
            <div className='m-3 pe-4'>
            <div className="flex space-x-3 m-3">
                    <div className='border-2 w-100 h-40 rounded-xl p-5 '>
                      <h1 className='font-bold'>Ratings</h1>
                    </div>

                    <div className='text-white bg-stone-900 p-5 bg-blend-darken border-2 w-100 h-40 rounded-xl '>
                     <h1 className=''>Reserve</h1>
                    </div>
            
            </div>
            <h2 className="text-3xl font-bold mt-4 text-gray-900 mb-2 ">Mdddanage Events</h2>
            <div className='m-3 '>
            
            <CreateEvent  />
            <div className='pt-3'>
            
            <EventTbl/>
            </div>
            </div>
            </div>
         
        </AppLayout>
    );
}
