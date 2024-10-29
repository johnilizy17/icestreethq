import Head from 'next/head';
import React from 'react';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';
import Navbar from '../Navbar';
import dynamic from 'next/dynamic';
const ChatSystem = dynamic(import('./chatSystem'), { ssr: false });

type Props = {
    children: React.ReactNode;
    category: boolean,
    menu: boolean
    pageName?: string
    isProtectedRoute?: boolean
};

export default function MenuLayoutProduct({ children, category, menu, pageName }: Props) {
    return (
        <div className="no-scrollbar">
            <div className=' w-full lg:pb-0 overflow-x-hidden ' >
                <Head>
                    <title>{pageName ? pageName : "Ice Street"}</title>
                    <meta name="description" content="The best e-commerce site" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#0dadf7" />
                    {/* <script type="application/ld+json">
                        {{
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": "Executive Anvil",
                            "image": [
                                "https://example.com/photos/1x1/photo.jpg",
                                "https://example.com/photos/4x3/photo.jpg",
                                "https://example.com/photos/16x9/photo.jpg"
                            ],
                            "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
                            "sku": "0446310786",
                            "mpn": "925872",
                            "brand": {
                                "@type": "Brand",
                                "name": "ACME"
                            },
                            "review": {
                                "@type": "Review",
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": 4,
                                    "bestRating": 5
                                },
                                "author": {
                                    "@type": "Person",
                                    "name": "Fred Benson"
                                }
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": 4.4,
                                "reviewCount": 89
                            },
                            "offers": {
                                "@type": "AggregateOffer",
                                "offerCount": 5,
                                "lowPrice": 119.99,
                                "highPrice": 199.99,
                                "priceCurrency": "USD"
                            }
                        }}
                    </script> */}
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
                <ChatSystem />
                {!menu && (
                    <Footer />
                )}
            </div>
        </div>
    )
} 