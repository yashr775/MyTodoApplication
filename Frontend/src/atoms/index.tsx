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

export const updateModelHandler = atom<boolean>({
  key: "updateValue",
  default: false,
});

export const setTodoToUpdate = atom<todolist>({
  key: "propValue",
  default: {
    id: 0,
    title: "",
    subject: "",
    description: "",
  },
});
