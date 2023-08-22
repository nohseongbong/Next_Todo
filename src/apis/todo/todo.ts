import { TodoType } from "@/types/todo";
import { axiosInstance } from "../config";

type TodoListResType = TodoType[];
/**
 * Todo 리스트 불러오기 API
 */
export const getTodos = async () => {
  const { data } = await axiosInstance.get<TodoListResType>("/todo");
  console.log(data, ": get data");
  return data;
};

type CreateTodoResType = {
  message: string;
};
type CreateTodoReqType = {
  title: string;
  content: string;
};
/**
 * Todo 생성 API
 * @param title 제목
 * @param content 내용
 */
export const createTodo = async ({ title, content }: CreateTodoReqType) => {
  const { data } = await axiosInstance.post<CreateTodoResType>("/todo", { title, content });
  console.log(data, ": create data");
  return data;
};

type UpdateTodoResType = {
  message: string;
};
type UpdateTodoReqType = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
};
/**
 * Todo 생성 API
 * @param id 아이디 PK
 * @param title 제목
 * @param content 내용
 * @param completed 상태
 */
export const updateTodo = async ({ id, title, content, completed }: UpdateTodoReqType) => {
  const { data } = await axiosInstance.put<UpdateTodoResType>("/todo", { title, content, id, completed });
  console.log(data, ": update data");
  return data;
};

type DeleteTodoResType = {
  message: string;
};
type DeleteTodoReqType = {
  id: number;
};
/**
 * Todo 삭제 API
 * @param id 아이디 PK
 */
export const deleteTodo = async ({ id }: DeleteTodoReqType) => {
  const { data } = await axiosInstance.delete<DeleteTodoResType>(`/todo?id=${id}`);
  console.log(data, ": deleted data");
  return data;
};
