import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Styled component
import { StyledSelect } from "../../ui/Select";

const SortCabins = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting current sort option from url
  const currentOption = searchParams.get("sort-cabins") || "name-asc";

  const [selectedOption, setSelectedOption] = useState(currentOption);

  // Making selected option controlled element and setting to url
  function handleSelectedOptionChange(e) {
    const value = e.target.value;
    setSelectedOption(value);

    searchParams.set("sort-cabins", value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <StyledSelect
        value={selectedOption}
        onChange={handleSelectedOptionChange}
      >
        <option value="name-asc" selected={currentOption === "name-asc"}>
          Sort by name (A-Z)
        </option>
        <option value="name-desc" selected={currentOption === "name-desc"}>
          Sort by name (Z-A)
        </option>
        <option
          value="regularPrice-asc"
          selected={currentOption === "regularPrice-asc"}
        >
          Sort by price (low first)
        </option>
        <option
          value="regularPrice-desc"
          selected={currentOption === "regularPrice-desc"}
        >
          Sort by price (high first)
        </option>
        <option
          value="maxCapacity-asc"
          selected={currentOption === "maxCapacity-asc"}
        >
          Sort by capacity (low first)
        </option>
        <option
          value="maxCapacity-desc"
          selected={currentOption === "maxCapacity-desc"}
        >
          Sort by capacity (high first)
        </option>
      </StyledSelect>
    </div>
  );
};

export default SortCabins;
