import BookingTable from "../features/bookings/BookingTable";
import { useBookings } from "../features/bookings/useBookings";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  const { bookings, isLoading, error } = useBookings();
  if (isLoading) return <Spinner />;
  if (bookings.length === 0) return <Empty resource={"bookings"} />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <br />
      <BookingTable bookings={bookings} />
    </>
  );
}

export default Bookings;
