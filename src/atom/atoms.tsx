import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist({
  key: 'toDoAtom',
  storage : localStorage
})

export const toDoState = atom<ITodoState>({
  key: "toDoState",
  default: {
    "To Do": [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom]
});

