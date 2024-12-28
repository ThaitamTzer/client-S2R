'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navLink } from '@/types/navTypes'
import { usePathname } from 'next/navigation'

const Navigation = ({ navLink }: { navLink: navLink[] }) => {
  const [showHeader, setShowHeader] = useState(true)
  const [showBg, setShowBg] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollThreshold = 5
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY === 0 && pathname === '/') {
        // Remove background and show header when at the top of the page
        setShowBg(false)
        setShowHeader(true)
        return
      }

      // Only hide/show header if scroll distance exceeds the threshold
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setShowHeader(false)
          setShowBg(true)
        } else {
          // Scrolling up
          setShowHeader(true)
        }
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav
      className={clsx(
        'fixed top-0 z-modal text-green-500 text-lg font-medium w-full transition-transform duration-300 ease-in-out overflow-hidden',
        {
          '-translate-y-full': !showHeader, // Hide header when scrolling down
          'translate-y-[102px] md:translate-y-16': showHeader, // Show header when scrolling up
          'bg-green-100': showBg, // Add background when not at the top
          'text-white': !showBg, // Change text color based on background
        },
      )}
    >
      <div className="container px-1 md:px-44">
        <ul className="flex flex-row">
          {navLink.map((link) => (
            <Link key={link.href} href={link.href}>
              <li className="p-0 md:text-xl md:px-4 md:py-3 cursor-pointer hover:bg-green-200 hover:text-green-800 px-1 py-3 text-xs font-medium">
                <p
                  className={clsx(
                    'before:none before:left-0 before:right-0 before:-bottom-3 before:mx-auto before:my-0 before:rounded-sm before:h-[1px] md:before:h-[3px] before:bg-green-900 relative',
                    { 'before:absolute text-green-800': isActive(link.href) },
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
  )
}

export default Navigation
