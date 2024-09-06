import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

// Function for fetching cabins
import { getCabins } from "../../services/apiCabins";

// Component for showing datas about cabins in the table row
import CabinRow from "./CabinRow";

// Styled conponents
import { Table } from "../../ui/Table";
import { TableHeader } from "../../ui/TableHeader";
import Spinner from "../../ui/Spinner";

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  // Fetching cabins with using React Query
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) {
    return <Spinner />;
  }

  // Filtering cabins (according to their discount (with discount, no discount))

  // Getting filter option from url
  const filterValue = searchParams.get("discount") || "all";

  // creating empty variable for filtered cabins
  let filteredCabins;
  // Filtering
  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // Sorting cabins by name, price, maximum capacity

  // Getting sort option from url
  const sortValue = searchParams.get("sort-cabins") || "name-asc";

  // Creating an array with spliting sort value into field that we will sort and direction
  const [field, direction] = sortValue.split("-");

  // Creating modifier for direction of sorting
  const modifier = direction === "asc" ? 1 : -1;

  // Sorting
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Table>
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {sortedCabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
};

export default CabinTable;
