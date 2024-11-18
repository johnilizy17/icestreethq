import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@chakra-ui/react";

const PaymentForm = () => {
    const [amount, setAmount] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mt-3 w-full p-[18px] border border-[#D9D9D9] rounded-[5px]">
                <p className="font-normal mb-2">Custom Pay</p>
                <Input
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter Amount"
                    height="40px"
                    border="1px solid #D9D9D9"
                    fontSize="sm"
                />
                <p className="mt-[1px] font-normal text-[13px] text-[#D3321C]">
                    Use custom if you want to pay above{" "}
                    <span className="text-black">₦8,333.33</span>{" "}
                </p>
            </div>
            <p className="font-normal mt-[18px] mb-2">Upload Proof of payment</p>
            <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                height="40px"
                paddingTop="5.5px"
                border="1px solid #D9D9D9"
                fontSize="sm"
            />

            <button
                type="submit"
                className="mt-8 rounded-md w-full text-[15px] bg-[#069046] h-[40px] font-semibold text-white"
            >
                Submit
            </button>
        </form>
    );
};

export default PaymentForm;
