import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MessageCircleMore, ShieldQuestionIcon} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Bookmark',
        href: '/Bookmark',
        icon: MessageCircleMore,
    },
    {
        title: 'Event',
        href: '/Event',
        icon: null,
    },
    {
        title: 'Overview',
        href: '/admin/dashboard',
        icon: null,
    },
    {
        title: 'Feedback',
        href: '/admin/feedback',
        icon: null,
    },
    {
        title: 'Property',
        href: '/admin/property',
        icon: null,
    },
    {
        title: 'Transaction',
        href: '/admin/transaction',
        icon: null,
    },
    {
        title: 'Event',
        href: '/admin/event',
        icon: null,
    },
    {
        title: 'Request Tour',
        href: '/admin/inbox',
        icon: null,
    },

];

const footerNavItems: NavItem[] = [
    // {
    //     title: '',
    //     href: '/admin/dashboard',
    //     icon: Folder,
    // },
    {
        title: 'Verification',
        href: '/admin/verification',
        icon: ShieldQuestionIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
