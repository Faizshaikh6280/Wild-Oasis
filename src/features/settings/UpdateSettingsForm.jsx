import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdate } from "./useUpdate";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();

  const {
    breakfastPrice,
    maxBookinglength,
    minBookingLength,
    maxGuestPerCabin,
  } = settings;

  const { isUpdating, updateSetting } = useUpdate();

  function handleUpdate(e, field) {
    const value = e.target.value;
    const prevVal = settings[field];
    if (!value || +value === prevVal) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookinglength}
          onBlur={(e) => handleUpdate(e, "maxBookinglength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerCabin}
          onBlur={(e) => handleUpdate(e, "maxGuestPerCabin")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
