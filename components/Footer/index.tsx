import { Box, Center, Flex, IconButton, Image, Img } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { COLORS } from "../../services/theme/colors";
import Link from 'next/link';
import { getBrand } from '../../services/userCategories';

export default function Footer() {

    const [stateData, setStateData] = useState([{
        title: "Ice Street",
        nav: "street"
    },
    {
        title: "Nike",
        nav: "nike"
    },
    {
        title: "Adidas",
        nav: "Adidas"
    }])

    const [stateProduct, setStateProduct] = useState([{
        title: "Brand",
        nav: "brand"
    },
    {
        title: "Collection",
        nav: "collection"
    }])

    const FooterItem = {
        1: [{
            header: "Categories",
            link: stateProduct
        }, {
            header: "Featured",
            link: [{
                title: "New Arrivals",
                nav: "arrival"
            }
            ]
        }],
        2: [{
            header: "Collections",
            link: stateData
        }],
        3: [{
            header: "Legal",
            link: [{
                title: "About us",
                nav: "about"
            },
            {
                title: "Terms and Conditions",
                nav: "terms"
            },
            {
                title: "Privacy Policy",
                nav: "privacy"
            }]
        }, {
            header: "Support",
            link: [{
                title: "Contact us",
                nav: "contact"
            },
            {
                title: "Return Policy",
                nav: "return_policy"
            },
            {
                title: "FAQs",
                nav: "faq"
            }]
        }],
    }

    return (
        <Center justifyContent="space-between" mt={["60px","60px","60px","120px"]} alignItems={["flex-start"]} flexDir={["column", "column", "column", "row"]} h={["auto", "auto", "auto", "400px"]} pl={["20px", "63px"]} pr={["20px", "63px"]} pt={["40px", "40px", "40px", "90px"]} pb={["20px", "90px"]} bg={COLORS.black}>
            <Box mb="30px" cursor="pointer" display={["none", "none", "none", "block"]}>
                <Link href="/">
                    <img src={"/images/logo-white.png"} alt="logo" />
                </Link>
                <Box color={COLORS.white} mt="29.5px" w={["auto", "auto", "auto", "418px"]}>
                    Ice Street encapsulates the cool, modern vibe with a focus on street fashion, playing on the word {"”"}ice{"”"} to reflect a sense of sleekness and trendsetting style. Let me know if {"you'd"} like adjustments or alternatives!
                </Box>
            </Box>
            <Box>
                {FooterItem[1].map((a, b) => (
                    <Box mb="20px" key={b}>
                        <Box fontSize="20px" paddingBottom="8px" color={COLORS.white} fontWeight="700" lineHeight="24.2px">
                            {a.header}
                        </Box>
                        <Box>
                            {
                                a.link.map((c, d) => (
                                    <Link key={d} href={c.nav}>
                                        <Box fontFamily="Inter-Regular" fontWeight="400" mb="6px" color={COLORS.white}>
                                            {c.title}
                                        </Box>
                                    </Link>
                                ))
                            }
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box>
                {FooterItem[3].map((a, b) => (
                    <Box key={b} mb="20px">
                        <Box fontSize="20px" paddingBottom="8px" color={COLORS.white} fontWeight="700" lineHeight="24.2px">
                            {a.header}
                        </Box>
                        {
                            a.link.map((c, d) => (
                                <Link key={d} href={c.nav}>
                                    <Box key={d} fontFamily="Inter-Regular" fontWeight="400" mb="6px" color={COLORS.white}>
                                        {c.title}
                                    </Box>
                                </Link>
                            ))
                        }
                    </Box>
                ))}
                <Box>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Box ml="-6px" mt={["20px", "20px", "20px", "-6px"]} pb="5px">
                        <Link href="https://www.instagram.com/icestreethq">
                            <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 10.0002V10.0135M5.33334 10.6668C5.33334 9.25234 5.89525 7.89579 6.89544 6.89559C7.89563 5.8954 9.25219 5.3335 10.6667 5.3335H21.3333C22.7478 5.3335 24.1044 5.8954 25.1046 6.89559C26.1048 7.89579 26.6667 9.25234 26.6667 10.6668V21.3335C26.6667 22.748 26.1048 24.1045 25.1046 25.1047C24.1044 26.1049 22.7478 26.6668 21.3333 26.6668H10.6667C9.25219 26.6668 7.89563 26.1049 6.89544 25.1047C5.89525 24.1045 5.33334 22.748 5.33334 21.3335V10.6668ZM12 16.0002C12 17.061 12.4214 18.0784 13.1716 18.8286C13.9217 19.5787 14.9391 20.0002 16 20.0002C17.0609 20.0002 18.0783 19.5787 18.8284 18.8286C19.5786 18.0784 20 17.061 20 16.0002C20 14.9393 19.5786 13.9219 18.8284 13.1717C18.0783 12.4216 17.0609 12.0002 16 12.0002C14.9391 12.0002 13.9217 12.4216 13.1716 13.1717C12.4214 13.9219 12 14.9393 12 16.0002Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </IconButton>
                        </Link>
                        <Link href=" https://x.com/IcestreetbyHq">
                            <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 7.556V12.9347C22.5814 12.6947 20.2753 11.7949 18.3333 10.3333V16.3333C18.333 17.9615 17.874 19.5566 17.0089 20.936C16.1439 22.3154 14.9078 23.4232 13.4422 24.1325C11.9767 24.8417 10.3409 25.1239 8.72247 24.9465C7.10399 24.7691 5.56821 24.1394 4.29107 23.1295C3.01394 22.1196 2.04712 20.7704 1.50137 19.2364C0.955619 17.7024 0.853017 16.0457 1.20532 14.4561C1.55762 12.8665 2.35057 11.4083 3.49334 10.2486C4.6361 9.0888 6.08244 8.2744 7.66667 7.89867V13.6667C7.21212 14.0076 6.85225 14.459 6.62125 14.9781C6.39025 15.4972 6.29578 16.0668 6.3468 16.6327C6.39783 17.1986 6.59266 17.742 6.9128 18.2114C7.23294 18.6809 7.66775 19.0607 8.17596 19.3148C8.68416 19.5689 9.24888 19.6888 9.81649 19.6633C10.3841 19.6378 10.9358 19.4675 11.4191 19.1688C11.9024 18.8701 12.3014 18.4528 12.5781 17.9565C12.8548 17.4603 13 16.9015 13 16.3333V1H18.444C18.7216 2.63787 19.5018 4.14883 20.6765 5.3235C21.8512 6.49817 23.3621 7.27838 25 7.556Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </IconButton>
                        </Link>
                        <Link href="https://www.facebook.com/icestreethq">
                            <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33334 13.3333V18.6667H13.3333V28H18.6667V18.6667H22.6667L24 13.3333H18.6667V10.6667C18.6667 10.313 18.8072 9.97391 19.0572 9.72386C19.3073 9.47381 19.6464 9.33333 20 9.33333H24V4H20C18.2319 4 16.5362 4.70238 15.286 5.95262C14.0357 7.20286 13.3333 8.89856 13.3333 10.6667V13.3333H9.33334Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </IconButton>
                        </Link>
                    </Box>
                    <Box>
                        <Box color={COLORS.white}>
                            Tel: +14072136758
                        </Box>
                        <Box color={COLORS.white} mt="3px">
                            Email: hello@icestreethq.com
                        </Box>
                        <Box color={COLORS.white} mt="32px">
                            Copyrights 2024, Ice Street Hq.
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt="30px" cursor="pointer" mb="30px" display={["block", "block", "block", "none"]}>
                <Link href="/">
                    <img src={"/images/logo-white.png"} alt="logo" />
                </Link>
                <Box color={COLORS.white} mt="29.5px" w={["auto", "auto", "auto", "418px"]}>
                    Ice Street encapsulates the cool, modern vibe with a focus on street fashion, playing on the word {"“"}ice{"”"} to reflect a sense of sleekness and trendsetting style. Let me know if {"you'd"} like adjustments or alternatives!
                </Box>
            </Box>

        </Center>
    )
} 