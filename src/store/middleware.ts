import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const createZustandStore = <T>(store: StateCreator<T>) =>
  process.env.NODE_ENV === "development" ? create(devtools(store)) : create(store);
