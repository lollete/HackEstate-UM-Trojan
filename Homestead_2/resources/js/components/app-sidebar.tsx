import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Bookmark,
    Calendar,
    BarChart3,
    MessageSquareText,
    Home,
    FileText,
    CreditCard,
    CalendarDays,
    Inbox,
    ShieldQuestion
} from 'lucide-react';
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
        icon: Bookmark,
    },
    {
        title: 'Events',
        href: '/Event',
        icon: Calendar,
    },
    {
        title: 'Overview',
        href: '/admin/dashboard',
        icon: BarChart3,
    },
    {
        title: 'Feedback',
        href: '/admin/feedback',
        icon: MessageSquareText,
    },
    {
        title: 'Properties',
        href: '/admin/property',
        icon: Home,
    },
    {
        title: 'Transactions',
        href: '/admin/transaction',
        icon: CreditCard,
    },
    {
        title: 'Admin Events',
        href: '/admin/event',
        icon: CalendarDays,
    },
    {
        title: 'Request Tour',
        href: '/admin/inbox',
        icon: Inbox,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Verification',
        href: '/admin/verification',
        icon: ShieldQuestion,
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
