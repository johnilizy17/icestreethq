import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, Img, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import Flag from 'react-world-flags'
import getUserCountry from "js-user-country";
import { getCurrency } from '../../../services/productService';
import { useRouter } from "next/router";

export default function Location() {

    const [select, setSelect] = useState("USA")
    const router = useRouter()

    const language = [{
        icon: <Flag code={"GBR"} />,
        title: "GBP",
        money: "gbp",
        svg: "GBR",
        country: "United Kingdom"
    }, {
        icon: <Flag code={"NGA"} />,
        title: "NGN",
        money: "ngn",
        svg: "NGA",
        country: "Nigeria"
    }, {
        icon: <Flag code={"USA"} />,
        title: "USD",
        money: "usd",
        svg: "USA",
        country: "United State"
    }
    ]

    async function CountryAmount(e) {
        try {
            const result = await getCurrency()
            const amount = result[e]
            console.log(amount, "amount")
            localStorage.setItem("amount", amount)
        } catch (error) {
            console.log(error.response, "amount")
        }
    }

    async function SelectionCountry(country) {
        if (country === "Nigeria") {
            setSelect("NGA")
            await CountryAmount("ngn")
            localStorage.setItem("currency", "NGN")
        } else if (country === "United Kingdom") {
            setSelect("GBR")
            await CountryAmount("gbp")
            localStorage.setItem("currency", "GBP")
        } else {
            setSelect("USA")
            await CountryAmount("usd")
            localStorage.setItem("currency", "USA")
        }
        router.reload()
    }

    useEffect(() => {

        if (typeof window !== "undefined") {
            const country = getUserCountry().name
            const currency = localStorage.getItem("currency")
            if (currency) {
                if (currency === "NGN") {
                    setSelect("NGA")
                } else if (currency === "GBP") {
                    setSelect("GBR")
                } else {
                    setSelect("USA")
                }
            } else {
                if (country === "Nigeria") {
                    setSelect("NGA")
                    CountryAmount("ngn")
                    localStorage.setItem("currency", "NGN")
                } else if (country === "United Kingdom") {
                    setSelect("GBR")
                    CountryAmount("gbp")
                    localStorage.setItem("currency", "GBP")
                } else {
                    setSelect("USA")
                    CountryAmount("usd")
                    localStorage.setItem("currency", "USA")
                }
            }
        }
    }, [typeof window])

    return (
        <Center>
            <Box zIndex={9000}>
                <Menu matchWidth={true}>
                    <MenuButton colorScheme="white" fontWeight="400" color="black" as={Button} rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    </svg>}>
                        <Box w="30px" h="17px">
                            <Flag code={select} />
                        </Box>
                    </MenuButton>
                    <MenuList >
                        {language.map((a, b) => (
                            <MenuItem onClick={() => {
                                CountryAmount(a.money)
                                setSelect(a.svg)
                                SelectionCountry(a.country)
                            }} key={b}>
                                <Center pl="10px" h="17px" w="34px">
                                    {a.icon}
                                    <Box ml="7px" fontWeight="800" fontSize="12px">
                                        {a.title}
                                    </Box>
                                </Center>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </Center >
    )
}