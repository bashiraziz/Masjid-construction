import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
      <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Mosque Construction. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/contact" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
      </nav>
    </footer>
  )
}
