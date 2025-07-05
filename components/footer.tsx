import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold">Mosque Donation Website</p>
          <p className="text-sm text-gray-400">© 2024 All rights reserved.</p>
        </div>
        <nav className="flex gap-6">
          <Link className="text-sm hover:underline" href="/">
            Home
          </Link>
          <Link className="text-sm hover:underline" href="/projects">
            Projects
          </Link>
          <Link className="text-sm hover:underline" href="/donations">
            Donate
          </Link>
          <Link className="text-sm hover:underline" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
