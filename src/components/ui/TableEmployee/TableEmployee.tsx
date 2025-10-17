import type { FC, PropsWithChildren } from "react";
import type { Employee } from "../../../services/type";
import {
  capitalizeFirstLetter,
  parseStringToArray,
} from "../../../utils/stringUtils";
import Pill from "../Pill/Pill";

interface PropsTableEmployee {
  paginatedData: Employee[];
}

const TableEmployee: FC<PropsWithChildren<PropsTableEmployee>> = ({
  paginatedData,
}) => {
  return (
    <div className="mt-4 mb-4 overflow-scroll rounded-lg borderborder-gray-200">
      <table className="min-w-full border-collapse">
        <caption className="sr-only">Employee directory</caption>
        <thead>
          <tr className="bg-gray-300">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs md:text-sm font-semibold text-black"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs md:text-sm font-semibold text-black"
            >
              Gender
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs md:text-sm font-semibold text-black"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs md:text-sm font-semibold text-black"
            >
              Hobby
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs md:text-sm font-semibold text-black"
            >
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {(paginatedData as Employee[]).map((emp: Employee) => (
            <tr key={emp.name} className="border-b border-gray-200">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.photo || "/placeholder.svg"}
                    alt="employee-photo"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-black font-normal text-xs md:text-sm">
                    {capitalizeFirstLetter(String(emp.name))}
                  </span>
                </div>
              </td>
              <td className="px-6 py-2 text-black font-normal text-xs md:text-sm">
                {capitalizeFirstLetter(String(emp.gender))}
              </td>
              <td className="px-6 py-2 text-black font-normal text-xs md:text-sm">
                {emp.age}
              </td>
              <td className="px-6 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  {parseStringToArray(String(emp.hobby)).map(
                    (h: string, idx: number) => (
                      <Pill key={idx} label={h} />
                    )
                  )}
                </div>
              </td>
              <td className="px-6 py-2 text-black font-normal text-xs md:text-sm">
                {capitalizeFirstLetter(String(emp.department))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEmployee;
