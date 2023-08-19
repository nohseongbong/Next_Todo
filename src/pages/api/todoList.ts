import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export type Todo = {
  todoId: string;
  title: string;
  content: string;
  state: "complete" | "incomplete";
  date: Date;
};

export interface TodoListResType {
  todos: Todo[];
}

const todoList = (req: NextApiRequest, res: NextApiResponse<TodoListResType>) => {
  const createRandomUser = (): Todo => {
    const todo: Todo = {
      todoId: faker.string.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.text(),
      state: "incomplete",
      date: faker.date.birthdate(),
    };
    return todo;
  };

  const TODOS: Todo[] = faker.helpers.multiple(createRandomUser, {
    count: 30,
  });
  const data = {
    todos: TODOS,
  };
  res.status(200).json(data);
};

export default todoList;
