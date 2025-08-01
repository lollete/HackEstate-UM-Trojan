import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MessageCircleMore } from 'lucide-react';
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
        title: 'Request',
        href: '/admin/property',
        icon: null,
    },
    {
        title: 'Transaction',
        href: '/admin/transaction',
        icon: null,
    },
    {
        title: 'Create Event',
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
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
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
