import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const { checkout, isCheckout } = useCheckout();
  const { isDeleletingBooking, deleteBooking } = useDeleteBooking();
  function handledDelete() {
    deleteBooking(booking.id, {
      onSuccess: navigate(-1),
    });
  }
  if (isLoading) return <Spinner />;

  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <br />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variations="primary"
            size="medium"
            onClick={() => navigate(`/checkin/${booking.id}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variations="primary"
            size="medium"
            onClick={() => checkout(booking.id)}
            disabled={isCheckout}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"deleteBooking"}>
            <Button variations="danger" size="medium">
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name={"deleteBooking"}>
            <ConfirmDelete
              onConfirm={handledDelete}
              resourceName={`booking #${booking.id}`}
              disabled={isDeleletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variations="secondary" size="small" onClick={moveBack}>
          &larr; Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
