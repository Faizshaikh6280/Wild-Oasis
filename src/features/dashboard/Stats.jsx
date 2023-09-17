import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3. Check-ins
  const checkins = confirmedStays.length;
  //4. Occupncy rate.
  const occupencyRate =
    confirmedStays.reduce((acc, cur) => cur.numNights + acc, 0) /
    (numDays * numCabins);

  console.log();
  return (
    <>
      <Stat
        title="Booking"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${(occupencyRate / 100).toFixed(3)}%`}
      />
    </>
  );
}

export default Stats;
