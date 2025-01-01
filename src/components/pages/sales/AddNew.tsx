import { Button, Modal, Space } from "antd";
import useAddNewSale from "../../../hooks/useAddNewSale"; // Update import to use the hook for sales
import { useEffect } from "react";
import SelectType from "./SelectType"; // Component to select internal/external
import InternalForm from "./InternalForm"; // Component for internal type form
import ExternalForm from "./ExternalForm"; // Component for external type form
import useSalesStore from "../../../store/sales";

function AddNew() {
  const { handleCloseModal, handleOpenModal, isModalOpen } = useAddNewSale(); // Use hook for adding new sales

  const {
    type, // Current type (internal/external)
    currentPage,
    prevPage,
    resetType,
    resetPagination,
  } = useSalesStore();

  useEffect(() => {
    // Initialize the store values
    resetType();
    resetPagination();
  }, [resetType, resetPagination]);

  return (
    <>
      <Button className="uppercase" onClick={handleOpenModal} type="default">
        + Add New Sale
      </Button>
      <Modal
        footer={null}
        title="Add New Sale"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <div>
          <Space className="mb-5">
            {currentPage !== 1 && (
              <Button type="primary" onClick={prevPage}>
                Back
              </Button>
            )}
            {currentPage === 3 && (
              <Button
                type="primary"
                onClick={() => {
                  resetType();
                  resetPagination();
                }}
              >
                Reset
              </Button>
            )}
          </Space>
          {currentPage === 1 && <SelectType />}
          {currentPage === 2 && type === "internal" && <InternalForm />}
          {currentPage === 2 && type === "external" && <ExternalForm />}
        </div>
      </Modal>
    </>
  );
}

export default AddNew;
