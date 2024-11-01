import Head from 'next/head';
import React, { useEffect } from 'react';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';
import Navbar from '../Navbar';
import dynamic from 'next/dynamic';
import { imagePath } from '../../services/Variable';
const ChatSystem = dynamic(import('./chatSystem'), { ssr: false });

type Props = {
    children: React.ReactNode;
    category: boolean
    product?: any
    menu: boolean
    pageName?: string
    isProtectedRoute?: boolean
};

export default function MenuLayoutProduct({ children, product, category, menu, pageName }: Props) {

    useEffect(()=>{
    console.log(product, "product")
    },[])
    return (
        <div className="no-scrollbar">
            <div className=' w-full lg:pb-0 overflow-x-hidden ' >
                <Head>
                    <title>{pageName ? pageName : "Ice Street"}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#0dadf7" />
                    <meta property="og:title" content={product.itemName} />
                    <meta property="og:description" content={product.details} />
                    <meta property="og:image" content={imagePath+"/"+product.image} />
                    <meta property="og:url" content={imagePath+"/product?product="+product.itemName} />
                    <meta property="og:type" content="website" />
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
        </div>
    )
} 