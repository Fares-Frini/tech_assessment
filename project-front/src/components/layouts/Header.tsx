"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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

const NAV_ITEMS = [
  { label: "Home", href: "/", external: false },
  { label: "Collection", href: LUCE_LINKS.collection, external: true },
  { label: "About", href: LUCE_LINKS.about, external: true },
  { label: "Canvas", href: "/canvas", external: false },
];

function LuceLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 1024 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-hidden="true"
      >
        <path
          d="M511.999 0C511.999 0 557.152 250.92 662.105 353.413C767.058 455.907 1024 500.001 1024 500.001C1024 500.001 767.058 544.096 662.105 646.587C557.152 749.08 511.999 1000 511.999 1000C511.999 1000 466.849 749.08 361.896 646.587C256.942 544.096 0 500.001 0 500.001C0 500.001 256.942 455.907 361.896 353.413C466.849 250.92 511.999 0 511.999 0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        viewBox="0 0 1024 288"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-hidden="true"
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
    </div>
  );
}

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
          aria-label="Luce Canvas Home"
        >
          <LuceLogo className="h-7 md:h-8" />
          <span className="text-lg md:text-xl font-semibold tracking-tight">Canvas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-sm font-medium text-black/70 hover:text-black transition-colors rounded-lg hover:bg-black/5"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-black/70 hover:text-black transition-colors rounded-lg hover:bg-black/5"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-20 animate-pulse bg-black/5 rounded-lg" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5">
                <User className="h-4 w-4 text-black/60" />
                <span className="text-sm font-medium text-black/70 max-w-[120px] truncate">
                  {user?.name || user?.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="text-black/60 hover:text-black hover:bg-black/5"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-black/70 hover:text-black hover:bg-black/5"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button
            asChild
            size="sm"
            className="rounded-xl bg-violet-600 px-4 text-white shadow-sm shadow-violet-600/30 hover:bg-violet-700 transition-colors"
          >
            <a href={LUCE_LINKS.contact} target="_blank" rel="noreferrer">
              <span className="mr-1.5">✦</span>
              Get in Touch
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetHeader className="px-6 py-4 border-b border-black/10">
                <SheetTitle className="flex items-center gap-2 text-black">
                  <LuceLogo className="h-6" />
                  <span className="text-lg font-semibold">Canvas</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col h-[calc(100vh-73px)]">
                <nav className="flex-1 px-6 py-6">
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.label}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center px-3 py-3 text-base font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="flex items-center px-3 py-3 text-base font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="px-6 py-6 border-t border-black/10 bg-black/[0.02]">
                  {isLoading ? (
                    <div className="h-12 animate-pulse bg-black/5 rounded-xl" />
                  ) : isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-black/10">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-100">
                          <User className="h-5 w-5 text-violet-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-black/50 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="w-full justify-center gap-2 rounded-xl border-black/10 hover:bg-black/5"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full justify-center rounded-xl border-black/10 hover:bg-black/5"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                  )}

                  <Button
                    asChild
                    className="w-full mt-3 rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/30 hover:bg-violet-700"
                  >
                    <a href={LUCE_LINKS.contact} target="_blank" rel="noreferrer">
                      <span className="mr-1.5">✦</span>
                      Get in Touch
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
