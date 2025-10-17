import React from "react";
import Button from "../../ui/Button/Button";
import TableContent from "../TableContent/TableContent";
import ModalAddEmployee from "../ModalAddEmployee/ModalAddEmployee";

const Employee = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b-1 pb-4 border-gray-400">
        <div className="flex flex-col">
          <h1 className="text-base font-bold m-0 md:text-lg">
            Employee Management
          </h1>
          <span className="text-xs text-gray-400 md:text-md">
            Current roster of all active personnel and teams.
          </span>
        </div>
        <Button
          className="w-full md:max-w-[150px] mt-2 bg-green-600 text-white"
          label="Add Employee"
          onClick={handleShowModal}
          loading={false}
          disabled={false}
        />
      </div>
      <TableContent />
      <ModalAddEmployee open={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Employee;
