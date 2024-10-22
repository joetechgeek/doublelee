import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          DoubleLee Shop
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                Cart (0)
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
