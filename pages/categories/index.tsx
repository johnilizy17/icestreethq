import React, { useEffect } from 'react'
import MenuLayout from '../../components/MenuLayout'
import Packages from '../../components/homepagecomponents/Packages'
import ElectronicsCategories from '../../components/homepagecomponents/Electronics/ElectronicsCategories'
import { useRouter } from 'next/router';

export default function Categories() {


    const router = useRouter();
    const { query } = router;

    const page = query.id

    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full mt-4 lg:mt-12 ' >
                <ElectronicsCategories id={page} type={query} title={query.category} />
            </div>
        </MenuLayout>
    )
} 