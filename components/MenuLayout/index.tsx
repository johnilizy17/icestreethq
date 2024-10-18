import Head from 'next/head';
import React from 'react';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';
import Navbar from '../Navbar';
import dynamic from 'next/dynamic';
const ChatSystem = dynamic(import('./ChatSystem'), { ssr: false });

type Props = {
    children: React.ReactNode;
    category: boolean,
    menu: boolean
    pageName?: string
    isProtectedRoute?: boolean
};

export default function MenuLayout({ children, category, menu, pageName }: Props) {
    return (
        <div className=' w-full lg:pb-0 overflow-x-hidden ' >
            <Head>
                <title>{pageName ? pageName : "Ice Street"}</title>
                <meta name="description" content="The best e-commerce site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0dadf7" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className=' w-full h-[70px] lg:h-[89px] ' >
                <div className=' fixed bg-white z-[50] top-0 w-full ' >
                    <Navbar menu={menu} />
                </div>
            </div>
            <div className=' pt-0 w-full h-auto ' >
                {children}
            </div>
            <ChatSystem />
            {!menu && (
                <Footer />
            )}
        </div>
    )
} 