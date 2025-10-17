import React, { type FC, type PropsWithChildren } from "react";
import Modal from "../../ui/Modal/Modal";
import Input from "../../ui/Input/Input";
import Pill from "../../ui/Pill/Pill";
import { departements } from "../../../constants";
import { parseArrayToString } from "../../../utils/stringUtils";
import Button from "../../ui/Button/Button";
import {
  useCreateDataEmployee,
  useEmployeesWithPagination,
} from "../../../services/resolver";
import type { Employee } from "../../../services/type";
import { useQueryClient } from "@tanstack/react-query";

interface PropsModalAddEmployee {
  open: boolean;
  onClose: () => void;
}

const ModalAddEmployee: FC<PropsWithChildren<PropsModalAddEmployee>> = ({
  open,
  onClose,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [hobbyInput, setHobbyInput] = React.useState("");
  const [listHobby, setListHobby] = React.useState<string[]>([]);

  const [addEmployee, setAddEmployee] = React.useState<Employee>({
    name: undefined,
    age: undefined,
    gender: undefined,
    hobby: undefined,
    department: undefined,
  });

  const { refetch } = useEmployeesWithPagination(5);
  const {
    mutate: createUser,
    reset: resetError,
    isPending,
    error,
  } = useCreateDataEmployee();

  const handleInputListHobby = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbyInput(e.target.value);
  };

  const handleInputHobbyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && hobbyInput.trim() !== "") {
      e.preventDefault();
      if (!listHobby.includes(hobbyInput.trim())) {
        setListHobby([...listHobby, hobbyInput.trim()]);
      }
      setHobbyInput("");
    }
  };

  const handleDeleteListHobby = (hobby: string) => {
    setListHobby(listHobby.filter((h) => h !== hobby));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    resetError();
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    resetError();
    createUser(
      {
        name: addEmployee.name,
        age: Number(addEmployee.age),
        gender: addEmployee.gender,
        hobby: addEmployee.hobby,
        department: addEmployee.department,
      },
      {
        onSuccess: () => {
          refetch();
          // Clear Form
          setAddEmployee({
            name: undefined,
            age: undefined,
            gender: undefined,
            hobby: undefined,
            department: undefined,
          });
          setListHobby([]);
          setHobbyInput("");
          onClose();
        },
        onError: () => {
          console.log("Error adding employee");
        },
      }
    );
  };

  const handleCancel = () => {
    resetError();
    // Clear Form
    setAddEmployee({
      name: undefined,
      age: undefined,
      gender: undefined,
      hobby: undefined,
      department: undefined,
    });

    setListHobby([]);
    setHobbyInput("");
    onClose();
  };

  React.useEffect(() => {
    setAddEmployee((prev) => ({
      ...prev,
      hobby: listHobby.length === 0 ? undefined : parseArrayToString(listHobby),
    }));
  }, [listHobby]);

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title="Add New Employee"
      size="lg"
      contentClassName="overflow-y-auto max-h-[80vh]"
    >
      <div>
        {/** Full Name */}
        <Input
          label="Full Name"
          placeholder="Example: John Doe"
          name="name"
          value={addEmployee.name}
          onChange={handleChange}
          type="text"
          isError={error?.response?.data?.message?.name}
          errorMessage={error?.response?.data?.message?.name?.[0]}
        />

        {/** Gender */}
        <fieldset className="grid gap-2 mb-4">
          <h2 className="text-sm md:text-base font-semibold text-gray-600 text-balance">
            Gender
          </h2>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={addEmployee.gender === "Male"}
                onChange={handleChange}
                className={
                  error?.response?.data?.message?.gender
                    ? "ring-red-500 ring-1"
                    : "ring-red-50"
                }
              />
              <span className="text-sm md:text-base font-normal text-black text-balance">
                Male
              </span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={addEmployee.gender === "Female"}
                onChange={handleChange}
                className={
                  error?.response?.data?.message?.gender
                    ? "ring-red-500 ring-1"
                    : "ring-red-50"
                }
              />
              <span className="text-sm md:text-base font-normal text-black text-balance">
                Female
              </span>
            </label>
          </div>
          {error?.response?.data?.message?.gender && (
            <span className="text-xs text-red-500 mt-1">
              {error?.response?.data?.message?.gender?.[0]}
            </span>
          )}
        </fieldset>

        {/** Age */}
        <Input
          label="Age (Years)"
          placeholder="Example: 32"
          name="age"
          value={addEmployee.age}
          onChange={handleChange}
          type="number"
          isError={error?.response?.data?.message?.age}
          errorMessage={error?.response?.data?.message?.age?.[0]}
        />

        {/** Hobby */}
        <div className="grid gap-2">
          <label className="text-sm md:text-base font-semibold text-gray-600 text-balance">
            Hobby
          </label>
          <div
            className={
              error?.response?.data?.message?.hobby
                ? "border-red-500 rounded-md border p-2.5"
                : "border-gray-300 rounded-md border p-2.5"
            }
          >
            {listHobby.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {listHobby.map((h) => (
                  <Pill
                    key={h}
                    label={h}
                    onRemove={() => handleDeleteListHobby(h)}
                  />
                ))}
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={hobbyInput}
              onChange={handleInputListHobby}
              onKeyDown={handleInputHobbyKeyDown}
              placeholder="Type interest and press Enter..."
              className="h-10 w-full bg-transparent px-2 text-foreground placeholder:text-foreground/50 focus:outline-none"
            />
          </div>
          {error?.response?.data?.message?.hobby && (
            <span className="text-xs text-red-500 mt-1">
              {error?.response?.data?.message?.hobby?.[0]}
            </span>
          )}
        </div>

        {/** Department */}
        <div className="grid gap-2 mt-4">
          <label className="text-sm md:text-base font-semibold text-gray-600 text-balance">
            Department
          </label>
          <select
            name="department"
            value={addEmployee.department}
            onChange={handleChange}
            className={
              error?.response?.data?.message?.department
                ? "border-red-500 rounded-md border p-2.5 text-sm md:text-base font-semibold text-gray-600 text-balance focus:outline-none"
                : "border-gray-300 rounded-md border p-2.5 text-sm md:text-base font-semibold text-gray-600 text-balance focus:outline-none"
            }
          >
            <option
              className="text-sm md:text-base font-semibold text-gray-600 text-balance"
              value=""
            >
              -- Select Department --
            </option>
            {departements.map((d) => (
              <option
                key={d}
                value={d}
                className="text-sm md:text-base font-semibold text-gray-600 text-balance"
              >
                {d}
              </option>
            ))}
          </select>
          {error?.response?.data?.message?.department && (
            <span className="text-xs text-red-500 mt-1">
              {error?.response?.data?.message?.department?.[0]}
            </span>
          )}
        </div>
        <div className="flex flex-row justify-between my-4 gap-4">
          <Button
            label="Cancel"
            onClick={handleCancel}
            disabled={false}
            loading={false}
            className="bg-white border border-green-500 w-1/2 text-green-500 h-10"
          />
          <Button
            label="Save"
            onClick={handleSave}
            disabled={false}
            loading={isPending}
            className="bg-green-500 w-1/2 text-white h-10"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddEmployee;
