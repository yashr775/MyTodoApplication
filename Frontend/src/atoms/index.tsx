import { atom } from "recoil";

export const navIcon1 = atom<boolean>({
  key: "Icon1",
  default: false,
});

interface todolist {
  id: number;
  title: string;
  subject?: string;
  description: string;
}

export const TodoListState = atom<todolist[]>({
  key: "todoValue",
  default: [],
});
