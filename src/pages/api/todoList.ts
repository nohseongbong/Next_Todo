import { TodoType } from "@/types/todo";
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export interface TodoListResType {
  todos: TodoType[];
}

const todoList = (req: NextApiRequest, res: NextApiResponse<TodoListResType>) => {
  const createRandomUser = (): TodoType => {
    const todo: TodoType = {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.text(),
    };
    return todo;
  };

  const TODOS: TodoType[] = faker.helpers.multiple(createRandomUser, {
    count: 30,
  });
  const data = {
    todos: TODOS,
  };
  res.status(200).json(data);
};

export default todoList;
