import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import BadgeCard from "~/components/card";
import NotFound404 from "~/components/404";
import MadeWith from "~/components/made-with";
import VCard from 'vcard-creator';
import { Button } from "antd";
import { BsFillPersonPlusFill } from "react-icons/bs";

const CardPreviewPage: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.cards.getCardById.useQuery({
        id,
    });
    const myVCard = new VCard()
    myVCard.addName(data?.name)
    if (data?.phone == null || data?.phone == '') { } else {
        myVCard.addPhoneNumber(data?.phone!, 'PREF;WORK')
    } if (data?.email == null || data?.email == '') { } else {
        myVCard.addEmail(data?.email!)
    } if (data?.address == null || data?.address == '') { } else {
        myVCard.addAddress(data?.address!)
    } if (data?.websitelink == null || data?.websitelink == '') { } else {
        myVCard.addURL(data?.websitelink!)
    } if (data?.github == null || data?.github == '') { } else {
        myVCard.addURL(`www.github.com/${data?.github}`)
    } if (data?.twitter == null || data?.twitter == '') { } else {
        myVCard.addURL(`www.twitter.com/${data?.twitter}`)
    } if (data?.instagram == null || data?.instagram == '') { } else {
        myVCard.addURL(`www.instagram.com/${data?.instagram}/`)
    } if (data?.linkedin == null || data?.linkedin == '') { } else {
        myVCard.addURL(`www.linkedin.com/in/${data?.linkedin}`)
    } if (data?.facebook == null || data?.facebook == '') { } else {
        myVCard.addURL(`www.facebook.com/${data?.facebook}`)
    } if (data?.youtube == null || data?.youtube == '') { } else {
        myVCard.addURL(`www.youtube.com/${data?.youtube}`)
    } if (data?.whatsapp == null || data?.whatsapp == '') { } else {
        myVCard.addURL(`wa.me/${data?.whatsapp}`)
    }
    const handleSave = () => {
        downloadToFile(myVCard, `${data?.name}.vcf`, 'text/vcard');
    }
    function downloadToFile(content: any, filename: string, contentType: string) {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    if (!data) return <NotFound404 />;
    else console.log(data)

    return (
        <>
            <Head>
                <title>
                    {data.name}'s card
                </title>
            </Head>
            <div className="pb-4 lg:py-4 flex justify-center">
                <BadgeCard image={data.imgUrl} name={data.name} title={data.title} logo={data.logoUrl} company={data.company} color={""} phone={data.phone} email={data.email} address={data.address} websitelink={data.websitelink} link={data.link} github={data.github} twitter={data.twitter} instagram={data.instagram} linkedin={data.linkedin} facebook={data.facebook} youtube={data.youtube} whatsapp={data.whatsapp} />
            </div>
            <div className="flex justify-center">
                <Button className="w-[90%] shadow-lg md:w-2/3 lg:w-1/3 fixed bottom-10 " size="large" icon={<BsFillPersonPlusFill className="mr-4 mb-[-2px]" />} type="primary" onClick={handleSave}>Save Contact</Button>
            </div>
            <div className="flex justify-center">

                <div className="mt-12">
                    <MadeWith />
                </div>
            </div>
        </>
    );
};

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

export default CardPreviewPage;

