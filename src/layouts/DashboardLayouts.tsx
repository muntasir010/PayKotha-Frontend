import { AppSidebar } from "@/components/app.sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import ProfileDropdown from "@/components/common/ProfileDropDown";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* 🔹 Header */}
        <header
          className="flex h-16 shrink-0 items-center justify-between 
                     border-b px-4 backdrop-blur-md bg-background/70 sticky top-0 z-50"
        >
          {/* Left side - Sidebar trigger + Back Home button */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleBackHome}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary/10 transition"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Back Home</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Go back to Home page
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          {/* Right side - Avatar */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-9 h-9 cursor-pointer">
                    <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
                    <AvatarFallback><ProfileDropdown/></AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  User Profile
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        {/* 🔹 Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-0 md:p-4 bg-background/50">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
