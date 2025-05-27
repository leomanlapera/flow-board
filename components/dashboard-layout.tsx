"use client";

import type React from "react";
import {
  Bell,
  Home,
  Plus,
  Search,
  Settings,
  Star,
  Users,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const boards = [
  { id: 1, name: "Project Alpha", starred: true, color: "bg-blue-500" },
  { id: 2, name: "Marketing Campaign", starred: false, color: "bg-green-500" },
  { id: 3, name: "Product Roadmap", starred: true, color: "bg-purple-500" },
  { id: 4, name: "Bug Tracking", starred: false, color: "bg-red-500" },
];

const teams = [
  { id: 1, name: "Development Team", memberCount: 8 },
  { id: 2, name: "Marketing Team", memberCount: 5 },
  { id: 3, name: "Design Team", memberCount: 3 },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">FB</span>
          </div>
          <span className="font-semibold">FlowBoard</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="h-4 w-4" />
                  <span>Teams</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center justify-between w-full">
              <span>Starred Boards</span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add starred board</span>
              </Button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards
                .filter((board) => board.starred)
                .map((board) => (
                  <SidebarMenuItem key={board.id}>
                    <SidebarMenuButton>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{board.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center justify-between w-full">
              <span>Recent Boards</span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add new board</span>
              </Button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton>
                    <div className={`h-4 w-4 rounded ${board.color}`} />
                    <span>{board.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Teams</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((team) => (
                <SidebarMenuItem key={team.id}>
                  <SidebarMenuButton>
                    <Users className="h-4 w-4" />
                    <span>{team.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {team.memberCount}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/1639186?v=4"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center gap-4 border-b bg-background px-6 py-3">
          <SidebarTrigger />
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search boards, cards, and teams..."
                className="pl-9"
                aria-label="Search"
              />
            </div>
            <Button variant="outline" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span>New Board</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>New Team</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Import Board</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
