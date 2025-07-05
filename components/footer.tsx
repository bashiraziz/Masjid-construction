import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/projects" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/donations" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Donate
          </Link>
          <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Mosque Donation Website. All rights reserved.</p>
        <p className="text-sm mt-2">Built with ❤️ for the community.</p>
      </div>
    </footer>
  )
}
