import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '~/utils/api';
import { message, Button } from "antd"
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Input, Group, rem, Tooltip, Textarea, } from '@mantine/core';
import { CgWebsite } from "react-icons/cg";
import { BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, BrandYoutube, BrandFacebook, BrandGithub, Mail, Link, MapPin, Phone, FileDescription, BrandSnapchat, BrandTiktok, BrandPaypal, BrandCashapp, CalendarEvent, BrandDiscord, BrandTwitch, BrandTelegram, BrandSkype, BrandWechat, DeviceNintendo, AlertCircle } from 'tabler-icons-react';
import { useRouter } from 'next/router';
// Selectors Part-1 Start


const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        height: rem(90),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
}));
// Selectors Part-1 END




type FormValues = {
    imgUrl: string
    logoUrl: string
    name: string
    title: string
    company: string
    phone: string
    email: string
    address: string
    websitelink: string
    link: string
    github: string
    twitter: string
    instagram: string
    linkedin: string
    facebook: string
    youtube: string
    whatsapp: string
}

interface EditFormProps {
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

const EditForm = ({ cardId, image, name, title, company, logo, phone, email, address, websitelink, link, github, twitter, instagram, linkedin, facebook, youtube, whatsapp }: EditFormProps) => {
    const router = useRouter()
    const preloadedValues = {
        imgUrl: image,
        logoUrl: logo,
        name: name,
        title: title,
        company: company,
        phone: phone,
        email: email,
        address: address,
        websitelink: websitelink,
        link: link,
        github: github,
        twitter: twitter,
        instagram: instagram,
        linkedin: linkedin,
        facebook: facebook,
        youtube: youtube,
        whatsapp: whatsapp,
    }
    const { mutate:makeEdit, isLoading } = api.cards.EditCardById.useMutation({
        onSuccess: () => {
            message.success('Changes Saved!')
            router.reload()
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                message.error(errorMessage[0]);
            } else {
                message.error("Failed to save changes. Please try again later.");
            }
        }

    });
    const form = useForm<FormValues>({
        defaultValues: preloadedValues
    })
    const { register, control, handleSubmit, formState } = form;


    const { errors } = formState;


    const onSubmit = (data: FormValues) => {
        let cardObject={
            cardId: cardId
        }
        
        let submitData ={
            ...cardObject,...data
        }

        makeEdit(submitData)
    }



    const [addPhone, setAddPhone] = useState(() => {
        if (phone == null || phone == '') {
            return false
        } else return true
    })
    const [addEmail, setAddEmail] = useState(() => {
        if (email == null || email == '') {
            return false
        } else return true
    })
    const [addAddress, setAddAddress] = useState(() => {
        if (address == null || address == '') {
            return false
        } else return true
    })
    const [addWebsite, setAddWebsite] = useState(() => {
        if (websitelink == null || websitelink == '') {
            return false
        } else return true
    })
    const [addLink, setAddLink] = useState(() => {
        if (link == null || link == '') {
            return false
        } else return true
    })
    const [addGithub, setAddGithub] = useState(() => {
        if (github == null || github == '') {
            return false
        } else return true
    })
    const [addTwitter, setAddTwitter] = useState(() => {
        if (twitter == null || twitter == '') {
            return false
        } else return true
    })
    const [addInstagram, setAddInstagram] = useState(() => {
        if (instagram == null || instagram == '') {
            return false
        } else return true
    })
    const [addLinkedIn, setAddLinkedIn] = useState(() => {
        if (linkedin == null || linkedin == '') {
            return false
        } else return true
    })
    const [addFacebook, setAddFacebook] = useState(() => {
        if (facebook == null || facebook == '') {
            return false
        } else return true
    })
    const [addYoutube, setAddYoutube] = useState(() => {
        if (youtube == null || youtube == '') {
            return false
        } else return true
    })
    const [addWhatsapp, setAddWhatsapp] = useState(() => {
        if (whatsapp == null || whatsapp == '') {
            return false
        } else return true
    })
   
    const mockdata = [
        { title: 'Phone', icon: Phone, color: 'violet' },
        { title: 'Email', icon: Mail, color: 'orange' },
        { title: 'Address', icon: MapPin, color: 'blue' },
        { title: 'Website', icon: CgWebsite, color: 'yellow' },
        { title: 'Link', icon: Link, color: 'green' },
        { title: 'Github', icon: BrandGithub, color: 'pink' },
        { title: 'Twitter', icon: BrandTwitter, color: 'blue' },
        { title: 'Instagram', icon: BrandInstagram, color: 'pink' },
        { title: 'LinkedIn', icon: BrandLinkedin, color: 'blue' },
        { title: 'Facebook', icon: BrandFacebook, color: 'blue' },
        { title: 'Youtube', icon: BrandYoutube, color: 'red' },
        { title: 'Whatsapp', icon: BrandWhatsapp, color: 'green' },
    ];



    const handleClick = (param: String) => {
        if (param == 'Phone') {
            { (() => setAddPhone(!addPhone))() }
        } if (param == 'Email') {
            { (() => setAddEmail(!addEmail))() }
        } if (param == 'Address') {
            { (() => setAddAddress(!addAddress))() }
        } if (param == 'Website') {
            { (() => setAddWebsite(!addWebsite))() }
        } if (param == 'Link') {
            { (() => setAddLink(!addLink))() }
        } if (param == 'Github') {
            { (() => setAddGithub(!addGithub))() }
        } if (param == 'Twitter') {
            { (() => setAddTwitter(!addTwitter))() }
        } if (param == 'Instagram') {
            { (() => setAddInstagram(!addInstagram))() }
        } if (param == 'LinkedIn') {
            { (() => setAddLinkedIn(!addLinkedIn))() }
        } if (param == 'Facebook') {
            { (() => setAddFacebook(!addFacebook))() }
        } if (param == 'Youtube') {
            { (() => setAddYoutube(!addYoutube))() }
        } if (param == 'Whatsapp') {
            { (() => setAddWhatsapp(!addWhatsapp))() }
        }
    }



    // Selectors Part-2 START
    const { classes, theme } = useStyles();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} onClick={() => handleClick(item.title)} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

   
    // Selectors Part-2 END

    return (

        <div >
            <div className='lg:flex lg:justify-center'>
                <div className='text-center lg:w-[50%]' >
                    <div className='border border-solid p-5 rounded mx-10'>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className='space-y-2' >
                                <div >
                                    <label className='font-semibold flex mb-1' htmlFor="company">Cover Image URL</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="company" {...register("imgUrl")} />

                                </div>
                                <div >
                                    <label className='font-semibold flex mb-1' htmlFor="company">Logo URL</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="company" {...register("logoUrl")} />

                                </div>
                                <div className=''>
                                    <label className='font-semibold flex mb-1' htmlFor="firstname">Name <span className='ml-1 text-red-600'>*</span></label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="name" {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        }

                                    })} />
                                    <p className='text-red-600 text-[12px] text-left'>{errors.name?.message}</p>
                                </div>


                                <div className='flex-col'>
                                    <label className='font-semibold flex mb-1' htmlFor="title">Title</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug  resize-none' id="title" {...register("title")} />

                                </div>

                                <div >
                                    <label className='font-semibold flex mb-1' htmlFor="company">Company</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="company" {...register("company")} />

                                </div>

                                {/* Fields */}

                                <div className={`${addPhone ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="phone">Phone</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="phone" {...register("phone")} />

                                </div>
                                <div className={`${addEmail ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="email">Email</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="email" id="email" {...register("email")} />

                                </div>
                                <div className={`${addAddress ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="address">Address</label>
                                    <Textarea className='block w-[95%] py-1 text-sm leading-snug  resize-none' type="text" id="address" {...register("address")} />

                                </div>
                                <div className={`${addWebsite ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="websitelink">Website</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="websitelink" {...register("websitelink")} />

                                </div>
                                <div className={`${addLink ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="link">Link</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="link" {...register("link")} />

                                </div>
                                <div className={`${addGithub ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="github">Github</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="github" {...register("github")}
                                        rightSection={
                                            <Tooltip label="Enter your Github username" position="top-end" withArrow>
                                                <div>
                                                    <AlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>} />

                                </div>
                                <div className={`${addTwitter ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="twitter">Twitter</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="twitter" {...register("twitter")}
                                        rightSection={
                                            <Tooltip label="Enter your twitter username" position="top-end" withArrow>
                                                <div>
                                                    <AlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>}
                                    />

                                </div>
                                <div className={`${addInstagram ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="instagram">Instagram</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="instagram" {...register("instagram")}
                                        rightSection={
                                            <Tooltip label="Enter your instagram username" position="top-end" withArrow>
                                                <div>
                                                    <AlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>} />

                                </div>
                                <div className={`${addLinkedIn ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="linkedlink">LinkedIn</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="linkedlink" {...register("linkedin")}
                                        rightSection={
                                            <Tooltip label="Enter your LinkedIn username" position="top-end" withArrow>
                                                <div>
                                                    <AlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>} />

                                </div>
                                <div className={`${addFacebook ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="facebook">Facebook</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="facebook" {...register("facebook")} />

                                </div>
                                <div className={`${addYoutube ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="youtube">Youtube</label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="youtube" {...register("youtube")} />

                                </div>
                                <div className={`${addWhatsapp ? 'block' : 'hidden'}`} >
                                    <label className='font-semibold flex mb-1' htmlFor="whatsapp">Whatsapp<span className='font-normal ml-1'> (with country code)</span></label>
                                    <Input className='block w-[95%] py-1 text-sm leading-snug ' type="text" id="whatsapp" {...register("whatsapp")}
                                        rightSection={
                                            <Tooltip label="Enter with country code for example 91XXXXXXXXXX" position="top-end" withArrow>
                                                <div>
                                                    <AlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                                </div>
                                            </Tooltip>} />

                                </div>

                            </div>


                            <div className='py-3'>
                                {/* loading */}
                                <Button htmlType='submit' type='primary' loading={isLoading} className="text-white font-bold x-4 rounded">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* <DevTool control={control} /> */}
                </div >

                {/* Selectors Part-3 START */}

                <div className='lg:w-[40%] lg:pt-0 lg:px-0 pt-10 px-10'>
                    <Card withBorder radius="md" className={classes.card}>
                        <Group position="apart">
                            <Text className={classes.title}>Add/remove fields</Text>
                        </Group>
                        <SimpleGrid cols={3} mt="md">
                            {items}
                        </SimpleGrid>
                    </Card>
                </div>
            </div >
        </div>
    )
}

export default EditForm
