// src/components/authpage/nav.tsx
"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  {
    href: "/",
    label: "Trang chủ",
  },
  {
    href: "/shop",
    label: "Cửa hàng",
  },
  {
    href: "/about",
    label: "Về chúng tôi",
  },
  {
    href: "/contact",
    label: "Liên hệ",
  },
];

const Navigation = () => {
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
          "fixed top-0 z-modal bg-green-100 text-green-900 text-lg font-medium w-full transition-transform duration-300",
          {
            "-translate-y-0": !showHeader,
            "translate-y-11": showHeader,
          },
        )}
      >
        <div className="container px-44">
          <ul className="flex flex-row">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <li
                  key={link.href}
                  className="px-4 py-3 cursor-pointer hover:bg-green-200"
                >
                  <p className={clsx({ underline: isActive(link.href) })}>
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
