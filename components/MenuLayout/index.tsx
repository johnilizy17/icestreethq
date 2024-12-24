import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';
import Navbar from '../Navbar';
import dynamic from 'next/dynamic';
import LoadingPage from './LoadingPage';
import { getHeaderDetails } from '../../services';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
    category: boolean,
    menu: boolean,
    pageName?: string,
    isProtectedRoute?: boolean,
    home?: boolean
};

export default function MenuLayout({ children, home, category, menu, pageName }: Props) {

    const { pathname } = useRouter();
    const [loading, setLoading] = useState(true)
    const [metaData, setMetaData] = useState({ title: "Ice Street", description: "The best e-commerce site", keyword: "Shop, design, cloth and fashion" })

    async function MenuDetails() {
        setLoading(true)
        const data = await getHeaderDetails()
        data.map((a: any, b: number) => {
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
            <Box className="no-scrollbar">
                <Box className=' w-full lg:pb-0 overflow-x-hidden ' >
                    <Head>
                        <title>{metaData.title}</title>
                        <meta name="description" content={metaData.description} />
                        <meta name="keywords" content={metaData.keyword} />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <meta name="theme-color" content="#0dadf7" />
                        <link rel="icon" href="/favicon.ico" />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (function(d, w, c) {
                                    w.BrevoConversationsID = '67122436f531abb4860c36d4';
                                    w[c] = w[c] || function() {
                                        (w[c].q = w[c].q || []).push(arguments);
                                    };
                                    var s = d.createElement('script');
                                    s.async = true;
                                    s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                                    if (d.head) d.head.appendChild(s);
                                    })(document, window, 'BrevoConversations');
                                `,
                            }}
                        ></script>
                    </Head>
                    {/* <Box className=' w-full h-[70px] lg:h-[89px] ' >
                        <Box top={home? ["70px", "50px"]: "0px"} className=' fixed bg-white z-[50] w-full ' >
                            <Navbar menu={menu} />
                        </Box>
                    </Box> */}
                    <Box className=' pt-0 w-full h-auto ' >
                        {children}
                    </Box>
                    {/* <ChatSystem /> */}
                    {!menu && (
                        <Footer />
                    )}
                </Box>
            </Box>
        </>
    )
} 