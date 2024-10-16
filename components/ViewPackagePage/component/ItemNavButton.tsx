import React from 'react'

interface props {
    children: React.ReactNode
    isLeft: boolean
    handleClicked: Function
}

const ItemNavButton = ({ children, isLeft, handleClicked }: props) => {
    return (
        <button
            onClick={() => handleClicked(isLeft ? "previous" : "next")}
            className={`absolute lg:hidden inline-block top-1/4 ${isLeft ? "left-0" : "right-0"}`}>
            {children}
        </button>
    )
}

export default ItemNavButton