"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { LogOut, Menu, User } from "lucide-react";
import Link from "next/link";

const LUCE_LINKS = {
  home: "https://luce.es/",
  collection: "https://luce.es/collection",
  about: "https://luce.es/about",
  contact: "https://luce.es/contact",
};

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="w-full border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          aria-label="Accueil"
        >
          <svg
            width="1024"
            height="1000"
            viewBox="0 0 1024 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto text-black"
            role="img"
            aria-label="Luce Star Icon"
          >
            <title>Luce Star Icon</title>
            <g clipPath="url(#_R_ij6_)">
              <path
                d="M511.999 0C511.999 0 557.152 250.92 662.105 353.413C767.058 455.907 1024 500.001 1024 500.001C1024 500.001 767.058 544.096 662.105 646.587C557.152 749.08 511.999 1000 511.999 1000C511.999 1000 466.849 749.08 361.896 646.587C256.942 544.096 0 500.001 0 500.001C0 500.001 256.942 455.907 361.896 353.413C466.849 250.92 511.999 0 511.999 0Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="_R_ij6_">
                <rect width="1024" height="1000" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="1024"
            height="288"
            viewBox="0 0 1024 288"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto text-black"
            role="img"
            aria-label="Luce Logo"
          >
            <title>Luce Logo</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M526.63 143.911C526.63 95.4905 563.088 59.3632 604.326 59.3632C633.421 59.3632 660.136 77.3464 673.346 104.942H736.176C720.167 45.2787 668.292 0 604.326 0C527.005 0 467.354 66.1577 467.354 143.911C467.354 221.664 527.005 287.822 604.326 287.822C668.292 287.822 720.169 242.543 736.178 182.876H673.349C660.138 210.474 633.423 228.458 604.326 228.458C563.088 228.458 526.63 192.332 526.63 143.911Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M885.789 59.332C852.651 59.332 822.979 81.6854 811.627 114.421H959.948C948.598 81.6854 918.924 59.332 885.789 59.332ZM885.789 228.489C850.846 228.489 819.758 203.637 809.938 167.964H910.385V167.877H1022.07C1023.34 160.064 1024 152.055 1024 143.91C1024 65.7696 963.422 0 885.789 0C808.153 0 747.577 65.7696 747.577 143.91C747.577 222.052 808.153 287.822 885.789 287.822C946.249 287.822 996.364 247.932 1015.58 193.372H949.953C935.373 214.892 911.634 228.489 885.789 228.489Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 180.216V3.79963H59.1569V180.216C59.1569 204.229 78.5498 223.693 102.472 223.693H195.681V283.072H102.472C45.8785 283.072 0 237.022 0 180.216Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M197.581 162.973V3.79963H256.903V162.973C256.903 199.18 286.268 228.53 322.492 228.53C358.719 228.53 388.084 199.18 388.084 162.973V3.79963H447.406V162.973C447.406 231.925 391.481 287.822 322.492 287.822C253.506 287.822 197.581 231.925 197.581 162.973Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* Nav principal */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                rel="noreferrer"
                className={navigationMenuTriggerStyle() + " text-sm font-medium uppercase transition-colors hover:text-primary"}
                style={{ fontFamily: '"Suisse Intl", sans-serif' }}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={LUCE_LINKS.collection}
                
                rel="noreferrer"
                className={navigationMenuTriggerStyle() + " text-sm font-medium uppercase transition-colors hover:text-primary"}
                style={{ fontFamily: '"Suisse Intl", sans-serif' }}
              >
                Collection
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href={LUCE_LINKS.about}
                
                rel="noreferrer"
                className={navigationMenuTriggerStyle() + " text-sm font-medium uppercase transition-colors hover:text-primary"}
                style={{ fontFamily: '"Suisse Intl", sans-serif' }}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/canvas" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + " text-sm font-medium uppercase transition-colors hover:text-primary"}
                  style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                >
                  Canvas
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions à droite */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="hidden md:block h-9 w-16 animate-pulse bg-gray-200 rounded" />
          ) : isAuthenticated ? (
            <>
              <span className="hidden md:inline-flex items-center gap-2 text-sm text-black/70">
                <User className="h-4 w-4" />
                {user?.name || user?.email}
              </span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="hidden md:inline-flex text-black/70 hover:text-black"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              asChild
              className="hidden md:inline-flex text-black/70 hover:text-black"
            >
              <Link href="/login">
                Login
              </Link>
            </Button>
          )}

          <Button
            asChild
            className="rounded-20 bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-600/30 hover:bg-violet-700"
          >
            <a
              href={LUCE_LINKS.contact}
              
              rel="noreferrer"
            >
              <span className="text-base leading-none mr-2">✦</span>
              Get in Touch
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <svg
                    width="1024"
                    height="1000"
                    viewBox="0 0 1024 1000"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-auto text-black"
                    role="img"
                    aria-label="Luce Star Icon"
                  >
                    <g clipPath="url(#_R_ij6_mobile_)">
                      <path
                        d="M511.999 0C511.999 0 557.152 250.92 662.105 353.413C767.058 455.907 1024 500.001 1024 500.001C1024 500.001 767.058 544.096 662.105 646.587C557.152 749.08 511.999 1000 511.999 1000C511.999 1000 466.849 749.08 361.896 646.587C256.942 544.096 0 500.001 0 500.001C0 500.001 256.942 455.907 361.896 353.413C466.849 250.92 511.999 0 511.999 0Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="_R_ij6_mobile_">
                        <rect width="1024" height="1000" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    width="1024"
                    height="288"
                    viewBox="0 0 1024 288"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-auto text-black"
                    role="img"
                    aria-label="Luce Logo"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M526.63 143.911C526.63 95.4905 563.088 59.3632 604.326 59.3632C633.421 59.3632 660.136 77.3464 673.346 104.942H736.176C720.167 45.2787 668.292 0 604.326 0C527.005 0 467.354 66.1577 467.354 143.911C467.354 221.664 527.005 287.822 604.326 287.822C668.292 287.822 720.169 242.543 736.178 182.876H673.349C660.138 210.474 633.423 228.458 604.326 228.458C563.088 228.458 526.63 192.332 526.63 143.911Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M885.789 59.332C852.651 59.332 822.979 81.6854 811.627 114.421H959.948C948.598 81.6854 918.924 59.332 885.789 59.332ZM885.789 228.489C850.846 228.489 819.758 203.637 809.938 167.964H910.385V167.877H1022.07C1023.34 160.064 1024 152.055 1024 143.91C1024 65.7696 963.422 0 885.789 0C808.153 0 747.577 65.7696 747.577 143.91C747.577 222.052 808.153 287.822 885.789 287.822C946.249 287.822 996.364 247.932 1015.58 193.372H949.953C935.373 214.892 911.634 228.489 885.789 228.489Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 180.216V3.79963H59.1569V180.216C59.1569 204.229 78.5498 223.693 102.472 223.693H195.681V283.072H102.472C45.8785 283.072 0 237.022 0 180.216Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M197.581 162.973V3.79963H256.903V162.973C256.903 199.18 286.268 228.53 322.492 228.53C358.719 228.53 388.084 199.18 388.084 162.973V3.79963H447.406V162.973C447.406 231.925 391.481 287.822 322.492 287.822C253.506 287.822 197.581 231.925 197.581 162.973Z"
                      fill="currentColor"
                    />
                  </svg>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <a
                  href={LUCE_LINKS.home}
                  
                  rel="noreferrer"
                  className="text-sm font-medium uppercase transition-colors hover:text-primary"
                  style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                >
                  Home
                </a>
                <a
                  href={LUCE_LINKS.collection}
                  
                  rel="noreferrer"
                  className="text-sm font-medium uppercase transition-colors hover:text-primary"
                  style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                >
                  Collection
                </a>
                <a
                  href={LUCE_LINKS.about}
                  
                  rel="noreferrer"
                  className="text-sm font-medium uppercase transition-colors hover:text-primary"
                  style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                >
                  About
                </a>
                <Link
                  href="/canvas"
                  className="text-sm font-medium uppercase transition-colors hover:text-primary"
                  style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                >
                  Canvas
                </Link>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-black/70 py-2">
                      <User className="h-4 w-4" />
                      {user?.name || user?.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className="flex items-center gap-2 text-sm font-medium uppercase transition-colors hover:text-primary text-left"
                      style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium uppercase transition-colors hover:text-primary"
                    style={{ fontFamily: '"Suisse Intl", sans-serif' }}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
