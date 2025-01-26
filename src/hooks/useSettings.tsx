// hooks/useSettings.ts
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { App } from "antd";
import useAuthStore from "../store/auth";
import { updateProfile, uploadImage } from "../helpers/apiFunctions";
import { updateProfileSchema } from "../zodSchemas/settings";

export const useSettings = () => {
  const { userProfile, getUserProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        if (values.image) {
          const data = await uploadImage(values.image.file, "profile_pictures");
          values.image_path = data.filePath;
          values.avatar_url = data.publicUrl;
        }
        values.id = userProfile?.id;
        const payload = await updateProfileSchema.parseAsync(values);
        await updateProfile(payload);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Zod Validation failed:", error.errors);
          throw error;
        } else if (error instanceof Error) {
          console.error("An unexpected error occurred:", error.message);
          throw new Error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Profile Updated Successfully");
      getUserProfile();
      setIsEditingPicture(false);
      setIsEditing(false);
      queryClient.invalidateQueries();
    },
  });

  return {
    userProfile,
    isEditing,
    isEditingPicture,
    isLoading,
    handleEditToggle,
    handleSubmit,
    setIsEditingPicture,
  };
};
