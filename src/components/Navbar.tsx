"use client";

import Link from "next/link";

import { siteConfig } from "../config/site";

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 flex w-auto min-w-fit -translate-x-1/2 justify-center rounded-xl bg-neutral-900 px-6 py-3 shadow-lg backdrop-blur-md">
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white">
        {siteConfig.navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
