// src/components/authpage/nav.tsx
"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLink } from "@/types/navTypes";

const Navigation = ({ navLink }: { navLink: navLink[] }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 z-modal bg-green-100 text-black text-lg font-medium w-full transition-transform duration-300 overflow-hidden",
          {
            "-translate-y-0": !showHeader,
            "translate-y-11": showHeader,
          },
        )}
      >
        <div className="container px-44">
          <ul className="flex flex-row">
            {navLink.map((link) => (
              <Link key={link.href} href={link.href}>
                <li
                  key={link.href}
                  className="px-4 py-3 cursor-pointer hover:bg-green-200 hover:text-green-800"
                >
                  <p
                    className={clsx(
                      "before:none before:left-0 before:right-0  before:-bottom-3 before:mx-auto before:my-0 before:rounded-sm before:h-[3px] before:bg-green-900 relative ",
                      { "before:absolute text-green-800": isActive(link.href) },
                    )}
                  >
                    {link.label}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
