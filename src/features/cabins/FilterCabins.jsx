import { useSearchParams } from "react-router-dom";

// Styled components
import { StyledFilter } from "../../ui/FilterComponents";
import { FilterButton } from "../../ui/FilterComponents";

const FilterCabins = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting current filter option from url
  const currentFilter = searchParams.get("discount") || "all";

  // Setting filter option to url
  function handleClick(value) {
    searchParams.set("discount", value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      <FilterButton
        onClick={() => handleClick("all")}
        active={currentFilter === "all"}
        disabled={currentFilter === "all"}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("no-discount")}
        active={currentFilter === "no-discount"}
        disabled={currentFilter === "no-discount"}
      >
        No discount
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("with-discount")}
        active={currentFilter === "with-discount"}
        disabled={currentFilter === "with-discount"}
      >
        With discount
      </FilterButton>
    </StyledFilter>
  );
};

export default FilterCabins;
