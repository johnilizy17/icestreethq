import React from "react";

const MassBuyAccountInfo = () => {
    return (
        <div className="bg-[#00033] p-[18px] text-[15px] font-semibold w-full rounded-[5px]">
            <div className="flex items-center">
                <p className="text-[#6C6C6C] w-32">Bank:</p>
                <p>Zenith Bank</p>
            </div>
            <div className="flex items-center py-2">
                <p className="text-[#6C6C6C] w-32">Acct Number:</p>
                <p>2034095253</p>
            </div>
            <div className="flex items-center">
                <p className="text-[#6C6C6C] w-32">Name:</p>
                <p>Massbuy Ltd</p>
            </div>
            <p className="mt-4 font-normal text-[14px]">
                Make payment to Massbuy Ltd and upload the proof of payment here
            </p>
        </div>
    );
};

export default MassBuyAccountInfo;
