"use client"

import Link from "next/link"
import { Building, HandHeart, Home, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Building },
  { href: "/donations", label: "Donations", icon: HandHeart },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <HandHeart className="h-8 w-8 text-green-700" />
            <span className="text-xl font-bold text-gray-800">MosqueFund</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/projects">Donate Now</Link>
            </Button>
            <button className="md:hidden ml-4 p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <span className="sr-only">Open menu</span>
              {/* Add mobile menu icon here */}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
