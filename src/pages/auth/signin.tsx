import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "~/server/auth";

import { FcGoogle } from "react-icons/fc"

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (

        <>
            <center>
                <div className="bg-gray-200 w-72 h-64 rounded-2xl mt-44  space-y-6">
                    <img className="h-28 mt-6" src="/card genius-01.png" alt="" />


                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button type="button" onClick={() => signIn(provider.id)} className=" w-64 justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  mb-2">
                                <FcGoogle className="mr-3" size={30} />
                                Sign in with Google</button>
                        </div>
                    ))}
                </div>
            </center>


        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/app" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}