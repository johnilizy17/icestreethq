import { useEffect, useState } from 'react';
import { cashFormat } from '../utils/cashFormat';

type paymentFrequencyProps = {
    daily_payment: number;
    weekly_payment: number;
    monthly_payment: number;
    PaymentFreqency?: any;
    handleClick?: (paymentFrequency: FrequencyType, payment: number) => void
};


function PaymentFrequencyPayNow({ daily_payment, weekly_payment, monthly_payment, handleClick, PaymentFreqency }: paymentFrequencyProps) {
    const [tab, setTab] = useState<FrequencyType>("daily");

    const handleFrequencyChanged = (frequency: FrequencyType, payment: number) => {
        setTab(frequency)
        PaymentFreqency(frequency)
        if (handleClick) handleClick(frequency, payment)
    }


    return (
        <div>
            <p className='font-bold mt-4'>Payment Frequency</p>
            <div className='flex justify-between my-2 items-center'>
                <p className='font-normal text-[15px] w-20'>Daily</p>
                <p className='font-normal text-[15px]'>{cashFormat(daily_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("daily", daily_payment)}
                    className={tab === "daily" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
            <div className='flex justify-between my-2 items-center'>
                <p className='font-normal text-[15px] w-20'>Weekly</p>
                <p className='font-normal text-[15px]'>{cashFormat(weekly_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("weekly", weekly_payment)}
                    className={tab === "weekly" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
            <div className='flex justify-between my-2 items-center'>
                <p className='font-normal text-[15px] w-20'>Monthly</p>
                <p className='font-normal text-[15px]'>{cashFormat(monthly_payment)}</p>
                <button
                    onClick={() => handleFrequencyChanged("monthly", monthly_payment)}
                    className={tab === "monthly" ? 'w-[12px] h-[12px] rounded-full bg-[#000] border-[1.5px] border-[#000]' : 'w-[12px] h-[12px] rounded-full border-[1.5px] border-black'}
                />
            </div>
        </div>
    );
}

export default PaymentFrequencyPayNow