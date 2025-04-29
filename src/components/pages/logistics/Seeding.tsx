import { App, Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { DispatchSchema } from "../../../zodSchemas/dispatch";
import { dapDispatchSeed } from "../../../seed/dapDispatch";
import { ZodError } from "zod";
import { createDispatch } from "../../../helpers/apiFunctions";

function Seeding() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate: handleSubmit, isLoading } = useMutation({
    //@ts-ignore
    mutationFn: async (values: any) => {
      try {
        for (const seed of dapDispatchSeed) {
          // validate one payload at a time
          const payload = await DispatchSchema.parseAsync(seed);
          console.log("validated:", payload);

          // then send to your API
          const vehicle = await createDispatch(payload);
          console.log("created:", vehicle);
        }
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle ZodError separately to extract and display validation errors
          console.error("Zod Validation failed:", error.errors);
          throw error; // Re-throw the ZodError to be caught by the onError handler
        } else if (error instanceof Error) {
          // Handle other types of errors
          console.error("An unexpected error occurred:", error.message);
          throw new Error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        message.error(error.errors[0].message);
      } else if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Dispatched successfully");
      queryClient.invalidateQueries();
    },
  });

  return (
    <div>
      <Button onClick={handleSubmit}>Seed</Button>
      {isLoading && "loading...."}
    </div>
  );
}

export default Seeding;
