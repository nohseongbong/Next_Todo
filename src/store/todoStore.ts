import { createZustandStore } from "./middleware";

type TodoStore = {};

type StoreActions = {};

const useTodoStore = createZustandStore<TodoStore & StoreActions>((set) => ({}));

export default useTodoStore;
