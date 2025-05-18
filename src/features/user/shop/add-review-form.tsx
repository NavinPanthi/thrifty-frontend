import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import TextInput from "@/components/ui/text-input";
import TextAreaInput from "@/components/ui/textarea";

import useAddReviewMutation from "@/services/user/products/use-add-review-mutation";

const schema = yup
  .object({
    rating: yup
      .number()
      .typeError("Rating must be a number.")
      .min(1, "Minimum rating is 1.")
      .max(5, "Maximum rating is 5.")
      .required("Rating is required."),
    comment: yup
      .string()
      .required("Comment is required.")
      .max(200, "Comment must be at most 200 characters."),
  })
  .required();

type ReviewSchemaType = yup.InferType<typeof schema>;

const AddReviewForm = ({ productId }: { productId?: number | string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewSchemaType>({
    resolver: yupResolver(schema),
  });

  const { mutate: handleSubmitReview, isPending } = useAddReviewMutation();

  const onSubmit: SubmitHandler<ReviewSchemaType> = (data) => {
    handleSubmitReview({ ...data, productId });
  };

  return (
    <form
      className="mt-6 max-w-[800px] border-t-4 border-core-primary"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="my-4 text-2xl">Add review for the product.</p>
      <fieldset>
        <Label htmlFor="rating">Rating (1 to 5)</Label>
        <TextInput
          {...register("rating")}
          id="rating"
          type="number"
          placeholder="Enter rating"
          errorMsg={errors.rating?.message}
        />
      </fieldset>

      <fieldset className="mt-4">
        <Label htmlFor="comment">Comment</Label>
        <TextAreaInput
          {...register("comment")}
          id="comment"
          placeholder="Write your review here..."
          rows={4}
          errorMsg={errors.comment?.message}
        />
      </fieldset>

      <Button
        isLoading={isPending}
        type="submit"
        className="mt-6 w-full"
        size="lg"
      >
        Submit Review
      </Button>
    </form>
  );
};

export default AddReviewForm;
