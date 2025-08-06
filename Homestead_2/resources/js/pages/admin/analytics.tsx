import AppLayout from '@/layouts/admin/app-layout-admin';
import { Head } from '@inertiajs/react';
import ChatPanel from '@/components/chat/ChatPanel';
import RequestItem from '@/components/admin/ReqestItem';
import Dashcom from '@/components/admin/dashboardComponent';
import Ancom from '@/components/admin/analyticComponent';
import Trancom from '@/components/admin/transactionComponent';
const breadcrumbs = [
    {
        title: 'Analytics',
        href: '/analytics',
    },
];


export default function ChatView({ agent }: { agent: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chat with ${agent?.name || 'Agent'}`} />
            <Ancom />
         
        </AppLayout>
    );
}
