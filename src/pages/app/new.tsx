import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { message } from 'antd';
import { useRouter } from 'next/router';
import Createnav from '~/components/createnav';
import BadgeCard from '~/components/previewCard';
import Head from 'next/head';
import { CgWebsite } from 'react-icons/cg';
import {
  BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp,
  BrandYoutube, BrandFacebook, BrandGithub,
  Mail, Link as LinkIcon, MapPin, Phone, AlertCircle, Check
} from 'tabler-icons-react';

type FormValues = {
  imgUrl: string; logoUrl: string; name: string; title: string;
  company: string; phone: string; email: string; address: string;
  websitelink: string; link: string; github: string; twitter: string;
  instagram: string; linkedin: string; facebook: string; youtube: string; whatsapp: string;
};

const socialFields = [
  { key: 'phone',     label: 'Phone',     icon: Phone,          color: 'bg-violet-500',  hint: null },
  { key: 'email',     label: 'Email',     icon: Mail,           color: 'bg-orange-500',  hint: null },
  { key: 'address',   label: 'Address',   icon: MapPin,         color: 'bg-blue-500',    hint: null },
  { key: 'websitelink',label:'Website',   icon: CgWebsite,      color: 'bg-yellow-500',  hint: null },
  { key: 'link',      label: 'Link',      icon: LinkIcon,       color: 'bg-green-500',   hint: null },
  { key: 'github',    label: 'GitHub',    icon: BrandGithub,    color: 'bg-gray-700',    hint: 'Enter your GitHub username' },
  { key: 'twitter',   label: 'Twitter',   icon: BrandTwitter,   color: 'bg-sky-500',     hint: 'Enter your Twitter username' },
  { key: 'instagram', label: 'Instagram', icon: BrandInstagram, color: 'bg-pink-500',    hint: 'Enter your Instagram username' },
  { key: 'linkedin',  label: 'LinkedIn',  icon: BrandLinkedin,  color: 'bg-blue-700',    hint: 'Enter your LinkedIn username' },
  { key: 'facebook',  label: 'Facebook',  icon: BrandFacebook,  color: 'bg-blue-600',    hint: null },
  { key: 'youtube',   label: 'YouTube',   icon: BrandYoutube,   color: 'bg-red-500',     hint: null },
  { key: 'whatsapp',  label: 'WhatsApp',  icon: BrandWhatsapp,  color: 'bg-green-600',   hint: 'Enter with country code e.g. 91XXXXXXXXXX' },
];

const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400";
const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const New = () => {
  const router = useRouter();
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
      <Head><title>Create Card</title></Head>
      <Createnav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create a new card</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in your details and add the fields you need</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT — Form */}
          <div className="lg:w-[420px] shrink-0">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Basic Info</p>

                <div>
                  <label className={labelClass}>Cover Image URL</label>
                  <input className={inputClass} type="text" placeholder="https://..." {...register('imgUrl')} />
                </div>
                <div>
                  <label className={labelClass}>Logo URL</label>
                  <input className={inputClass} type="text" placeholder="https://..." {...register('logoUrl')} />
                </div>
                <div>
                  <label className={labelClass}>Name <span className="text-red-500">*</span></label>
                  <input className={inputClass} type="text" placeholder="Your full name"
                    {...register('name', { required: 'Name is required' })} />
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

              {/* Field toggles */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Add Fields</p>
                <div className="grid grid-cols-3 gap-2">
                  {socialFields.map(({ key, label, icon: Icon, color }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(key)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all
                        ${enabled[key]
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center ${enabled[key] ? color + ' opacity-90' : 'bg-gray-200'} transition-colors`}>
                        <Icon size={15} color="white" />
                      </div>
                      <span>{label}</span>
                      {enabled[key] && <Check size={10} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic fields */}
              {socialFields.some(f => enabled[f.key]) && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-4 space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Details</p>
                  {socialFields.map(({ key, label, hint, icon: Icon, color }) =>
                    enabled[key] ? (
                      <div key={key}>
                        <label className={labelClass}>
                          <span className="flex items-center gap-1.5">
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
                              <AlertCircle size={16} className="text-gray-400 cursor-help" />
                              <div className="absolute right-0 bottom-6 w-48 bg-gray-800 text-white text-xs rounded-lg px-2.5 py-1.5 hidden group-hover:block z-10 shadow-lg">
                                {hint}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}

              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  {isCreating ? 'Creating...' : 'Create Card'}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT — Preview */}
          <div className="flex-1 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Live Preview</p>
            <BadgeCard
              image={watched.imgUrl ?? null}
              name={watched.name ?? null}
              title={watched.title ?? null}
              logo={watched.logoUrl ?? null}
              company={watched.company ?? null}
              color={null}
              phone={enabled.phone ? (watched.phone ?? null) : null}
              email={enabled.email ? (watched.email ?? null) : null}
              address={enabled.address ? (watched.address ?? null) : null}
              websitelink={enabled.websitelink ? (watched.websitelink ?? null) : null}
              link={enabled.link ? (watched.link ?? null) : null}
              github={enabled.github ? (watched.github ?? null) : null}
              twitter={enabled.twitter ? (watched.twitter ?? null) : null}
              instagram={enabled.instagram ? (watched.instagram ?? null) : null}
              linkedin={enabled.linkedin ? (watched.linkedin ?? null) : null}
              facebook={enabled.facebook ? (watched.facebook ?? null) : null}
              youtube={enabled.youtube ? (watched.youtube ?? null) : null}
              whatsapp={enabled.whatsapp ? (watched.whatsapp ?? null) : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
