"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Header() {
  const { setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-950">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Image src="/placeholder-logo.svg" alt="Mosque Logo" width={32} height={32} />
        <span>Mosque Donations</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/donations"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Donations
        </Link>
        <Link
          href="/contact"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden bg-transparent">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 text-lg font-medium mt-6">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/projects" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/donations" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Donations
              </Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
