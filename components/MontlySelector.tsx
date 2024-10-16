import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { getSingularOrPlural } from "./utils/index.util";
import { isSingleItem } from "./utils/productDetails.utils";

interface MonthlySelectorProps {
    defaultDuration: number
    handleDurationChange: (duration: number) => void;
}


function MonthlySelector({ defaultDuration, handleDurationChange }: MonthlySelectorProps) {
    const [duration, setDuration] = useState(defaultDuration);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDuration = parseInt(event.target.value, 10);
        setDuration(selectedDuration);
        handleDurationChange(selectedDuration);
    };

    return (
        <Select
            placeholder="Select Duration"
            className="px-0"
            rounded="md"
            value={duration}
            onChange={handleChange}
            height="30"
            fontSize="sm"
            border="1px solid #000000"
            backgroundColor="#fff"
            maxWidth={149}
        >
            {/* created a loop to count 12 months */}
            {[...new Array(12)].map((_, index) => (
                <option
                    key={`option-${index}`}
                    value={index + 1}
                >
                    {index + 1} month{getSingularOrPlural(index + 1)}
                </option>
            ))}
        </Select>
    );
}



export default MonthlySelector;
