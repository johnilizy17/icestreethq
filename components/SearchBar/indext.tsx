import { useState } from "react";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

type Props = {
    onSearchChange: (searchValue: string) => void;
    placeholder?: string;
    showIcon?: boolean;
    showButton?: boolean;
};


const SearchBar = ({
    onSearchChange,
    placeholder = "search for item to add to package",
    showIcon = true,
    showButton = false,
}: Props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSearchValue = event.target.value;
        setSearchValue(newSearchValue);
        onSearchChange(newSearchValue);
    };

    return (
        <InputGroup>
            {showIcon && (
                <InputLeftElement pointerEvents="none">
                    <BiSearchAlt color="#979494" />
                </InputLeftElement>
            )}
            <Input
                className="border-none rounded-none outline-none"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleSearchChange}
            />
            {showButton && (
                <div className="ml-2">
                    <button className="h-[39px] rounded-[5px] px-4 py-2 font-medium bg-[#FE7062] text-white text-sm">Search</button>
                </div>
            )}
        </InputGroup>
    );
};

export default SearchBar;
