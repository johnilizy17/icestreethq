import { Image } from "@chakra-ui/react";

type Props = {
    imageUrl: string;
    altText?: string;
    title: string;
};

const SearchResultItem = ({ imageUrl, altText = "search result", title }: Props) => {
    return (
        <div className="my-3 flex items-center">
            <div className="w-[60px] h-[60px] border rounded-[5px] border-[#eeeded] mr-4 flex justify-center items-center">
                <Image src={imageUrl} alt={altText} width="45px" />
            </div>
            <p className="font-normal text-black">{title}</p>
        </div>
    );
};

export default SearchResultItem;
