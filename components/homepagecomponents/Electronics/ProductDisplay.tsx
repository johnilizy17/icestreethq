import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../../services/Variable";
import { cashFormat } from "../../utils/cashFormat";
import Image from "next/image";
import { Box, Center, Flex, Img } from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function ProductDisplay({ item, index }: { item: { image: string, price: number, discount: number, sold: number, _id: string, rate: number, itemName: string, name: string }, index: number }) {

    const router = useRouter()

    const navigateToProductDetails = (id: string) => {
        localStorage.setItem("product", id.toString())
        window.location.href = `/product-details?product=${item.itemName}&price=${cashFormat(item.price)}&id=${item._id}`
    }

    const [value, setValue] = useState(0)

    function IconProduct() {
        if (value === 1) {
            setValue(0)
            localStorage.removeItem(item._id)
        } else {
            setValue(1)
            localStorage.setItem(item._id, item._id)
        }
    }

    useEffect(() => {
        const product = localStorage.getItem(item._id)

        if (product) {
            setValue(1)
        } else {
            setValue(0)
        }
    }, [])

    return (
        <Box mb="20px" pos="relative" _hover={{ transform: "scale(1.03)", transition: "0.5s ease-in-out" }} w={["100%", "100%"]}>
            <Center
                onClick={() => {
                    IconProduct()
                }}
                zIndex={20} pos="absolute" bg="#fff" w="40px" h="40px" pt="10px" overflow="hidden" borderRadius="50px" right={["24px", "30px"]} top={["12px", "20px"]}>
                <Rating
                    emptyIcon={<MdFavoriteBorder size={30} />}
                    initialValue={value}
                    disableFillHover={true}
                    readonly={true}
                    fillIcon={<MdFavorite color="red" size={30} />}
                    iconsCount={1}
                />
            </Center>
            <Box w={"full"} overflow="hidden" cursor="pointer" p="10px" pt={["10px", "10px"]} pb={["15px", "10px"]} bg="#fff" borderRadius={["8px", "16px", "24px"]} h={["auto", "320px"]} onClick={() => navigateToProductDetails(item._id)} key={index}>
                <Center w="full">
                    <Box borderRadius={["8px", "16px", "24px"]} h={["150px", "200px"]} overflow={"hidden"}>
                        <Img src={imagePath + "/" + item?.image} objectFit="cover" alt={item?.name} />
                    </Box>
                </Center>
                <Box className='mt-4 lg:ml-2 ' >
                    <Box className="cut-text">
                        <p className=' font-medium text-sm ' >{item?.itemName}</p>
                    </Box>
                    <Box style={{ color: "#000000", display: "flex", alignItems: "center", fontWeight: "900", marginLeft: 5, marginBottom: -2, fontSize: 11 }} >

                        <svg style={{ marginLeft: "-10px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.54372 16.95L9.99997 14.605L14.4562 16.9475C14.4768 16.9583 14.5 16.9631 14.5232 16.9614C14.5464 16.9597 14.5686 16.9516 14.5875 16.938C14.6063 16.9243 14.621 16.9057 14.6298 16.8842C14.6386 16.8627 14.6413 16.8392 14.6375 16.8163L13.7875 11.8538L17.3912 8.34C17.4077 8.32373 17.4193 8.30319 17.4248 8.28069C17.4303 8.25819 17.4295 8.2346 17.4223 8.21256C17.4152 8.19052 17.4021 8.1709 17.3845 8.15588C17.3668 8.14086 17.3454 8.13103 17.3225 8.1275L12.34 7.4025L10.1125 2.88875C10.1022 2.86762 10.0863 2.84979 10.0664 2.83732C10.0465 2.82485 10.0235 2.81824 9.99997 2.81824C9.97649 2.81824 9.95348 2.82485 9.93359 2.83732C9.91369 2.84979 9.89771 2.86762 9.88747 2.88875L7.65997 7.40375L2.67747 8.12875C2.65458 8.13228 2.63312 8.14211 2.61548 8.15713C2.59785 8.17215 2.58473 8.19177 2.5776 8.21381C2.57047 8.23585 2.56961 8.25944 2.5751 8.28194C2.5806 8.30444 2.59224 8.32498 2.60872 8.34125L6.21247 11.855L5.36122 16.8175C5.35741 16.8404 5.36007 16.864 5.3689 16.8855C5.37774 16.907 5.39239 16.9256 5.41122 16.9392C5.43005 16.9529 5.4523 16.961 5.47549 16.9627C5.49868 16.9643 5.52187 16.9595 5.54247 16.9488L5.54372 16.95Z" fill="#FCC608" />
                        </svg>
                        {item.rate} <span style={{ color: "#C2C2C2", fontSize: 11, marginLeft: 5, fontWeight: "400" }} >{item.sold} Items sold</span> </Box>
                    <Flex>
                        {item?.discount > 0 && <Box display={["none", "none", "none", "flex"]} textDecoration="line-through" mr="10px" color="grey" className='text-[13px]' >{cashFormat(item?.price)}</Box>}
                        <p className=' font-bold text-[#000000] text-[13px]' >{cashFormat(item?.price - (item?.price * item.discount / 100))}</p>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}