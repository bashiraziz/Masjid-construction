import Link from "next/link"
import { HandHeart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <HandHeart className="h-8 w-8 text-green-700" />
            <span className="text-xl font-bold text-gray-800">MosqueFund</span>
          </div>
          <div className="flex space-x-6 text-gray-600">
            <Link href="/" className="hover:text-green-700">
              Home
            </Link>
            <Link href="/projects" className="hover:text-green-700">
              Projects
            </Link>
            <Link href="/donations" className="hover:text-green-700">
              Donations
            </Link>
            <Link href="/contact" className="hover:text-green-700">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MosqueFund. All rights reserved.</p>
          <p className="mt-1">A project to build houses of Allah in Uganda.</p>
        </div>
      </div>
    </footer>
  )
}
