import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import TextInput from "@/components/ui/text-input";

import usePlaceOrderFromCartMutation from "@/services/user/order/use-place-order-from-cart-mutation";

const schema = yup
  .object({
    shippingAddress: yup.string().required("Shipping address is required."),
  })
  .required();

type ShippingFormSchema = yup.InferType<typeof schema>;

const PlaceOrderModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { mutate: placeOrder, isPending } = usePlaceOrderFromCartMutation();

  const onSubmit: SubmitHandler<ShippingFormSchema> = (data) => {
    placeOrder(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormSchema>({
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className="!max-w-[480px] gap-10"
    >
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Label htmlFor="shippingAddress">Shipping Address</Label>
          <TextInput
            {...register("shippingAddress")}
            id="shippingAddress"
            placeholder="Enter your shipping address"
            errorMsg={errors.shippingAddress?.message}
          />
        </fieldset>
        <p className="mt-2 text-sm"> Delivery after 3 days</p>

        <Button
          isLoading={isPending}
          type="submit"
          className="mt-6 w-full"
          size="lg"
        >
          Place Order
        </Button>
      </form>
    </Modal>
  );
};

export default PlaceOrderModal;
