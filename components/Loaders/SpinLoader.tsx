import { Spinner } from '@chakra-ui/react'
import React from 'react'

interface Props {
    size?: "md" | "xl" | "sm" | "lg" | "xs"
}

const SpinLoader = ({ size = "xl" }: Props) => {
    return (
        <Spinner
            thickness='4px'
            emptyColor='gray.200'
            color='#0dadf7'
            speed='0.25s'
            size={size}
        />
    )
}

export default SpinLoader