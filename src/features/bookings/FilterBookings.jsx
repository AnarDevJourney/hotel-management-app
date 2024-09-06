import { useSearchParams } from "react-router-dom";

// Styled components
import { StyledFilter } from "../../ui/FilterComponents";
import { FilterButton } from "../../ui/FilterComponents";

const FilterBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting current filter option from url
  const currentFilter = searchParams.get("status") || "all";

  // Setting filter option to the url
  function handleClick(value) {
    searchParams.set("status", value);
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
        onClick={() => handleClick("checked-out")}
        active={currentFilter === "checked-out"}
        disabled={currentFilter === "checked-out"}
      >
        Checked out
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("checked-in")}
        active={currentFilter === "checked-in"}
        disabled={currentFilter === "checked-in"}
      >
        Checked in
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("unconfirmed")}
        active={currentFilter === "unconfirmed"}
        disabled={currentFilter === "unconfirmed"}
      >
        Unconfirmed
      </FilterButton>
    </StyledFilter>
  );
};

export default FilterBookings;
