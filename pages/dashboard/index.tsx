import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { Input } from '@chakra-ui/input'
import { Button, MenuButton, useToast } from '@chakra-ui/react'
import { UserAddress } from '../../services/userDashboardServices'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as yup from 'yup'
import SpinLoader from '../../components/Loaders/SpinLoader'
import LoadingComponent from '../../components/OrderComponents/LoadingComponent';
import ProtectedRoute from '../../components/ProtectedRoute'

export default function Dashboard() {

    const { getUserInfo, updateProfile } = UserAddress()
    const [data, setData] = useState({ email: [], firstname: "", lastname: "", order: "", phone: "" })
    const [loading, setLoading] = useState(false)
    const [loadingDashboard, setLoadingDashboard] = useState(true)
    const toaster = useToast();

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
                console.log(response, "response2")
                setData(response?.data.user);
                formik.setFieldValue("firstname", response.data.user.firstname)
                formik.setFieldValue("lastname", response.data.user.lastname)
                formik.setFieldValue("email", response.data.user.email)
                formik.setFieldValue("phone", response.data.user.phone)
                formik.setFieldValue("phone", response.data.user.phone)
            } catch (err) {
                console.log(err)
                toast.error("Error occured");
            }
            setLoadingDashboard(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [data?.email])


    return (
        <ProtectedRoute>
            <DashboardLayout menu={true}>
                {loadingDashboard ?
                    <LoadingComponent /> :
                    <div className='w-full rounded-[10px] bg-white ' >
                        <div className=' w-full border-b  border-[#D9D9D9] pb-[17px] lg:py-[17px] lg:px-[46px] ' >
                            <p className=' font-bold text-lg ' >Account Information</p>
                        </div>
                        <div className=' w-full lg:px-[46px] lg:py-[27px] lg:pb-[50px] ' >
                            <div className=' w-full mt-6 lg:mt-8 ' >
                                <p className=' text-sm font-medium mb-2 ' >First Name</p>
                                <Input
                                    isDisabled={true}
                                    name="firstname"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstname}
                                    onFocus={() =>
                                        formik.setFieldTouched("firstname", true, true)
                                    }
                                    height="45px" border="1px solid #595959E5" placeholder='Enter First Name' fontSize="sm" />
                            </div>
                            <div className=' w-full mt-4 ' >
                                <p className=' text-sm font-medium mb-2 ' >Last Name</p>
                                <Input
                                    isDisabled={true}
                                    name="lastname"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastname}
                                    onFocus={() =>
                                        formik.setFieldTouched("lastname", true, true)
                                    }
                                    height="45px" border="1px solid #595959E5" placeholder='Enter Last Name' fontSize="sm" />
                            </div>
                            <div className=' w-full mt-4 ' >
                                <p className=' text-sm font-medium mb-2 ' >Email Address</p>
                                <Input
                                    isDisabled={true}
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onFocus={() =>
                                        formik.setFieldTouched("email", true, true)
                                    }
                                    height="45px" border="1px solid #595959E5" placeholder='Enter email address' fontSize="sm" />
                            </div>
                            <div className=' w-full mt-4 ' >
                                <p className=' text-sm mb-2 ' >Phone Number</p>
                                <Input
                                    isDisabled={true}
                                    name="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    onFocus={() =>
                                        formik.setFieldTouched("phone", true, true)
                                    }
                                    height="45px" border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" />
                            </div>
                            <Button isDisabled={true} colorScheme="blue" isLoading={loading} onClick={submit} className=' w-full h-[45px] rounded-[2px] text-white bg-[#069046] font-Inter-ExtraBold text-lg mt-6 '>Save Changes</Button>
                        </div>
                    </div>
                }
            </DashboardLayout>
        </ProtectedRoute>
    )
} 