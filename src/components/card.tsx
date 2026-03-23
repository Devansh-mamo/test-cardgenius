import {
    Card,
    Image,
    Text,
    Group,
    createStyles,
    rem,
    CardSection,
    SimpleGrid, Box, Stack, ThemeIcon
} from '@mantine/core';

import { At, BrandFacebook, BrandGithub, BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, BrandYoutube, Link, MapPin, Phone } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.white,
    },

    icon: {
        marginRight: theme.spacing.md,
        backgroundImage: theme.colors.blue,
    },

    type: {
        color: theme.colors.gray[6],
    },

    entry: {
        color: theme.black,
    },
}));

interface BadgeCardProps {
    image: string | null;
    name: string | null;
    title: string | null;
    logo: string | null;
    company: string | null;
    color: string | null;
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

export default function BadgeCard({ image, name, title, company, logo, phone, email, address, websitelink, link, github, twitter, instagram, linkedin, facebook, youtube, whatsapp, color }: BadgeCardProps) {
    const { classes, cx } = useStyles();
    // console.log('this is the type of the image' + image)

    return (
        <>
            <div className='w-full md:w-2/3 lg:w-1/3'>
                <Card withBorder radius="md" p="md" className={classes.card}>
                    {(() => {
                        if (image == null) {
                            return null
                        } else return (
                            <Card.Section>
                                <Image src={image} height={300} alt='' />
                            </Card.Section>
                        )
                    })()}

                    <CardSection>
                        <div className={`${color} h-6`}> </div>
                    </CardSection>
                    <CardSection>
                        <Text fz="xl" fw={600} className={classes.section}>
                            {name}
                        </Text>
                    </CardSection>
                    <Card.Section className={classes.section} mt="md">
                        <Group position="apart">
                            <Text fz="lg" fw={500}>
                                {title}
                            </Text>
                            {(() => {
                                if (logo == null) {
                                    return null
                                } else return <Image src={logo} height={50} width={50} alt='' />
                            })()}


                        </Group>
                        <Text fz="sm" mt="xs">
                            {company}
                        </Text>
                    </Card.Section>

                    <Card.Section className={classes.section}>


                        <div className='mt-4'>
                            {/*FIELDS*/}
                            <SimpleGrid cols={1} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
                                <Box
                                    sx={(theme: any) => ({
                                        padding: theme.spacing.sm,
                                        borderRadius: theme.radius.md,
                                        backgroundColor: theme.white,
                                    })}
                                >
                                    <Stack>
                                        {(() => {
                                            if (phone == null || phone == '') {
                                                return null
                                            } else return (
                                                <div className='flex'>
                                                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                        <Phone />
                                                    </ThemeIcon>

                                                    <div>
                                                        <Text size="xs" className={classes.type} >
                                                            Phone
                                                        </Text>
                                                        <Text className={classes.entry}>{phone}</Text>
                                                    </div>
                                                </div>
                                            )
                                        })()}

                                        {(() => {
                                            if (email == null || email == '') {
                                                return null
                                            } else return (
                                                <a href={`mailto:${email}`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <At />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Email
                                                            </Text>
                                                            <Text className={classes.entry}>{email}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (address == null || address == '') {
                                                return null
                                            } else return (
                                                <div className={cx(classes.wrapper)}>

                                                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                        <MapPin />
                                                    </ThemeIcon>

                                                    <div>
                                                        <Text size="xs" className={classes.type} >
                                                            Address
                                                        </Text>
                                                        <Text className={classes.entry}>{address}</Text>
                                                    </div>
                                                </div>
                                            )
                                        })()}

                                        {(() => {
                                            if (websitelink == null || websitelink == '') {
                                                return null
                                            } else return (
                                                <a href={`//${websitelink}`} target="_blank" className='no-underline' >
                                                    <div className={cx(classes.wrapper)}>
                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <Link />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Website
                                                            </Text>
                                                            <Text className={classes.entry}>{websitelink}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (link == null || link == '') {
                                                return null
                                            } else return (
                                                <a href={`//${link}`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <Link />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Link
                                                            </Text>
                                                            <Text className={classes.entry}>{link}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (whatsapp == null || whatsapp == '') {
                                                return null
                                            } else return (
                                                <a href={`//wa.me/${whatsapp}`} target="_blank" className='no-underline'>
                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandWhatsapp />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                WhatsApp
                                                            </Text>
                                                            <Text className={classes.entry}>{whatsapp}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (linkedin == null || linkedin == '') {
                                                return null
                                            } else return (
                                                <a href={`//www.linkedin.com/in/${linkedin}/`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandLinkedin />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                LinkedIn
                                                            </Text>
                                                            <Text className={classes.entry}>{linkedin}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (twitter == null || twitter == '') {
                                                return null
                                            } else return (
                                                <a href={`//twitter.com/${twitter}`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandTwitter />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Twitter
                                                            </Text>
                                                            <Text className={classes.entry}>{twitter}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (instagram == null || instagram == '') {
                                                return null
                                            } else return (
                                                <a href={`//www.instagram.com/${instagram}/`} target="_blank" className='no-underline'>
                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandInstagram />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Instagram
                                                            </Text>
                                                            <Text className={classes.entry}>{instagram}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (facebook == null || facebook == '') {
                                                return null
                                            } else return (
                                                <a href={`//www.facebook.com/${facebook}`} target="_blank" className='no-underline'>
                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandFacebook />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Facebook
                                                            </Text>
                                                            <Text className={classes.entry}>{facebook}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}


                                        {(() => {
                                            if (youtube == null || youtube == '') {
                                                return null
                                            } else return (
                                                <a href={`//www.youtube.com/${youtube}`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandYoutube />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                YouTube
                                                            </Text>
                                                            <Text className={classes.entry}>{youtube}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}

                                        {(() => {
                                            if (github == null || github == '') {
                                                return null
                                            } else return (
                                                <a href={`//github.com/${github}`} target="_blank" className='no-underline'>

                                                    <div className={cx(classes.wrapper)}>

                                                        <ThemeIcon size={40} radius="md" className={classes.icon}>
                                                            <BrandGithub />
                                                        </ThemeIcon>

                                                        <div>
                                                            <Text size="xs" className={classes.type} >
                                                                Github
                                                            </Text>
                                                            <Text className={classes.entry}>{github}</Text>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        })()}




                                    </Stack>
                                </Box>


                            </SimpleGrid>



                        </div>
                    </Card.Section>


                </Card>
            </div >
        </>
    );
}