import { createMemo, createSignal, ParentProps, splitProps } from "solid-js";
import {
  RowContextStateKeys,
  TableFeatureContextProviderProps,
  TableFeaturesContext,
  TableRowContext,
  TableRowContextProps,
  TableRowContextProviderProps,
} from "./types";
import { createStore } from "solid-js/store";

const getKey = (data: any, index?: number) => index!;

export const TableRowContextProvider = (
  props: ParentProps<TableRowContextProviderProps>
) => {
  const [active, setActive] = createSignal(false);

  const [state, setState] = createStore({
    [RowContextStateKeys.Key]: props.key,
  });

  const [local, others] = splitProps(props, ["children"]);

  const rowContextValue = createMemo(() => {
    return {
      data: props.data,
      index: props.index,
      type: props.type,
      active,
      setActive,
      state,
      setState,
    };
  });
  return (
    <TableRowContext.Provider value={rowContextValue()}>
      {local.children}
    </TableRowContext.Provider>
  );
};

export const TableFeatureContextProvider = (
  props: ParentProps<TableFeatureContextProviderProps>
) => {
  const getFeature = <T = any>(name: string) => props.features?.[name];

  return (
    <TableFeaturesContext.Provider value={{ getFeature }}>
      {props.children}
    </TableFeaturesContext.Provider>
  );
};
