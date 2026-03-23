import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Pencil, Trash, ArrowBack } from 'tabler-icons-react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import EditForm from './editForm';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SharenavProps {
    cardId: string;
    image: string | null;
    name: string | null;
    title: string | null;
    logo: string | null;
    company: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    websitelink: string | null;
    link: string | null;
    github: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
    youtube: string | null;
    whatsapp: string | null;
}


const Sharenav = ({ cardId, image, name, title, company, logo, phone, email, address, websitelink, link, github, twitter, instagram, linkedin, facebook, youtube, whatsapp }: SharenavProps) => {
    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data: session } = useSession();
    const { mutate: deleteCard, isLoading: isDeleting } = api.cards.deleteCardById.useMutation({
        onSuccess: () => {
            message.info('Card Deleted')
            router.push(`/app/`)
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                message.error(errorMessage[0]);
            } else {
                message.error("Failed to delete! Please try again later.");
            }
        }

    });
    const handleDelete = () => {
        deleteCard({ Id: cardId })
    }

    return (
        <Disclosure as="nav" className="bg-blue-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className=" h-12 w-auto "
                                        src="../../card genius icon-01.png"
                                        alt="Card Genius"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    {(() => {
                                        if (!session) {
                                            return null
                                        } else return (
                                            <div className="flex space-x-4">
                                                <Link
                                                    href='/app/'
                                                    className={classNames(
                                                        false ? 'bg-gray text-white' : 'text-cyan-400 no-underline hover:bg-blue-500 hover:text-white',
                                                        'rounded-md px-3 py-3 text-base font-medium'
                                                    )}
                                                    aria-current={false ? 'page' : undefined}
                                                >
                                                    <div className='flex space-x-2'><ArrowBack />
                                                        <span > Your Cards</span></div>
                                                </Link>
                                                <a
                                                    onClick={() => {
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className={classNames(
                                                        false ? 'bg-gray text-white' : 'text-cyan-400 no-underline hover:bg-blue-500 hover:text-white',
                                                        'rounded-md px-3 py-3 text-base font-medium'
                                                    )}
                                                    aria-current={false ? 'page' : undefined}
                                                >
                                                    <div className='flex space-x-2 cursor-pointer'><Pencil />
                                                        <span > Edit</span></div>
                                                </a>
                                                <a
                                                    onClick={() => {
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className={classNames(
                                                        false ? 'bg-gray text-white' : 'text-cyan-400 no-underline hover:bg-blue-500 hover:text-white',
                                                        'rounded-md px-3 py-3 text-base font-medium'
                                                    )}
                                                    aria-current={false ? 'page' : undefined}
                                                >
                                                    <div className='flex space-x-2 cursor-pointer'><Trash />
                                                        <span > Delete</span></div>
                                                </a>
                                                <Modal title="Are you sure you want to delete this card?" open={isDeleteModalOpen} onOk={handleDelete} onCancel={() => { setIsDeleteModalOpen(false) }}
                                                    footer={[
                                                        <Button onClick={() => { setIsDeleteModalOpen(false) }}>
                                                            Cancel
                                                        </Button>,
                                                        //loading 
                                                        <Button danger type="primary" loading={isDeleting} color='red' onClick={handleDelete}>
                                                            Delete
                                                        </Button>
                                                    ]}>
                                                    <p>This action cannot be reversed</p>
                                                </Modal>
                                                <Modal title="Edit Card" width={1000} open={isEditModalOpen} onCancel={() => { setIsEditModalOpen(false) }}
                                                    footer={[
                                                        <Button onClick={() => { setIsEditModalOpen(false) }}>
                                                            Cancel
                                                        </Button>,
                                                        //loading 

                                                    ]}>
                                                    <>
                                                        <EditForm cardId={cardId} image={image} name={name} title={title} logo={logo} company={company} phone={phone} email={email} address={address} websitelink={websitelink} link={link} github={github} twitter={twitter} instagram={instagram} linkedin={linkedin} facebook={facebook} youtube={youtube} whatsapp={whatsapp} />
                                                    </>
                                                </Modal>
                                            </div>
                                        )
                                    })()}

                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">

                                    {(() => {
                                        if (!session) {
                                            return (
                                                <Link href='/api/auth/signin'><b className="no-underline text-white">Log in</b></Link>
                                            )
                                        } else return (
                                            <div>
                                                <Menu.Button className="flex rounded-lg p-3 bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <UserIcon className='h-4 w-4 mr-2' /><span>{session?.user.name}</span>
                                                </Menu.Button>
                                            </div>

                                        )
                                    })()}
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button className='bg-white rounded-2xl  h-10 w-32 hover:cursor-pointer' onClick={() => signOut({ callbackUrl: '/' })}>
                                                        <a className={classNames(active ? 'bg-gray-100' : '', 'block py-2 text-sm rounded-2xl text-gray-700')}>
                                                            Sign out
                                                        </a>
                                                    </button>
                                                )}


                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <Disclosure.Button
                                as="a"
                                href='/app/'
                                className={classNames(
                                    'text-gray-300 hover:bg-gray-700 hover:text-white no-underline',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={false ? 'page' : undefined}
                            >
                                <div className='flex space-x-2 cursor-pointer'><ArrowBack />
                                    <span > Your Cards</span></div>
                            </Disclosure.Button>
                            <Disclosure.Button

                                as="a"
                                onClick={() => {
                                    setIsEditModalOpen(true);
                                }}
                                className={classNames(
                                    'text-gray-300 hover:bg-gray-700 hover:text-white no-underline',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={false ? 'page' : undefined}
                            >
                                <div className='flex space-x-2 cursor-pointer'><Pencil />
                                    <span > Edit</span></div>
                            </Disclosure.Button>
                            <Disclosure.Button

                                as="a"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className={classNames(
                                    'text-gray-300 hover:bg-gray-700 hover:text-white no-underline cursor-pointer',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={false ? 'page' : undefined}
                            >
                                <div className='flex space-x-2'><Trash />
                                    <span > Delete</span></div>
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Sharenav;