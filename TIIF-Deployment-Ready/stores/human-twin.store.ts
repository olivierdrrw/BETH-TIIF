import { create } from "zustand";

interface State {
  data: any;

  setData: (d: any) => void;
}

export const useHumanTwinStore =
create<State>((set)=>({

data:null,

setData:(data)=>set({data})

}));