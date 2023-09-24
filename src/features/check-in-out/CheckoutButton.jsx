import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckOut } = useCheckout();
  return (
    <Button
      variations="primary"
      size="small"
      disabled={isCheckOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
