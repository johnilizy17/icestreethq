import { Image } from "@chakra-ui/react";


type props = {
    paymentMethod: PaymentOptionKind
    handleClick: (arg: PaymentOptionKind) => void
    text: string
    imageUrl: string
    activeMethod: PaymentOptionKind
};


function PaymentOption({ paymentMethod, handleClick, text, imageUrl, activeMethod }: props) {
    const isWallet = paymentMethod === "wallet"

    return (
        <div className='flex items-center'>
            <button
                onClick={() => handleClick(paymentMethod)}
                className='lg:w-5 lg:h-5 w-4 h-4 rounded-full flex p-[3px] justify-center items-center border border-black mr-4'>
                {activeMethod === paymentMethod && (
                    <div className='w-full h-full rounded-full bg-black' />
                )}
            </button>
            <div className='w-5'>
                <Image src={imageUrl} alt='wallet' height='14px' />
            </div>
            <div className="flex justify-between w-full">
                <p className='ml-5 font-normal text-[15px]'>{text}</p>
                {isWallet && <span className=' font-bold text-sm lg:text-lg text-[#0088FE]' >Balance: ₦0</span>}
            </div>
        </div>
    );
}

export default PaymentOption;
