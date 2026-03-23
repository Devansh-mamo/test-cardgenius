import React from 'react'
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/server/auth';
import type { GetServerSidePropsContext } from 'next';
import Topnav from '~/components/topnav';
import Head from 'next/head';
import { api } from "~/utils/api";
import Link from 'next/link';
import { CreditCard, Plus } from 'tabler-icons-react';

const AppIndex = () => {
  const { data } = api.cards.getCardsByUserId.useQuery();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{session?.user.name} — Cards</title>
      </Head>

      <Topnav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
            <p className="text-sm text-gray-500 mt-1">
              {data?.length ?? 0} card{data?.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <Link href="/app/new">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} />
              New Card
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Create card tile */}
          <Link href="/app/new" className="no-underline">
            <div className="group flex flex-col items-center justify-center h-52 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-3 transition-colors">
                <Plus size={24} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Create a card</span>
            </div>
          </Link>

          {/* Card tiles */}
          {data?.map((item) => (
            <Link key={item.id} href={`/app/share/${item.id}`} className="no-underline">
              <div className="group h-52 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                {/* Cover image */}
                <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                  {item.imgUrl ? (
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CreditCard size={36} className="text-white opacity-40" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                  {item.title && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">{item.title}</p>
                  )}
                  {item.company && (
                    <p className="text-xs text-gray-400 truncate">{item.company}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {data?.length === 0 && (
          <div className="text-center py-20">
            <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No cards yet</p>
            <p className="text-gray-400 text-sm mt-1">Create your first digital business card</p>
            <Link href="/app/new">
              <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                <Plus size={16} />
                Create Card
              </button>
            </Link>
          </div>
        )}
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
