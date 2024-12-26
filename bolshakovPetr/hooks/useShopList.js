import { create } from "zustand";

export const useShopList = create((set) => ({
  goods: [],
  addProduct: (name) =>
    set((state) => ({
      goods: [...state.goods, { id: Date.now(), name, completed: false }],
    })),
  deleteProduct: (id) =>
    set((state) => ({
      goods: state.goods.filter((task) => prod.id !== id),
    })),
  toggleProductStatus: (id) =>
    set((state) => ({
      goods: state.goods.map((prod) =>
        prod.id === id ? { ...prod, completed: !prod.completed } : prod
      ),
    })),
}));