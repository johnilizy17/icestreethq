import React from 'react'
import Router, { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Image, Input, useToast } from '@chakra-ui/react'
import { useLoginCallback } from '../../services/authService';
import { setSession } from '../../services/authService/session';
import SpinLoader from '../../components/Loaders/SpinLoader';
import MenuLayout from '../../components/MenuLayout';

export default function Login() {

    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const [isShown, setIsShown] = React.useState(false)
    const { handleLogin } = useLoginCallback();
    const navigate = useRouter()
    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required'),
        password: yup.string().required('Your password is required').min(8, 'A minimium of 8 characters')
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

            const response = await handleLogin(JSON.stringify(formik.values))

            if (response?.status === 200) {
                localStorage.clear()
                localStorage.setItem("user", response?.data?.userID)
                localStorage.setItem("token", response?.data?.access_token)
                toast({
                    title: response?.data?.msg,
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
                window.location.href = "/"
            } else {
                toast({
                    title: response?.data?.msg ? response?.data?.msg : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
            }
        }
        setLoading(false);
    }

    return (

        <main>
            <MenuLayout pageName='Ice Street Login' menu={false} category={false}>
                <div className=' w-full bg-white lg:bg-[#F5F5F5] flex flex-col items-center ' >
                    <div className=' lg:loginShadow w-full lg:w-[600px] font-medium my-12 rounded-xl flex flex-col bg-white py-8 px-4 lg:px-[45px] ' >
                        <p className=' font-bold lg:text-2xl text-center ' >LOGIN</p>
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
                        <div className=' w-full mt-4 ' >
                            <p className=' text-sm mb-2 ' >Password</p>
                            <div className=' w-full relative h-[45px] ' >
                                <Input
                                    name="password"
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("password", true, true)
                                    }
                                    height="45px" type={!isShown ? "password" : "text"} border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" />
                                <button className=' top-0 z-20 absolute right-0 px-4 h-full flex items-center justify-center ' onClick={() => setIsShown((prev) => !prev)} >
                                    <Image src='/images/icon/eye.svg' alt="eye" />
                                </button>
                            </div>
                            <div className="w-full h-auto pt-2">
                                {formik.touched.password && formik.errors.password && (
                                    <motion.p
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-xs font-Inter-Medium text-[#ff0000]"
                                    >
                                        {formik.errors.password}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                        <button className=' underline text-[#0dadf7] text-sm mt-2 mb-4 ml-auto font-semibold ' onClick={() => { navigate.push("/forgotten_password") }} >Forgot password?</button>
                        <button disabled={loading} onClick={() => submit()} className=' w-full h-[45px] rounded-[5px] text-white bg-[#000] font-Inter-ExtraBold text-sm mt-3 '>
                            {loading ? <SpinLoader size="xs" /> : "LOGIN"}
                        </button>
                        <p className=' text-sm text-center mt-6 font-medium ' >{"Don’t have an account?"} <span onClick={() => Router.push("/signup")} className=' text-[#0dadf7] cursor-pointer ml-1 font-bold ' >Sign Up</span></p>
                    </div>
                </div>
            </MenuLayout>
        </main>
    )
} 