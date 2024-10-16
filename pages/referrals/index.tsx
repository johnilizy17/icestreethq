import React, { useEffect, useState } from 'react'
import MenuLayout from '../../components/MenuLayout'
import PageLabel from '../../components/DashboardLayout/components/PageLabel'
import DashboardLayout from '../../components/DashboardLayout'
import { Input } from '@chakra-ui/input'
import { Box, Button, Center, MenuButton, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { RWebShare } from 'react-web-share'
import { UserAddress } from '../../services/userDashboardServices'
import Lottie from 'react-lottie';
import Empty from '../../assets/lottie/empty.json'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';

export default function Referrals() {

    let [CopiedValue, setCopiedValue] = useState("https://massbuy.vercel.app/")
    const toaster = useToast();
    const { getUserReferral } = UserAddress()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    let refresh

    async function getReferral() {
        try {
            const referralData = await getUserReferral()
            setData(referralData.data)
            refresh = ""
        } catch {
            refresh = ""
        }
        setLoading(false)
    }


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        refresh = []
        const user = localStorage.getItem("user")
        setCopiedValue(`https://massbuy.vercel.app/signup?r=${user}`)
        getReferral()
    }
        , [refresh])
    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' >
                <div className=' w-full border-b  border-[#D9D9D9] lg:py-[17px] lg:px-[46px] ' >
                    <p className=' font-bold text-lg ' >Referrals</p>
                </div>
                <div className=' w-full lg:px-[46px] lg:py-[27px] lg:pb-[50px] ' >
                    <div className=' w-full lg:mt-8 ' >
                        <p className=' text-sm font-medium mb-2 ' >Referral ID</p>
                        <Center>
                            <Input height="50px" border="1px solid #595959E5" value={CopiedValue} placeholder='referral' fontSize="sm" />
                            <Box>
                                <Button onClick={() => {
                                    toaster({
                                        title: "copied successfully",
                                        position: "bottom",
                                        status: "success",
                                        isClosable: true,
                                    })
                                    navigator.clipboard.writeText(CopiedValue)
                                }} flexDirection={"column"} ml="14px" bg="transparent" height="50px">
                                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 25C1.8125 25 1.22375 24.7554 0.73375 24.2663C0.244583 23.7763 0 23.1875 0 22.5V5H2.5V22.5H16.25V25H2.5ZM7.5 20C6.8125 20 6.22417 19.7554 5.735 19.2663C5.245 18.7763 5 18.1875 5 17.5V2.5C5 1.8125 5.245 1.22375 5.735 0.73375C6.22417 0.244583 6.8125 0 7.5 0H18.75C19.4375 0 20.0263 0.244583 20.5163 0.73375C21.0054 1.22375 21.25 1.8125 21.25 2.5V17.5C21.25 18.1875 21.0054 18.7763 20.5163 19.2663C20.0263 19.7554 19.4375 20 18.75 20H7.5Z" fill="#0dadf7" />
                                    </svg>
                                    <Text mt="5px" fontWeight="400" fontSize="13px">
                                        Copy
                                    </Text>
                                </Button>
                            </Box>
                            <Box>
                                <RWebShare
                                    data={{
                                        text: "Like humans, flamingos make friends for life",
                                        url: CopiedValue,
                                        title: "Flamingos",
                                    }}
                                >

                                    <Button flexDirection={"column"} ml="14px" bg="transparent" height="50px">
                                        <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.75 25C17.7083 25 16.8229 24.6354 16.0938 23.9062C15.3646 23.1771 15 22.2917 15 21.25C15 21.1042 15.0104 20.9529 15.0312 20.7962C15.0521 20.6404 15.0833 20.5 15.125 20.375L6.3125 15.25C5.95833 15.5625 5.5625 15.8071 5.125 15.9837C4.6875 16.1612 4.22917 16.25 3.75 16.25C2.70833 16.25 1.82292 15.8854 1.09375 15.1562C0.364583 14.4271 0 13.5417 0 12.5C0 11.4583 0.364583 10.5729 1.09375 9.84375C1.82292 9.11458 2.70833 8.75 3.75 8.75C4.22917 8.75 4.6875 8.83833 5.125 9.015C5.5625 9.1925 5.95833 9.4375 6.3125 9.75L15.125 4.625C15.0833 4.5 15.0521 4.35958 15.0312 4.20375C15.0104 4.04708 15 3.89583 15 3.75C15 2.70833 15.3646 1.82292 16.0938 1.09375C16.8229 0.364583 17.7083 0 18.75 0C19.7917 0 20.6771 0.364583 21.4062 1.09375C22.1354 1.82292 22.5 2.70833 22.5 3.75C22.5 4.79167 22.1354 5.67708 21.4062 6.40625C20.6771 7.13542 19.7917 7.5 18.75 7.5C18.2708 7.5 17.8125 7.41125 17.375 7.23375C16.9375 7.05708 16.5417 6.8125 16.1875 6.5L7.375 11.625C7.41667 11.75 7.44792 11.8904 7.46875 12.0463C7.48958 12.2029 7.5 12.3542 7.5 12.5C7.5 12.6458 7.48958 12.7967 7.46875 12.9525C7.44792 13.1092 7.41667 13.25 7.375 13.375L16.1875 18.5C16.5417 18.1875 16.9375 17.9425 17.375 17.765C17.8125 17.5883 18.2708 17.5 18.75 17.5C19.7917 17.5 20.6771 17.8646 21.4062 18.5938C22.1354 19.3229 22.5 20.2083 22.5 21.25C22.5 22.2917 22.1354 23.1771 21.4062 23.9062C20.6771 24.6354 19.7917 25 18.75 25Z" fill="#0dadf7" />
                                        </svg>
                                        <Text mt="5px" fontWeight="400" fontSize="13px">
                                            Share
                                        </Text>
                                    </Button>
                                </RWebShare>
                            </Box>
                        </Center>
                        <Text mt="8px" fontWeight=" 400" fontSize="13px" lineHeight="16px" color="#000000">
                            When someone signs up with you referral link, you get 3% of all their purchases.
                        </Text>
                    </div>
                </div>
            </div>
            <div className=' w-full rounded-[10px]  mt-[30px] bg-white ' >
                <div className=' w-full border-b  border-[#D9D9D9]  lg:py-[17px] lg:px-[46px] ' >
                    <p className=' font-bold text-lg ' >Referral History</p>
                </div>
                {loading
                ?
                <LoadingComponent/>
                 :
                <div className=' w-full' >
                    {data.length === 0 ?

                        <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDirection="column" h={["400px", "500px"]}>
                            <Lottie options={defaultOptions}
                                height={300}
                                width={300} />
                            Invite your Family and friend to get the 3% benefit on all there purchases
                        </Box>
                        :
                        <div className=' w-full  lg:mt-8 ' >
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>
                                    <TableCaption>Referrals history details and time</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>S/N</Th>
                                            <Th>Name</Th>
                                            <Th >Email</Th>

                                            <Th>Date</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.map((result: any, _id: number) => (
                                            <Tr key={_id}>
                                                <Td>{_id}</Td>
                                                <Td>{result?.firstname} {result?.lastname}</Td>
                                                <Td>{result?.email}</Td>
                                                <Td >27 - 01 - 2023</Td>
                                            </Tr>))}


                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>}
                </div>}
            </div>
        </DashboardLayout >
    )
} 