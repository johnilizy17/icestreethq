import { Image, Spinner } from '@chakra-ui/react'
import React from 'react'


export default function Index() {
    return (
        <div style={{background:"#fff", height:300, justifyContent:"center"}} className=' w-full flex flex-col py-[66px] items-center ' >
            <Spinner
                thickness='4px'
                emptyColor='gray.200'
                color='#0dadf7'
                speed='0.25s'
                size={"xl"}
            />
        </div>
    )
} 