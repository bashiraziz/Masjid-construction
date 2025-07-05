import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MosqueIcon className="h-6 w-6 text-green-700" />
        <span className="sr-only">Mosque Donations</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Home
        </Link>
        <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Projects
        </Link>
        <Link href="/donations" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Donations
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Donate</Button>
      </nav>
    </header>
  )
}

function MosqueIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12.2V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8.2" />
      <path d="M12 12.2V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8.2" />
      <path d="M5 12.2v.8A2 2 0 0 0 7 15h.8" />
      <path d="M17 12.2v.8A2 2 0 0 0 19 15h.8" />
      <path d="M12 22v-4" />
      <path d="M12 12.2V4l-2 2-2-2" />
      <path d="M12 4l2 2 2-2" />
      <path d="M12 4V2" />
    </svg>
  )
}
