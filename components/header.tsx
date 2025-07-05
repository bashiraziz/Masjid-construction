import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 bg-white shadow-sm">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/placeholder-logo.svg" alt="Mosque Logo" width={32} height={32} />
        <span className="text-lg font-semibold">Mosque Donation</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/">
          Home
        </Link>
        <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/projects">
          Projects
        </Link>
        <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/donations">
          Donations
        </Link>
        <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/contact">
          Contact
        </Link>
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="/donations">Donate Now</Link>
        </Button>
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
            <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/">
              Home
            </Link>
            <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/projects">
              Projects
            </Link>
            <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/donations">
              Donations
            </Link>
            <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/contact">
              Contact
            </Link>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/donations">Donate Now</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
