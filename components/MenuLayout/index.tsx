import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';
import Navbar from '../Navbar';
import dynamic from 'next/dynamic';
import LoadingPage from './LoadingPage';
import { getHeaderDetails } from '../../services';
import { useRouter } from 'next/router';

type Props = {
    children: React.ReactNode;
    category: boolean,
    menu: boolean
    pageName?: string
    isProtectedRoute?: boolean
};

export default function MenuLayout({ children, category, menu, pageName }: Props) {

    const { pathname } = useRouter();
    const [loading, setLoading] = useState(true)
    const [metaData, setMetaData] = useState({ title: "Ice Street", description: "The best e-commerce site", keyword:"Shop, design, cloth and fashion" })

    async function MenuDetails() {
        setLoading(true)
        const data = await getHeaderDetails()
        data.map((a:any,b:number) => {
            if (pathname === a.page) {
                setMetaData(a)
            }
        })
        setLoading(false)
    }

    useEffect(() => {
        MenuDetails()
    }, [])

    return (
        <>
            <LoadingPage display={loading} />
            <div className="no-scrollbar">
                <div className=' w-full lg:pb-0 overflow-x-hidden ' >
                    <Head>
                        <title>{metaData.title}</title>
                        <meta name="description" content={metaData.description} />
                        <meta name="keywords" content={metaData.keyword}/>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <meta name="theme-color" content="#0dadf7" />
                        <link rel="icon" href="/favicon.ico" />
                        {/* <script src= /> */}
                    </Head>
                    <div className=' w-full h-[70px] lg:h-[89px] ' >
                        <div className=' fixed bg-white z-[50] top-0 w-full ' >
                            <Navbar menu={menu} />
                        </div>
                    </div>
                    <div className=' pt-0 w-full h-auto ' >
                        {children}
                    </div>
                    {/* <ChatSystem /> */}
                    {!menu && (
                        <Footer />
                    )}
                </div>
            </div>
        </>
    )
} 