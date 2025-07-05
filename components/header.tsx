import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-white dark:bg-gray-950">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/placeholder-logo.svg" alt="Mosque Logo" width={32} height={32} className="h-8 w-8" />
        <span className="text-lg font-semibold">Mosque Donations</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link className="font-medium hover:underline" href="/">
          Home
        </Link>
        <Link className="font-medium hover:underline" href="/projects">
          Projects
        </Link>
        <Link className="font-medium hover:underline" href="/donations">
          Donate
        </Link>
        <Link className="font-medium hover:underline" href="/contact">
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden bg-transparent" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 p-4">
            <Link className="font-medium hover:underline" href="/">
              Home
            </Link>
            <Link className="font-medium hover:underline" href="/projects">
              Projects
            </Link>
            <Link className="font-medium hover:underline" href="/donations">
              Donate
            </Link>
            <Link className="font-medium hover:underline" href="/contact">
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
