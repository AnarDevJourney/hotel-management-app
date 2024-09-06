import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Styled component
import { StyledSelect } from "../../ui/Select";

const SortBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting current sort option from url
  const currentOption = searchParams.get("sort-bookings") || "totalPrice-asc";

  const [selectedOption, setSelectedOption] = useState(currentOption);

  // Making selected option controlled element and setting selected sort option to url
  function handleSelectedOptionChange(e) {
    const value = e.target.value;
    setSelectedOption(value);

    searchParams.set("sort-bookings", value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <StyledSelect
        value={selectedOption}
        onChange={handleSelectedOptionChange}
      >
        <option
          value="totalPrice-asc"
          selected={currentOption === "totalPrice-asc"}
        >
          Sort by amount (low first)
        </option>
        <option
          value="totalPrice-desc"
          selected={currentOption === "totalPrice-desc"}
        >
          Sort by amount (high first)
        </option>
      </StyledSelect>
    </div>
  );
};

export default SortBookings;
