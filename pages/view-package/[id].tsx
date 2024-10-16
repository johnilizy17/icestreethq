import React, { useEffect } from 'react'
import MenuLayout from '../../components/MenuLayout'
import PackageDetail from '../../components/ViewPackagePage/component/PackageDetail'
import OtherProduct from '../../components/OtherProduct'
import BreadCrumb from '../../components/ViewPackagePage/component/BreadCrumb'
import { useRouter } from 'next/router'
import { getProductsById } from '../../services'

export default function ViewPackage() {
    // getting the current package id
    const router = useRouter()
    const { id } = router.query

    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-[#F5F5F5] lg:px-[32px]' >
                {/* <BreadCrumb /> */}
                <div className=' w-full flex lg:flex-row flex-col lg:pb-12 space-y-4 lg:space-y-0' >
                    <div className=' w-full lg:pr-5 mt-10' >
                        <PackageDetail id={"640f33e69d6e1c8d1f76bda7"} />
                    </div>
                    {/* <div className='w-full lg:w-fit lg:mt-0 lg:px-0' >
                        <div className='w-full lg:w-[400px] overflow-y-auto ' >
                            <OtherProduct />
                        </div>
                    </div> */}
                </div>
            </div>
        </MenuLayout>
    )
} 