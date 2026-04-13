import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { message } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/server/auth';
import type { GetServerSidePropsContext } from 'next';
import Sidebar from '~/components/sidebar';
import BadgeCard from '~/components/previewCard';
import { CgWebsite } from 'react-icons/cg';
import {
  BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp,
  BrandYoutube, BrandFacebook, BrandGithub,
  Mail, Link as LinkIcon, MapPin, Phone, AlertCircle,
  Check, ArrowLeft, DeviceFloppy,
} from 'tabler-icons-react';

type FormValues = {
  imgUrl: string; logoUrl: string; name: string; title: string;
  company: string; phone: string; email: string; address: string;
  websitelink: string; link: string; github: string; twitter: string;
  instagram: string; linkedin: string; facebook: string; youtube: string; whatsapp: string;
};

const socialFields = [
  { key: 'phone',      label: 'Phone',     icon: Phone,          color: 'bg-violet-500', hint: null },
  { key: 'email',      label: 'Email',     icon: Mail,           color: 'bg-orange-500', hint: null },
  { key: 'address',    label: 'Address',   icon: MapPin,         color: 'bg-blue-500',   hint: null },
  { key: 'websitelink',label: 'Website',   icon: CgWebsite,      color: 'bg-amber-500',  hint: null },
  { key: 'link',       label: 'Link',      icon: LinkIcon,       color: 'bg-green-500',  hint: null },
  { key: 'github',     label: 'GitHub',    icon: BrandGithub,    color: 'bg-gray-700',   hint: 'Enter your GitHub username' },
  { key: 'twitter',    label: 'Twitter',   icon: BrandTwitter,   color: 'bg-sky-500',    hint: 'Enter your Twitter username' },
  { key: 'instagram',  label: 'Instagram', icon: BrandInstagram, color: 'bg-pink-500',   hint: 'Enter your Instagram username' },
  { key: 'linkedin',   label: 'LinkedIn',  icon: BrandLinkedin,  color: 'bg-blue-700',   hint: 'Enter your LinkedIn username' },
  { key: 'facebook',   label: 'Facebook',  icon: BrandFacebook,  color: 'bg-blue-600',   hint: null },
  { key: 'youtube',    label: 'YouTube',   icon: BrandYoutube,   color: 'bg-red-500',    hint: null },
  { key: 'whatsapp',   label: 'WhatsApp',  icon: BrandWhatsapp,  color: 'bg-green-600',  hint: 'With country code e.g. 91XXXXXXXXXX' },
];

const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-400";
const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

const New = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate, isLoading: isCreating } = api.cards.createCard.useMutation({
    onSuccess: () => { message.success('Card created!'); void router.push('/app/'); },
    onError: (e) => {
      const msg = e.data?.zodError?.fieldErrors.content?.[0];
      message.error(msg ?? 'Failed to create card. Please try again.');
    },
  });

  const { register, watch, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const watched = watch();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setEnabled(p => ({ ...p, [key]: !p[key] }));
  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Create Card — CardGenius</title></Head>

      <Sidebar />

      <div className="ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/app/" className="no-underline">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                <ArrowLeft size={15} />
                Back
              </button>
            </Link>
            <div className="w-px h-4 bg-gray-200" />
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Create a new card</h1>
              <p className="text-xs text-gray-400 mt-0.5">Fill in your details and add the fields you need</p>
            </div>
          </div>
          <button
            form="card-form"
            type="submit"
            disabled={isCreating}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <DeviceFloppy size={15} />
            {isCreating ? 'Creating...' : 'Create Card'}
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 flex gap-0 overflow-hidden">
          {/* LEFT — scrollable form */}
          <div className="w-[420px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
            <form id="card-form" onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 space-y-6">

              {/* Basic Info */}
              <section>
                <p className={labelClass}>Basic Info</p>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Cover Image URL</label>
                    <input className={inputClass} type="text" placeholder="https://..." {...register('imgUrl')} />
                  </div>
                  <div>
                    <label className={labelClass}>Logo URL</label>
                    <input className={inputClass} type="text" placeholder="https://..." {...register('logoUrl')} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Name <span className="text-red-500 normal-case">*</span>
                    </label>
                    <input
                      className={inputClass}
                      type="text"
                      placeholder="Your full name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input className={inputClass} type="text" placeholder="e.g. Software Engineer" {...register('title')} />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input className={inputClass} type="text" placeholder="Company name" {...register('company')} />
                  </div>
                </div>
              </section>

              <div className="border-t border-gray-100" />

              {/* Field toggles */}
              <section>
                <p className={labelClass}>Add Fields</p>
                <div className="grid grid-cols-3 gap-2">
                  {socialFields.map(({ key, label, icon: Icon, color }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(key)}
                      className={`relative flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all
                        ${enabled[key]
                          ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm'
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white'
                        }`}
                    >
                      {enabled[key] && (
                        <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <Check size={8} color="white" />
                        </span>
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${enabled[key] ? color : 'bg-gray-200'}`}>
                        <Icon size={16} color="white" />
                      </div>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Dynamic fields */}
              {socialFields.some(f => enabled[f.key]) && (
                <>
                  <div className="border-t border-gray-100" />
                  <section>
                    <p className={labelClass}>Contact Details</p>
                    <div className="space-y-3">
                      {socialFields.map(({ key, label, hint, icon: Icon, color }) =>
                        enabled[key] ? (
                          <div key={key}>
                            <label className={labelClass}>
                              <span className="flex items-center gap-1.5 normal-case">
                                <span className={`inline-flex w-4 h-4 rounded items-center justify-center ${color}`}>
                                  <Icon size={10} color="white" />
                                </span>
                                {label}
                              </span>
                            </label>
                            <div className="relative">
                              {key === 'address' ? (
                                <textarea
                                  rows={3}
                                  className={inputClass + ' resize-none'}
                                  placeholder={`Enter ${label.toLowerCase()}`}
                                  {...register(key as keyof FormValues)}
                                />
                              ) : (
                                <input
                                  className={inputClass + (hint ? ' pr-8' : '')}
                                  type={key === 'email' ? 'email' : 'text'}
                                  placeholder={hint ?? `Enter ${label.toLowerCase()}`}
                                  {...register(key as keyof FormValues)}
                                />
                              )}
                              {hint && (
                                <div className="absolute right-2.5 top-2.5 group">
                                  <AlertCircle size={15} className="text-gray-400 cursor-help" />
                                  <div className="absolute right-0 bottom-6 w-52 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 hidden group-hover:block z-10 shadow-xl">
                                    {hint}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </section>
                </>
              )}
            </form>
          </div>

          {/* RIGHT — sticky live preview */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
            <p className={labelClass + ' mb-4'}>Live Preview</p>
            <div className="flex justify-center">
              <BadgeCard
                image={watched.imgUrl || null}
                name={watched.name || null}
                title={watched.title || null}
                logo={watched.logoUrl || null}
                company={watched.company || null}
                color={null}
                phone={enabled.phone ? (watched.phone || null) : null}
                email={enabled.email ? (watched.email || null) : null}
                address={enabled.address ? (watched.address || null) : null}
                websitelink={enabled.websitelink ? (watched.websitelink || null) : null}
                link={enabled.link ? (watched.link || null) : null}
                github={enabled.github ? (watched.github || null) : null}
                twitter={enabled.twitter ? (watched.twitter || null) : null}
                instagram={enabled.instagram ? (watched.instagram || null) : null}
                linkedin={enabled.linkedin ? (watched.linkedin || null) : null}
                facebook={enabled.facebook ? (watched.facebook || null) : null}
                youtube={enabled.youtube ? (watched.youtube || null) : null}
                whatsapp={enabled.whatsapp ? (watched.whatsapp || null) : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) return { redirect: { destination: '/auth/signin', permanent: false } };
  return { props: {} };
}
