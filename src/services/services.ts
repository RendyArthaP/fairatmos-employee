import { endPoint } from "./endpoint";
import http from "./http";
import type { Employee } from "./type";

export const getEmployees = async () => {
  return await http.get(endPoint.employee);
};

export const createEmployee = async (data: Employee) => {
  return await http.post(endPoint.employee, data);
};
