
import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Logo from "../ui/logo";
import { ModeToggle } from "./Mode.Toggler";
import ProfileDropdown from "./ProfileDropDown";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
];

const Navbar = () => {
   const { data: userData } = useUserInfoQuery(undefined);

  const userRole = userData?.data?.user?.role;

  // Filter links based on user role
  const filteredLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") return true;
    if (userRole && link.role === userRole) return true;
    return false;
    
  });

  return (
   <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      
      {/* Container for the navigation content */}
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3"> 
          
          {/* Left side: Logo & Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger*/}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 lg:hidden"
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
                      className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-44 p-1 lg:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {filteredLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `flex w-full px-3 py-2 text-sm font-medium rounded-md transition-all ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            <Link className="flex items-center gap-2" to={"/"}>
              <Logo />
              <h2 className="text-xl md:text-2xl text-foreground font-bold tracking-tight">
                PayKotha
              </h2>
            </Link>
          </div>

          {/* Center side: Desktop Navigation (Only visible on lg devices) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="lg:gap-4">
                {filteredLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Utilities */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


