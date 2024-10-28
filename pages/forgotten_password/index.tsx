import React from 'react'
import Router, { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Button, Image, Input, useToast } from '@chakra-ui/react'
import { useLoginCallback } from '../../services/authService';
import SpinLoader from '../../components/Loaders/SpinLoader';
import MenuLayout from '../../components/MenuLayout';
import { forgotPassword } from '../../services';

export default function ForgottenPassword() {

    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const [isShown, setIsShown] = React.useState(false)
    const { handleLogin } = useLoginCallback();
    const navigate = useRouter()
    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required')
    })

    // formik
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    const submit = async () => {
        setLoading(true)
        if (!formik.dirty) {
            // toast.error("Please Enter Your Email And Password") 
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else if (!formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else {
            try {
                const response = await forgotPassword(formik.values)
                if (response?.status === 200) {
                    toast({
                        title: response?.data?.msg,
                        position: "bottom",
                        status: "success",
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: response?.data?.msg ? response?.data?.msg : "Error occured",
                        position: "bottom",
                        status: "error",
                        isClosable: true,
                    })
                }
            } catch (response:any) {
                toast({
                    title: response.response?.data ? response.response?.data : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
                setLoading(false);
            }
        }
        setLoading(false);
    }

    return (
        <main>
            <MenuLayout pageName='Ice Street SignUp' menu={false} category={false}>
                <div className=' w-full bg-white lg:bg-[#F5F5F5] flex flex-col items-center ' >
                    <div className=' lg:loginShadow w-full lg:w-[600px] font-medium my-12 rounded-xl flex flex-col bg-white py-8 px-4 lg:px-[45px] ' >
                        <p className=' font-bold lg:text-2xl text-center ' >FORGOTTEN PASSWORD</p>
                        <div className=' w-full mt-10 lg:mt-8 ' >
                            <p className=' text-sm font-medium mb-2 ' >Email Address</p>
                            <Input
                                name="email"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("email", true, true)
                                }
                                height="45px" border="1px solid #595959E5" placeholder='Enter email address' fontSize="sm" />
                            <div className="w-full h-auto pt-2">
                                {formik.touched.email && formik.errors.email && (
                                    <motion.p
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-xs font-Inter-Medium text-[#ff0000]"
                                    >
                                        {formik.errors.email}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                        <Button colorScheme='blackAlpha' bg="black" isLoading={loading} isDisabled={loading} onClick={() => submit()} className=' w-full h-[45px] rounded-[5px] text-white bg-[#0dadf7] font-Inter-Bold text-sm mt-3 '>
                            Submit
                        </Button>
                        <p className=' text-sm text-center mt-6 font-medium ' >Remember your password? <span onClick={() => Router.push("/login")} className=' text-[#0dadf7] cursor-pointer ml-1 font-bold ' >Log In</span></p>
                    </div>
                </div>
            </MenuLayout>
        </main>
    )
} 