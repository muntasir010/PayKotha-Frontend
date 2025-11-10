/* eslint-disable @typescript-eslint/no-explicit-any */
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
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth";
import { useAppDispatch } from "@/redux/hook";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/articles", label: "Articles", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
  { href: "/user", label: "Dashboard", role: role.USER },
];

export default function Component() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const userRole = data?.data?.user?.role;

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
    } catch (err: any) {
      if (err?.status !== 401) {
        console.error("Logout failed:", err);
      }
    } finally {
      dispatch(authApi.util.resetApiState());
    }
  };

  const filteredLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") {
      return true;
    }

    if (userRole && link.role === userRole) {
      return true;
    }
    return false;
  });

  return (
    <header className="border-b px-2">
      <div className="flex h-10 items-center justify-between gap-3">
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
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
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
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-1" to={"/"}>
              <Logo />
              <h2 className="text-xl md:text-2xl text-gray font-semibold">
                Pay.Kotha
              </h2>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filteredLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink className="py-1.5 font-medium text-muted-foreground hover:text-primary">
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex gap-2">
          <ModeToggle />
          <div>
            {data?.data?.user?.email && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm cursor-pointer"
              >
                Logout
              </Button>
            )}
            {!data?.data?.user?.email && (
              <Button asChild className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
