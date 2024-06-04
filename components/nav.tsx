'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UserButton from '@/components/user-button'
import Search from '@/components/search'
import { ModeToggle } from '@/components/mode-toggle'

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 25
      setHasScrolled(window.pageYOffset > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navbarChange = hasScrolled
    ? 'backdrop-blur border-b border-primary/20 bg-secondary/90'
    : 'bg-transparent border-b border-transparent'

  return (
    <nav
      className={`fixed flex items-center justify-between max-w-[1600px] top-0 w-full mx-auto z-50 ${navbarChange} transition select-none px-4 sm:px-6 lg:px-8 py-4`}
    >
      <Link href="/" className="flex items-center">
        <h1 className="group text-lg md:text-2xl font-bold">
          <span>nizzy</span>
          <span className="transition-all duration-300 ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            abi
          </span>
        </h1>
      </Link>

      <div className="flex flex-wrap items-center max-h-[40px] h-full">
        <div className="flex items-center font-medium text-[17px] h-full">
          <Link
            href="/courses"
            className="flex items-center hover:bg-primary/5 transition duration-300 px-2 sm:px-4 rounded-lg py-2"
          >
            Courses
          </Link>
        </div>
        <div className="flex items-center gap-1 md:gap-4 h-full">
          <Search />
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  )
}
