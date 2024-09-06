// Component to show cabins in the table
import CabinTable from "../features/cabins/CabinTable";

// Component to show cabin table operations (filtering and sorting)
import CabinTableOperations from "../features/cabins/CabinTableOperations";

// Component to add new cabin
import AddCabin from "../features/cabins/AddCabin";

// Styled components
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Cabins = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading>Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
