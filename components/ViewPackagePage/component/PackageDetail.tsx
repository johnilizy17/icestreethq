import React, { useEffect, useReducer, useState } from 'react'
import { Image, Radio, Select } from '@chakra-ui/react'
import PackageItem from './PackageItem'
import { cashFormat } from '../../utils/cashFormat'
import PackageItemDetails from './PackageItemDetails'
import { isLessThanOrEqualOne } from '../../utils/index.util'
import ProductDescription from './ProductDescription'
import { packageItemsReducer } from '../../utils/viewPackage.utils'
import Link from 'next/link'
import { useRouter } from 'next/router'


export const _packageItems: packageItem[] = [
    {
        name: '1 liter of groundnut oil',
        price: 10000,
        imageURL: '/images/items/g1.png',
        id: 1
    },
    {
        name: 'Tin Tomatoes',
        price: 10000,
        imageURL: '/images/items/g2.png',
        id: 2
    },
    {
        name: 'Maggi',
        price: 10000,
        imageURL: '/images/items/g3.png',
        id: 3
    },
    {
        name: 'Peak Milk',
        price: 10000,
        imageURL: '/images/items/g4.png',
        id: 4
    },
    {
        name: 'Fridge',
        price: 11000,
        imageURL: '/images/items/e1.png',
        id: 5
    },
    {
        name: 'Phone',
        price: 15000,
        imageURL: '/images/items/e2.png',
        id: 6
    },
]

enum packageItemActionKind {
    UPDATE_CURRENT_ID,
    INCREMENT_INDEX,
    DECREMENT_INDEX
}

export default function PackageDetail({ id }: packageDetailsProp) {
    const [selectedFaq, setSelectedFaq] = useState("product_details")
    const cartUrl = `/cart`

    const initialState: packageData = {
        data: _packageItems,
        currentId: _packageItems[0].id ?? 1,
        currentIndex: 0
    }

    const router = useRouter()

    const [packageItems, dispatchPackageItem] = useReducer(packageItemsReducer, initialState)

    const handleItemClicked = (id: idType) => {
        dispatchPackageItem({ type: packageItemActionKind.UPDATE_CURRENT_ID, payload: { currentId: id } })
    }

    const handleNavItemClicked = (type: "previous" | "next") => {
        if (type === "previous") {
            dispatchPackageItem({ type: packageItemActionKind.DECREMENT_INDEX })
        } else if (type === "next") {
            dispatchPackageItem({ type: packageItemActionKind.INCREMENT_INDEX })
        }
    }

    const changeSelectedFaq = (value: string) => {
        if (value === selectedFaq) {
            setSelectedFaq("")
            return
        }

        setSelectedFaq(value)
    }

    const handleAddCart = () => {
        if (typeof id === "string")
            localStorage.setItem("cartId", id)
        router.push("/cart")

    }


    return (
        <div className=' w-full space-y-4 lg:space-y-0' >
            <div className=' w-full lg:bg-white' >

                {/* start of package heading */}
                <div className=' w-full mt-2 lg:mt-0 flex items-center justify-between lg:justify-start  border-b py-3 px-4 border-[#D9D9D9] bg-white' >
                    <p className=' font-semibold text-[15px] ' >Christmas</p>
                    <p className=' ml-12 text-[#0dadf7] text-[13px] font-bold ' >{cashFormat(25)} - <span className=' font-normal text-[15px] text-black ' >Daily</span></p>

                    <div className='hidden lg:flex'>
                        <Link href={"/add-more-items"} className=' ml-12 border inline-flex justify-center items-center border-[#0dadf7] text-[#0dadf7] bg-white text-[13px] h-[26px] w-[120px] ' >
                            Edit Package
                        </Link>
                        <button onClick={handleAddCart} className='inline-flex items-center justify-center ml-6 bg-[#0dadf7] text-white text-[13px] h-[26px] w-[152px] ' >
                            Add Package To Cart
                        </button>
                    </div>

                </div>
                {/* end of package heading */}

                <div className='w-full flex flex-col lg:flex-row items-center justify-between lg:px-3 lg:py-6 space-y-4 lg:space-y-0' >

                    {/* start structure for display of package items */}
                    <div className='w-full bg-white items-center px-4 py-1 lg:py-0 lg:bg-transparent lg:w-5/12 flex lg:flex-col justify-center'>
                        <div className='w-full max-w-md justify-between lg:justify-start lg:h-[300px] flex lg:flex-col overflow-y-scroll overflow-x-hidden py-2 space-x-2' >
                            {
                                packageItems && packageItems.data.map((packageItem) => {
                                    const isActive = packageItems.currentId === packageItem.id
                                    return (
                                        <PackageItem
                                            key={packageItem.id}
                                            imageURL={packageItem.imageURL}
                                            name={packageItem.name}
                                            price={packageItem.price}
                                            id={packageItem.id}
                                            active={isActive}
                                            handleItemClicked={handleItemClicked} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    {/* end structure for display of package items */}


                    <div className='bg-white lg:bg-transparent w-full p-8 space-y-8 lg:space-y-0'>
                        <PackageItemDetails
                            handleClicked={handleNavItemClicked}
                            currentId={packageItems.currentId} />
                        <div className='w-full flex lg:hidden self-center space-x-3 mt-7'>
                            <Link href={"/add-more-items"} className='w-2/6 py-2 inline-flex justify-center items-center border border-[#0dadf7] text-[#0dadf7] bg-white text-sm font-semibold' >
                                Edit Package
                            </Link>
                            <Link href={cartUrl} className='inline-flex items-center justify-center grow py-2 bg-[#0dadf7] text-white text-sm font-semibold' >
                                Add Package To Cart
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className='space-y-2'>
                <ProductDescription
                    handleClick={changeSelectedFaq}
                    active={selectedFaq === "product_details"}
                    heading='Product Details'>
                    All-screen design. Beauty all round. iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1) Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours
                </ProductDescription>

                <ProductDescription
                    handleClick={changeSelectedFaq}
                    active={selectedFaq === "feature"}
                    heading='Feature'>
                    All-screen design. Beauty all round. iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1) Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours
                </ProductDescription>

                <ProductDescription
                    handleClick={changeSelectedFaq}
                    active={selectedFaq === "specification"}
                    heading='Specification'>
                    All-screen design. Beauty all round. iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1) Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours
                </ProductDescription>
            </div>


        </div>
    )
} 