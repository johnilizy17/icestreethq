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
        }],
        2: [{
            header: "Featured",
            link: [{
                title: "New Arrivals",
                nav: "arrival"
            }
            ]
        }],
        3: [{
            header: "Collections",
            link: stateData
        }],
        4: [{
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
        }],
        5: [{
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
        }]
    }

    return (
        <Center justifyContent="space-between" mt={["24px", "24px", "24px", "60px"]} alignItems={["flex-start"]} flexDir={["column", "column", "column", "row"]} h={["auto", "auto", "auto", "400px"]} pl={["20px", "63px"]} pr={["20px", "63px"]} pt={["40px", "40px", "40px", "90px"]} pb={["20px", "90px"]} bg={COLORS.black}>
            <Box mb="30px" cursor="pointer" display={["none", "none", "none", "block"]}>
                <Center>
                    <Link href="/">
                        <img src={"/logo-white.png"} alt="logo" />
                    </Link>
                </Center>
                <Box mt={["16px", "16px", "16px", "24px"]} pb="5px">
                    <Link href="https://www.instagram.com/icestreethq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 10.0002V10.0135M5.33334 10.6668C5.33334 9.25234 5.89525 7.89579 6.89544 6.89559C7.89563 5.8954 9.25219 5.3335 10.6667 5.3335H21.3333C22.7478 5.3335 24.1044 5.8954 25.1046 6.89559C26.1048 7.89579 26.6667 9.25234 26.6667 10.6668V21.3335C26.6667 22.748 26.1048 24.1045 25.1046 25.1047C24.1044 26.1049 22.7478 26.6668 21.3333 26.6668H10.6667C9.25219 26.6668 7.89563 26.1049 6.89544 25.1047C5.89525 24.1045 5.33334 22.748 5.33334 21.3335V10.6668ZM12 16.0002C12 17.061 12.4214 18.0784 13.1716 18.8286C13.9217 19.5787 14.9391 20.0002 16 20.0002C17.0609 20.0002 18.0783 19.5787 18.8284 18.8286C19.5786 18.0784 20 17.061 20 16.0002C20 14.9393 19.5786 13.9219 18.8284 13.1717C18.0783 12.4216 17.0609 12.0002 16 12.0002C14.9391 12.0002 13.9217 12.4216 13.1716 13.1717C12.4214 13.9219 12 14.9393 12 16.0002Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </Link>
                    <Link href=" https://x.com/IcestreetbyHq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
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
                    <Link href="https://www.instagram.com/icestreethq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 10.556V15.9347C25.5814 15.6947 23.2753 14.7949 21.3333 13.3333V19.3333C21.333 20.9615 20.874 22.5566 20.0089 23.936C19.1439 25.3154 17.9078 26.4232 16.4422 27.1325C14.9767 27.8417 13.3409 28.1239 11.7225 27.9465C10.104 27.7691 8.56821 27.1394 7.29107 26.1295C6.01394 25.1196 5.04712 23.7704 4.50137 22.2364C3.95562 20.7024 3.85302 19.0457 4.20532 17.4561C4.55762 15.8665 5.35057 14.4083 6.49334 13.2486C7.6361 12.0888 9.08244 11.2744 10.6667 10.8987V16.6667C10.2121 17.0076 9.85225 17.459 9.62125 17.9781C9.39025 18.4972 9.29578 19.0668 9.3468 19.6327C9.39783 20.1986 9.59266 20.742 9.9128 21.2114C10.2329 21.6809 10.6678 22.0607 11.176 22.3148C11.6842 22.5689 12.2489 22.6888 12.8165 22.6633C13.3841 22.6378 13.9358 22.4675 14.4191 22.1688C14.9024 21.8701 15.3014 21.4528 15.5781 20.9565C15.8548 20.4603 16 19.9015 16 19.3333V4H21.444C21.7216 5.63787 22.5018 7.14883 23.6765 8.3235C24.8512 9.49817 26.3621 10.2784 28 10.556Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </Link>
                </Box>
                <Box color={COLORS.white} mt={["8px", "8px", "8px", "8px"]}>
                    Copyrights 2024, Ice Street Hq.
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
                {FooterItem[2].map((a, b) => (
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
            </Box>
            <Box>
                {FooterItem[4].map((a, b) => (
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
            </Box>

            <Box mt="30px" pb="30px" flexDir="column" justifyContent="center" cursor="pointer" mb="30px" display={["flex", "flex", "flex", "none"]} w="full" alignItems="center">
                <Link href="/">
                    <img src={"/logo-white.png"} alt="logo" />
                </Link>
                <Box mt={["16px", "16px", "16px", "24px"]} pb="5px">
                    <Link href="https://www.instagram.com/icestreethq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 10.0002V10.0135M5.33334 10.6668C5.33334 9.25234 5.89525 7.89579 6.89544 6.89559C7.89563 5.8954 9.25219 5.3335 10.6667 5.3335H21.3333C22.7478 5.3335 24.1044 5.8954 25.1046 6.89559C26.1048 7.89579 26.6667 9.25234 26.6667 10.6668V21.3335C26.6667 22.748 26.1048 24.1045 25.1046 25.1047C24.1044 26.1049 22.7478 26.6668 21.3333 26.6668H10.6667C9.25219 26.6668 7.89563 26.1049 6.89544 25.1047C5.89525 24.1045 5.33334 22.748 5.33334 21.3335V10.6668ZM12 16.0002C12 17.061 12.4214 18.0784 13.1716 18.8286C13.9217 19.5787 14.9391 20.0002 16 20.0002C17.0609 20.0002 18.0783 19.5787 18.8284 18.8286C19.5786 18.0784 20 17.061 20 16.0002C20 14.9393 19.5786 13.9219 18.8284 13.1717C18.0783 12.4216 17.0609 12.0002 16 12.0002C14.9391 12.0002 13.9217 12.4216 13.1716 13.1717C12.4214 13.9219 12 14.9393 12 16.0002Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </Link>
                    <Link href=" https://x.com/IcestreetbyHq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
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
                    <Link href="https://www.instagram.com/icestreethq">
                        <IconButton colorScheme="blackAlpha" bg="transparent" aria-label={""}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 10.556V15.9347C25.5814 15.6947 23.2753 14.7949 21.3333 13.3333V19.3333C21.333 20.9615 20.874 22.5566 20.0089 23.936C19.1439 25.3154 17.9078 26.4232 16.4422 27.1325C14.9767 27.8417 13.3409 28.1239 11.7225 27.9465C10.104 27.7691 8.56821 27.1394 7.29107 26.1295C6.01394 25.1196 5.04712 23.7704 4.50137 22.2364C3.95562 20.7024 3.85302 19.0457 4.20532 17.4561C4.55762 15.8665 5.35057 14.4083 6.49334 13.2486C7.6361 12.0888 9.08244 11.2744 10.6667 10.8987V16.6667C10.2121 17.0076 9.85225 17.459 9.62125 17.9781C9.39025 18.4972 9.29578 19.0668 9.3468 19.6327C9.39783 20.1986 9.59266 20.742 9.9128 21.2114C10.2329 21.6809 10.6678 22.0607 11.176 22.3148C11.6842 22.5689 12.2489 22.6888 12.8165 22.6633C13.3841 22.6378 13.9358 22.4675 14.4191 22.1688C14.9024 21.8701 15.3014 21.4528 15.5781 20.9565C15.8548 20.4603 16 19.9015 16 19.3333V4H21.444C21.7216 5.63787 22.5018 7.14883 23.6765 8.3235C24.8512 9.49817 26.3621 10.2784 28 10.556Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                    </Link>
                </Box>
                <Box color={COLORS.white} mt={["8px", "8px", "8px", "8px"]}>
                    Copyrights 2024, Ice Street Hq.
                </Box>
            </Box>

        </Center>
    )
} 