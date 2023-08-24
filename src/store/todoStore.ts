import { TodoType } from "@/types/todo";
import { createZustandStore } from "./middleware";

type TodoStore = {
  todos: TodoType[];
  filteredTodos: TodoType[];
};

type StoreActions = {
  actions: {
    setTodos: (todos: TodoType[]) => void;
    setSearchKeyword: (keyword: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

const useTodoStore = createZustandStore<TodoStore & StoreActions>((set) => ({
  todos: [],
  filteredTodos: [],
  actions: {
    setTodos(todos) {
      set({ todos: todos, filteredTodos: todos });
    },
    setSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
      const keyword = event.target.value;
      if (keyword === "") {
        set((state) => ({ filteredTodos: state.todos }));
      } else {
        set((state) => ({
          filteredTodos: state.todos.filter(
            (todo) => todo.title.toLowerCase().includes(keyword.toLowerCase()) || todo.content.toLowerCase().includes(keyword.toLowerCase())
          ),
        }));
      }
    },
  },
}));

export default useTodoStore;
