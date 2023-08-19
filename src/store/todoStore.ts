import { Todo } from "@/pages/api/todoList";
import { createZustandStore } from "./middleware";

type TodoStore = {
  todos: Todo[];
};

type StoreActions = {
  actions: {
    setTodos: (todos: Todo[]) => void;
  };
};

const useTodoStore = createZustandStore<TodoStore & StoreActions>((set) => ({
  todos: [],
  actions: {
    setTodos(todos) {
      set({ todos: todos });
    },
  },
}));

export default useTodoStore;
