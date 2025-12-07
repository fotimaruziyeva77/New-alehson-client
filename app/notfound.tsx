import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl">404</h1>
      <Link href="/" className="text-blue-600 underline">
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
