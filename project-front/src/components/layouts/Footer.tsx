"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import Link from "next/link";

const LUCE_LINKS = {
  about: "https://luce.es/about",
  collection: "https://luce.es/collection",
  contact: "https://luce.es/contact",
  privacy: "https://luce.es/privacy-policy",
  terms: "https://luce.es/terms-of-service",
  cookies: "https://luce.es/cookies-policy",
  instagram: "https://www.instagram.com/luce.es/",
  tiktok: "https://www.tiktok.com/@luce.es",
};

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-black">
              COMPANY
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>
                <a
                  href={LUCE_LINKS.about}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={LUCE_LINKS.collection}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href={LUCE_LINKS.contact}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Contact Us — We're here to help
                </a>
              </li>
              <li>
                <Link href="/canvas" className="hover:text-black transition-colors">
                  Canvas (project)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-black">
              LEGAL
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>
                <a
                  href={LUCE_LINKS.privacy}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={LUCE_LINKS.terms}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href={LUCE_LINKS.cookies}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Cookies Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-black">
              SOCIAL
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>
                <a
                  href={LUCE_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={LUCE_LINKS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          {/* Stay updated */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-black">
              STAY UPDATED
            </h3>
            <p className="mt-4 text-sm text-black/70">
              Subscribe to receive the latest updates and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border-black/10 bg-white text-sm focus-visible:ring-violet-200 focus-visible:border-violet-400"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/30 hover:bg-violet-700"
                aria-label="Subscribe"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </form>

            {/* Checkboxes */}
            <div className="mt-4 space-y-3 text-xs text-black/70">
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  id="terms"
                  className="mt-0.5 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <span className="leading-tight">
                  I accept the{" "}
                  <a
                    href={LUCE_LINKS.terms}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-700 hover:underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href={LUCE_LINKS.privacy}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-700 hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  *
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  id="data-processing"
                  className="mt-0.5 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <span className="leading-tight">
                  I consent to data processing for newsletter delivery *
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  id="email-consent"
                  className="mt-0.5 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <span className="leading-tight">
                  I consent to receive email communications *
                </span>
              </label>
              <p className="text-red-500">* Required</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="mt-10 bg-black/5" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span>✦</span>
            <span>Luce Canvas</span>
          </div>
          <p className="text-xs text-black/60">
            © {new Date().getFullYear()} Luce Canvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
