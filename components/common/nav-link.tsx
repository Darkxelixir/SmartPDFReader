'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This component is a simple navigation link that can be used throughout the application.
export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {

    const pathName = usePathname();
    // If the current path matches the href, we can apply an active class
    const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-purple-500",
        className,
        isActive && "text-blue-500 font-semibold",
      )}
    >
      {children}
    </Link>
  );
}
