import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import {
  CreditCard,
  Qrcode,
  Users,
  Bulb,
  Mail,
  ChartBar,
  Plug,
  ChevronDown,
  Logout,
  User,
} from 'tabler-icons-react';

const navItems = [
  { label: 'Web Cards', href: '/app/', icon: CreditCard },
  { label: 'QR Codes', href: '#', icon: Qrcode },
  { label: 'Contacts', href: '#', icon: Users },
  { label: 'My Leads', href: '#', icon: Bulb },
  { label: 'Email Signature', href: '#', icon: Mail },
  { label: 'Analytics', href: '#', icon: ChartBar },
  { label: 'Integrations', href: '#', icon: Plug },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-56 flex flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <img src="/card genius icon-01.png" className="h-8 w-8" alt="CardGenius" />
          <span className="text-gray-900 text-base font-semibold tracking-tight">CardGenius</span>
        </div>
      </div>

      {/* Profile */}
      <div className="px-3 py-3 border-b border-gray-100">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {session?.user?.image ? (
              <img src={session.user.image} className="w-7 h-7 rounded-full object-cover" alt="" />
            ) : (
              <User size={14} className="text-indigo-600" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 truncate flex-1 text-left">
            {session?.user?.name ?? 'My Profile'}
          </span>
          <ChevronDown size={13} className={`flex-shrink-0 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
        </button>

        {profileOpen && (
          <div className="mt-1 mx-1 rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
            >
              <Logout size={13} />
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = router.pathname === href || (href === '/app/' && router.pathname === '/app');
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                active
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={16} className={active ? 'text-indigo-600' : 'text-gray-400'} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-sm">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
