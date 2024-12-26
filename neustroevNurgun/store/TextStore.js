import { createContext, useContext } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

const Context = createContext(null);

export const TextStoreProvider = observer(({ children, ...props }) => {
  const store = useLocalObservable(() => createTextStore(props));
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useTextStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error("Используйте TextStore внутри провайдера!");
  return store;
};

export const createTextStore = (props) => {
  return {
    text: "",
    setText(newText) {
      this.text = newText;
    },
  };
};
