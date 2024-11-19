import { useEffect, useState } from 'react';
import { cashFormat } from '../utils/cashFormat';

type paymentFrequencyProps = {
    daily_payment: number;
    weekly_payment: number;
    monthly_payment: number;
    activeTab: FrequencyType
    alignLeft?: boolean
    className?: string
    handleClick?: (paymentFrequency: FrequencyType, payment: number) => void
};


function PaymentFrequency({ daily_payment, weekly_payment, activeTab, monthly_payment, alignLeft, className, handleClick }: paymentFrequencyProps) {
    const [tab, setTab] = useState<FrequencyType>(activeTab);

    const handleFrequencyChanged = (frequency: FrequencyType, payment: number) => {
        setTab(frequency)
        if (handleClick) handleClick(frequency, payment)
    }

    const getFrequencyPayment = (frequency: FrequencyType) => {
        switch (frequency) {
            case "daily":
                return daily_payment
            case "weekly":
                return weekly_payment
            case "monthly":
                return monthly_payment
        }
    }

    useEffect(() => {
        const frequencyPayment = getFrequencyPayment(activeTab)
        handleFrequencyChanged(activeTab, frequencyPayment)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={`space-y-3 w-full max-w-md mx-auto ${className}`}>
            <h3 className={` font-bold text-sm lg:text-xm mt-4 ${alignLeft && "text-left lg:text-center"} mb-4`}>Payment Frequency</h3>
            <div className='flex  justify-between my-2 items-center'>
                <p className='font-normal text-[14px] w-2/6 whitespace-nowrap text-left'>Daily</p>
                <p className='font-normal text-[15px] text-left w-2/6'>{cashFormat(daily_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("daily", daily_payment)}
                    className={tab === "daily" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
            <div className='flex justify-between my-2 items-center'>
                <p className='font-normal text-[14px] w-2/6 whitespace-nowrap text-left'>Weekly</p>
                <p className='font-normal text-[15px] text-left w-2/6'>{cashFormat(weekly_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("weekly", weekly_payment)}
                    className={tab === "weekly" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
            <div className='flex justify-between my-2 items-center'>
                <p className='font-normal text-[14px] w-2/6 whitespace-nowrap text-left'>Monthly</p>
                <p className='font-normal text-[15px] text-left w-2/6'>{cashFormat(monthly_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("monthly", monthly_payment)}
                    className={tab === "monthly" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
        </div>
    );
}

export default PaymentFrequency;