import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Mosque Donation</h3>
            <p className="text-sm text-gray-400">Building a better future, together.</p>
          </div>
          <nav className="space-x-4">
            <Link className="hover:text-green-400 transition-colors" href="/">
              Home
            </Link>
            <Link className="hover:text-green-400 transition-colors" href="/projects">
              Projects
            </Link>
            <Link className="hover:text-green-400 transition-colors" href="/donations">
              Donate
            </Link>
            <Link className="hover:text-green-400 transition-colors" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mosque Donation. All rights reserved.</p>
          <p className="mt-2">
            Powered by{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
