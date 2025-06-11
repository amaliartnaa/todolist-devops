"use client";

import Link from "next/link";

import { siteConfig } from "../config/site";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-auto min-w-fit bg-neutral-900 backdrop-blur-md shadow-lg rounded-xl z-50 px-6 py-3 flex justify-center">
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
