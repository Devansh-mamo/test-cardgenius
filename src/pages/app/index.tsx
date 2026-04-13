import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/server/auth';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { api } from '~/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CreditCard,
  Plus,
  Pencil,
  Eye,
  Share,
  Bell,
  DeviceMobile,
  Search,
} from 'tabler-icons-react';
import Sidebar from '~/components/sidebar';

const AppIndex = () => {
  const { data, isLoading } = api.cards.getCardsByUserId.useQuery();
  const { data: session } = useSession();
  const [search, setSearch] = useState('');

  const filtered = data?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{session?.user?.name ?? 'Dashboard'} — Cards</title>
      </Head>

      <Sidebar />

      <div className="ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:border-indigo-300 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/new" className="no-underline">
              <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
                <Plus size={15} />
                New Card
              </button>
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 px-6 py-6">
          {/* Page title row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Web Cards</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {data?.length ?? 0} card{(data?.length ?? 0) !== 1 ? 's' : ''}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
              <DeviceMobile size={15} />
              Login to Mobile
            </button>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
                  <div className="h-36 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2.5">
                    <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/2" />
                    <div className="h-5 bg-gray-100 rounded-full animate-pulse w-1/4 mt-1" />
                    <div className="h-px bg-gray-100 mt-3" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-7 bg-gray-100 rounded-lg animate-pulse flex-1" />
                      <div className="h-7 bg-gray-100 rounded-lg animate-pulse flex-1" />
                      <div className="h-7 bg-gray-100 rounded-lg animate-pulse flex-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cards grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Create new tile */}
              <Link href="/app/new" className="no-underline">
                <div className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer" style={{ minHeight: '220px' }}>
                  <div className="w-12 h-12 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors">
                    <Plus size={22} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">Create a card</span>
                  <span className="text-xs text-gray-400 mt-1">Add new digital card</span>
                </div>
              </Link>

              {/* Card items */}
              {(filtered ?? []).map((item) => (
                <CardTile key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && data?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                <CreditCard size={28} className="text-indigo-400" />
              </div>
              <p className="text-gray-800 font-semibold text-base">No cards yet</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                Create your first digital business card and start sharing your profile.
              </p>
              <Link href="/app/new">
                <button className="mt-5 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                  <Plus size={15} />
                  Create Card
                </button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ── Card tile ── */
interface CardItem {
  id: string;
  name: string;
  title?: string | null;
  company?: string | null;
  imgUrl?: string | null;
  logoUrl?: string | null;
}

const CardTile: React.FC<{ item: CardItem }> = ({ item }) => {
  const gradients = [
    'from-indigo-500 to-blue-600',
    'from-violet-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-slate-500 to-indigo-600',
    'from-indigo-400 to-violet-600',
    'from-blue-400 to-indigo-500',
  ];
  const gradient = gradients[item.id.charCodeAt(0) % gradients.length];

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      {/* Cover */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex-shrink-0 overflow-hidden`}>
        {item.imgUrl && (
          <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover" />
        )}
        {/* Avatar — sits inside cover, bottom-left */}
        {item.logoUrl && (
          <div className="absolute bottom-3 left-4">
            <div className="w-10 h-10 rounded-xl border-2 border-white bg-white shadow-md overflow-hidden">
              <img src={item.logoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-3">
        <div>
          <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
          {(item.title || item.company) && (
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {[item.title, item.company].filter(Boolean).join(' · ')}
            </p>
          )}
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
              Published
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pt-1 border-t border-gray-100">
          <Link href={`/app/share/${item.id}`} className="no-underline flex-1" onClick={(e) => e.stopPropagation()}>
            <button className="w-full flex items-center justify-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition-colors">
              <Pencil size={12} />
              Edit
            </button>
          </Link>
          <Link href={`/preview/${item.id}`} className="no-underline flex-1" onClick={(e) => e.stopPropagation()}>
            <button className="w-full flex items-center justify-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition-colors">
              <Eye size={12} />
              View
            </button>
          </Link>
          <Link href={`/app/share/${item.id}`} className="no-underline flex-1" onClick={(e) => e.stopPropagation()}>
            <button className="w-full flex items-center justify-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition-colors">
              <Share size={12} />
              Share
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return { props: {} };
}
