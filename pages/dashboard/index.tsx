import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { Input } from '@chakra-ui/input'
import { Box, Button, MenuButton, Text, useToast } from '@chakra-ui/react'
import { UserAddress } from '../../services/userDashboardServices'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as yup from 'yup'
import SpinLoader from '../../components/Loaders/SpinLoader'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import ProtectedRoute from '../../components/ProtectedRoute'
import { useRouter } from 'next/router'

export default function Dashboard() {

    const { getUserInfo, updateProfile } = UserAddress()
    const [data, setData] = useState({ email: [], firstname: "", lastname: "", order: "", phone: "" })
    const [loading, setLoading] = useState(false)
    const [loadingDashboard, setLoadingDashboard] = useState(true)
    const toaster = useToast();
    const router = useRouter();

    const addressSchema = yup.object({
        firstname: yup.string().required('Required'),
        lastname: yup.string().required('Required'),
        phone: yup.string().required('Required'),
        email: yup.string().email('This email is not valid').required('Your email is required'),
    })

    let formik = useFormik({
        initialValues: { firstname: data?.firstname, lastname: data?.lastname, email: data?.email, phone: "" },
        validationSchema: addressSchema,
        onSubmit: () => { },
    });


    const submit = async () => {
        setLoading(true)
        if (!formik.dirty) {
            // toast.error("Please Enter Your Email And Password") 
            toaster({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else if (!formik.isValid) {
            toaster({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else {

            let user
            user = ""
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                user = localStorage.getItem("user")
            }

            const response = await updateProfile(JSON.stringify(formik.values), user ?? "")

            if (response?.status === 200) {

                toaster({
                    title: response?.data?.msg ? response?.data?.msg : "successfully submit",
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
            } else {
                toaster({
                    title: response?.data?.msg ? response?.data?.msg : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
            }
        }
        setLoading(false);
    }

    const getProfile = async () => {
        setLoadingDashboard(true)
        const user = localStorage.getItem("user")
        if (user) {
            try {
                const response = await getUserInfo(user)
                if (response.status == 401) {
                    router.push("/login")
                    toaster({
                        title:"Token",
                        description:"Your token has expired",
                        status:"warning"
                    })
                } else {
                    setData(response?.data.user);
                    formik.setFieldValue("firstname", response.data.user.firstname)
                    formik.setFieldValue("lastname", response.data.user.lastname)
                    formik.setFieldValue("email", response.data.user.email)
                    formik.setFieldValue("phone", response.data.user.phone)
                    formik.setFieldValue("phone", response.data.user.phone)
                    setLoadingDashboard(false)
                }
            } catch (err) {
                setLoadingDashboard(false)
                toast.error("Error occured");
            }
        }
    }

    useEffect(() => {
        getProfile()
    }, [data?.email])


    return (
        <>
            <ProtectedRoute>
                <DashboardLayout menu={true}>
                    {loadingDashboard ?
                        <LoadingComponent /> :
                        <div className='w-full rounded-[10px] bg-white ' >
                            <div className=' w-full border-b  border-[#D9D9D9] pb-[17px] lg:py-[17px] lg:px-[46px] ' >
                                <Text fontWeight="800" className=' font-bold text-lg ' >Account Information</Text>
                            </div>
                            <div className=' w-full lg:px-[46px] lg:py-[27px] lg:pb-[50px] ' >
                                <div className=' w-full mt-6 lg:mt-8 ' >
                                    <Text fontWeight="800" className=' text-sm mb-2 ' >First Name</Text>
                                    <Box>
                                        {formik.values.firstname}
                                    </Box>
                                </div>
                                <div className=' w-full mt-4 ' >
                                    <Text fontWeight="800" className=' text-sm mb-2 ' >Last Name</Text>
                                    <Box>
                                        {formik.values.lastname}
                                    </Box>
                                </div>
                                <div className=' w-full mt-4 ' >
                                    <Text fontWeight="800" className=' text-sm mb-2 ' >Email</Text>
                                    <Box>
                                        {formik.values.email}
                                    </Box>
                                </div>
                                <div className=' w-full mt-4 ' >
                                    <Text fontWeight="800" className=' text-sm mb-2 ' >Phone Number</Text>
                                    <Box>
                                        {formik.values.phone}
                                    </Box>
                                </div>
                            </div>
                        </div>
                    }
                </DashboardLayout>
            </ProtectedRoute>
        </>
    )
} 