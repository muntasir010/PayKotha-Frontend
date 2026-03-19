import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
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

  const filteredLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") return true;
    if (userRole && link.role === userRole) return true;
    return false;
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border/40 bg-white/70 dark:bg-background/80 backdrop-blur-xl shadow-sm transition-colors duration-300 animate-in slide-in-from-top-full">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 lg:hidden hover:bg-primary/10 transition-colors"
                  variant="ghost"
                  size="icon"
                >
                  <svg className="pointer-events-none" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L20 12" className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315" />
                    <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                    <path d="M4 12H20" className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-44 p-2 lg:hidden rounded-xl shadow-xl border-border/50 bg-background/95 backdrop-blur-lg animate-in zoom-in-95 duration-200">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {filteredLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `flex w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:translate-x-1"
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

            <Link className="flex items-center gap-2 group/logo" to={"/"}>
              <Logo />
              <h2 className="text-xl md:text-2xl text-foreground font-extrabold tracking-tight transition-all duration-300 group-hover/logo:text-[#FF500B] drop-shadow-sm dark:drop-shadow-[0_0_5px_rgba(255,80,11,0.3)]">
                PayKotha
              </h2>
            </Link>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="lg:gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-border/40 shadow-inner backdrop-blur-md">
                {filteredLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 block ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
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

          <div className="flex items-center gap-4">
            <div className="hover:scale-110 transition-transform duration-300 drop-shadow-sm">
              <ModeToggle />
            </div>
            <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />
            <div className="hover:scale-105 transition-transform duration-300 drop-shadow-sm">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;