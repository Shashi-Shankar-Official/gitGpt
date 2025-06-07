'use client'

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import useProject from "@/hooks/use-project"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard
    },
]


const AppSidebar = () => {
    const pathname = usePathname();
    const { open } = useSidebar();
    const {projects, projectId, setProjectId} = useProject();
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Image src='/logo.png' alt="logo" width={40} height={40} className="rounded-xl" />
                    {open && (
                        <h1 className="text-xl font-bold text-primary/80">RepoGPT</h1>
                    )}

                </div>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {items.map(item => {
                                return (
                                    <SidebarMenu key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className={cn({
                                                '!bg-primary !text-white': pathname === item.url
                                            })}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenu>
                                )
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map((project, index) => {
                                return (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild>
                                            <div className="flex items-center gap-2 overflow-hidden w-full" onClick={() => {setProjectId(project.id)}}>
                                                <div className={cn(
                                                    'rounded-sm border w-6 h-6 flex items-center justify-center text-sm shrink-0 text-blue-600',
                                                    {
                                                        'bg-primary text-white': project.id === projectId
                                                    }
                                                )}>
                                                    {project.name[0]}
                                                </div>
                                                {open && (
                                                    <div className="overflow-x-auto whitespace-nowrap max-w-[80%] scrollbar-none">
                                                        <div className="inline-block">{project.name}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}


                            <div className="h-2"></div>
                            <SidebarMenuItem>
                                <Link href='/create'>
                                    <Button size='sm' variant={'outline'} className="w-full">
                                        <Plus />
                                        {open && (
                                            <>
                                                Create Project
                                            </>
                                        )}
                                    </Button>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar