import { TodoListResType } from "@/pages/api/todoList";
import { axiosInstance } from "../config";

export const getTodos = async () => {
  const { data } = await axiosInstance.get<TodoListResType>("/todoList");
  return data;
};
