'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/user/dashboard', icon: HomeIcon },
  { name: 'My Listings', href: '/user/dashboard/listings', icon: DocumentTextIcon },
  { name: 'New Product', href: '/user/dashboard/new-product', icon: PlusCircleIcon },
  { name: 'Profile', href: '/user/dashboard/profile', icon: UserIcon },
  { name: 'History', href: '/user/dashboard/history', icon: ClockIcon },
]

export default function UserSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      // Explicitly redirect to user login page after logout
      router.push('/user/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex flex-col shadow-xl relative overflow-hidden fixed left-0">
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-10"></div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-6 border-b border-gray-800/50">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-white">
            User Dashboard
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-900/20'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-purple-300'
                  }`}
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-gray-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
          >
            <ArrowLeftOnRectangleIcon
              className="mr-3 h-5 w-5 text-purple-300"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}