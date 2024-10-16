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
import { UserPackageFunction } from '../../services/UserPackage'
import moment from 'moment'
import { cashFormat } from '../../components/utils/cashFormat'

export default function HistoryOrder() {

    let [CopiedValue, setCopiedValue] = useState("https://massbuy.vercel.app/")
    const toaster = useToast();
    const { getUserReferral } = UserAddress()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { allPackage } = UserPackageFunction()

    let refresh

    async function getReferral() {
        try {
            const response = await allPackage("")
            setData(response.data)
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
        getReferral()
    }, [refresh])

    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px]  mt-[30px] bg-white ' >
                <div className=' w-full border-b  border-[#D9D9D9]  lg:py-[17px] lg:px-[46px] ' >
                    <p className=' font-bold text-lg ' >Order History</p>
                </div>
                {loading
                    ?
                    <LoadingComponent />
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
                                                <Th >amount</Th>
                                                <Th>Status</Th>
                                                <Th>Date</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {data.map((result: any, _id: number) => (

                                                <Tr key={_id}>
                                                    <Td>{_id} </Td>
                                                    <Td>{result?.category ? result?.category.title : ""}</Td>
                                                    <Td>{result?.status}</Td>
                                                    <Td>{cashFormat(result?.total)}</Td>
                                                    <Td >{moment(result.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Td>
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