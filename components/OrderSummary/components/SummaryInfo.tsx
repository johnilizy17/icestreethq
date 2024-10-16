import React from 'react'

const SummaryInfo = ({ name, value }: summaryInfoTypeProps) => {
    return (
        <div className=' w-full flex mb-4 justify-between items-center ' >
            <p className=' font-semibold text-[15px] ' >{name}</p>
            <p className=' font-normal text-[15px] ' >{value}</p>
        </div>
    )
}

export default SummaryInfo