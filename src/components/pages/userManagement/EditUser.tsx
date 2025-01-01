import { Button, Modal } from "antd";
import useEditUser from "../../../hooks/useEditUser"; // Adjust import as necessary
import FormBuilder from "../../utils/FormBuilder";
import { UserProfile } from "../../../types/db";

interface Props {
  user: UserProfile;
}

function EditUser({ user }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditUser({ user }); // Adjust hook name and logic as necessary

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        Edit User
      </Button>
      <Modal
        footer={null}
        title="Edit User"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={2}
        />
      </Modal>
    </>
  );
}

export default EditUser;
