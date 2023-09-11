import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";

import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [paidConfirmed, setPaidConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { isChecking, checkin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setPaidConfirmed(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName },
  } = booking;

  function handleCheckin() {
    if (!paidConfirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalPrice,
          totalPrice: totalPrice + optionalPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  const optionalPrice = settings.breakfastPrice * numNights * numGuests;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <br />
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((x) => !x);
              setPaidConfirmed(false);
            }}
          >
            want to add breakfast for {formatCurrency(optionalPrice)} ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={paidConfirmed}
          id="confirmed"
          onChange={() => setPaidConfirmed((x) => !x)}
          disabled={paidConfirmed || isChecking}
        >
          I confirm that {guestName} has paid the total amount of{" "}
          {formatCurrency(
            !addBreakfast ? totalPrice : totalPrice + optionalPrice
          )}{" "}
          {addBreakfast &&
            `(${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalPrice
            )})`}
        </Checkbox>
      </Box>
      <br />
      <ButtonGroup>
        <Button
          variations="primary"
          size={"medium"}
          onClick={handleCheckin}
          disabled={!paidConfirmed || isChecking}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variations="secondary" size="small" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
