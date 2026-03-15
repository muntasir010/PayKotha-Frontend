import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "../ui/logo";
import { ModeToggle } from "./Mode.Toggler";
import { Link } from "react-router";
import { role } from "@/constants/role";
import {
  useUserInfoQuery,
} from "@/redux/features/auth/auth";
import ProfileDropdown from "./ProfileDropDown";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
  { href: "/user", label: "Dashboard", role: role.USER },
];

export default function Component() {
    const { data: userData } = useUserInfoQuery(undefined);

  const userRole = userData?.data?.user?.role;

  // Filter links based on user role
  const filteredLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") return true;
    if (userRole && link.role === userRole) return true;
    return false;
    
  });

  return (
    // 1. Header fixed and backdrop blur added for modern look and better visibility on scroll
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      
      {/* 2. Container for the navigation content */}
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3"> 
          
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filteredLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

            {/* Main nav & Logo */}
            <div className="flex items-center md:gap-4 lg:gap-8">
              <Link className="flex items-center gap-2" to={"/"}>
                <Logo />
                <h2 className="text-xl md:text-2xl text-foreground font-bold tracking-tight">
                  Pay_Kotha
                </h2>
              </Link>

              {/* Desktop Navigation */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="md:gap-4 lg:gap-6">
                  {filteredLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Link 
                        to={link.href} 
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}