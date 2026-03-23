import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import BadgeCard from "~/components/card";
import NotFound404 from "~/components/404";
import React from 'react';
import { QRCode, Tooltip, Typography } from 'antd';
import { ArrowBarToDown } from "tabler-icons-react";
import {
    Card,
    Button,
    createStyles,
    rem,
    CardSection,
} from '@mantine/core';
import {
    EmailShareButton,
    EmailIcon,
    WhatsappIcon,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
} from "react-share";
import { useSession } from "next-auth/react";
import Sharenav from "~/components/sharenav";
import Link from "next/link";

const { Paragraph } = Typography;


const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

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
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));


const CardSharePage: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.cards.getCardById.useQuery({
        id,
    });
    const url = `cardgenius.me/preview/${data?.id}`
    const { data: session } = useSession()
    if (!data) return <NotFound404 />;
    else console.log(data)

    const { classes } = useStyles()

    return (
        <>
            {(() => {
                if (session?.user.id == data.userId) {
                    return (
                        <>
                            <Head>
                                <title>
                                    {data.name}'s card
                                </title>
                            </Head>
                            <Sharenav cardId={data.id} image={data.imgUrl} name={data.name} title={data.title} logo={data.logoUrl} company={data.company} phone={data.phone} email={data.email} address={data.address} websitelink={data.websitelink} link={data.link} github={data.github} twitter={data.twitter} instagram={data.instagram} linkedin={data.linkedin} facebook={data.facebook} youtube={data.youtube} whatsapp={data.whatsapp} />
                            <div className="md:py-4 lg:flex justify-evenly">

                                <BadgeCard image={data.imgUrl} name={data.name} title={data.title} logo={data.logoUrl} company={data.company} color={""} phone={data.phone} email={data.email} address={data.address} websitelink={data.websitelink} link={data.link} github={data.github} twitter={data.twitter} instagram={data.instagram} linkedin={data.linkedin} facebook={data.facebook} youtube={data.youtube} whatsapp={data.whatsapp} />


                                <div>
                                    <Card withBorder radius="md" padding="lg" className={classes.card}>
                                        <div className="text-center mb-3">
                                            <span className="font-semibold ">Scan or click to preview your card</span>
                                        </div>
                                        <CardSection className={`text-center ${classes.section}`}>

                                            <div id="myqrcode">
                                                <Link href={`/preview/${data.id}`}>
                                                    <QRCode size={300} value={url} style={{ marginBottom: 16 }} className="mx-auto" />
                                                </Link>
                                                <Tooltip title="Download QR">
                                                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={downloadQRCode}>
                                                        <span>Download your Card's QR  &nbsp;&nbsp;</span>
                                                        <ArrowBarToDown />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </CardSection>
                                        <hr />
                                        <CardSection className={`text-center ${classes.section}`}>
                                            <span className="font-semibold ">Social share</span>
                                            <CardSection className="mt-5 space-x-2">
                                                <WhatsappShareButton url={url} title={`Click here to visit ${data.name}'s digital card`}>
                                                    <WhatsappIcon round={true} size={40} />
                                                </WhatsappShareButton>
                                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank">
                                                    <LinkedinIcon round={true} size={40} />
                                                </a>
                                                <TwitterShareButton url={url}>
                                                    <TwitterIcon round={true} size={40} />
                                                </TwitterShareButton>
                                                <EmailShareButton url={url} title="Visit my Card Genius card">
                                                    <EmailIcon round={true} size={40} />
                                                </EmailShareButton>
                                            </CardSection>
                                        </CardSection>
                                        <CardSection className={`text-center ${classes.section}`}>
                                            <span className="font-semibold ">Copy link</span>
                                            <Paragraph copyable className="w-[300px] font-semibold p-3 rounded-lg mt-5 bg-slate-100">{url}</Paragraph>
                                        </CardSection>

                                    </Card>
                                </div>
                            </div>
                        </>
                    )
                } else return null
            })()}
        </>
    );
};
// select id from card
export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper();

    const id = context.params?.id;

    if (typeof id !== "string") throw new Error("no id");

    await ssg.cards.getCardById.prefetch({ id });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    };
};

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default CardSharePage;