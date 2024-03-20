import { create } from 'zustand';

export type Bears = {
  id: number;
  name: string;
};
interface BearStore {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bears[];

  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearStore>()((set ,get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{ id: 1, name: 'black' }],

  computed: {
    
    get totalBears(): number {
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    }

  },

  increaseBlackBears: (by: number) => set(state => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set(state => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set(state => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set(state => ({ bears: [...state.bears] })), // va ser un nuevo estado igual al anterior
  addBear: () =>
    set(state => ({
      bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
    })),
  clearBears: () => set({ bears: [] })
}));
