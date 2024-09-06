// Component for filtering cabins
import FilterCabins from "./FilterCabins";

// Component for sorting cabins
import SortCabins from "./SortCabins";

// Styled components
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <FilterCabins />
      <SortCabins />
    </TableOperations>
  );
};

export default CabinTableOperations;
