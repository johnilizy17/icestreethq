import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { cashFormat } from '../../utils/cashFormat'
import ItemNavButton from './ItemNavButton'
import { _packageItems } from './PackageDetail'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'


const PackageItemDetails = ({ currentId, handleClicked }: packageItemDetailsProp) => {
    const [packageItem, setPackageItem] = useState<packageItem>()

    useEffect(() => {
        setPackageItem(_packageItems.find((packageItem) => packageItem.id === currentId))
    }, [currentId])


    if (!packageItem) return null
    return (
        <div className='flex w-full lg:w-auto flex-col lg:flex-row grow items-center relative space-y-8 lg:space-y-0' >
            <Image src={packageItem?.imageURL} className='' alt="TopOne" width="207px" />

            <div className=' lg:ml-8 text-center lg:text-left space-y-2 lg:space-y-0' >
                <p className=' font-medium ' >{packageItem?.name}</p>
                <p className=' text-lg font-bold ' >{cashFormat(packageItem?.price)}</p>
                <p className=' text-[#0dadf7] inline-block text-lg font-bold mr-2' >{cashFormat(5.5)}  </p>
                <span className='font-normal inline text-[15px] text-black ' >daily</span>
            </div>

            <ItemNavButton isLeft={true} handleClicked={handleClicked}>
                <MdArrowBackIosNew />
            </ItemNavButton>

            <ItemNavButton isLeft={false} handleClicked={handleClicked}>
                <MdArrowForwardIos />
            </ItemNavButton>




        </div>
    )
}

export default PackageItemDetails