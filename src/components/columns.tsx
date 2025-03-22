import {
  Accessor,
  createMemo,
  createSignal,
  JSX,
  mergeProps,
  Setter,
  splitProps,
} from "solid-js";
import { TableColumn } from "./table-column";
import { IndexColumnProps, KeySelector, TableColumnProps } from "./types";
import { calcIndex, createIndexData, createIndexed } from "@src/utils";

export const IndexColumn = (props: IndexColumnProps) => {
  const [local, others] = splitProps(props, ["children"]);

  const merged = mergeProps(others, {
    type: "index",
    children: (data: any, col: any, index?: number) =>
      local.children?.(index) ?? (index || 0) + 1,
  });

  return <TableColumn {...merged} header={' '} />;
};

export interface IMultiSelectFeature<T> {
  selected?: Accessor<T[]>;
  selectedAll?: Accessor<boolean>;
  setSelected?: Setter<T[]>;
  checkSelected?: (data: T, index: number) => boolean;
  clearSelected?: () => void;
  onSelected?: (data: T, index: number, checked: boolean) => void;
  onSelectedAll?: (checked: boolean) => void;
}

export const createMultiSelectFeature = <T extends {} = any>(
  datas?: T[],
  initialState?: (data: T) => boolean,
  key?: KeySelector<T>
) => {
  const [_selected, setSelected] = createSignal(
    createIndexed(datas ?? []).filter((x) => initialState?.(x.data) ?? false)
  );

  const selected = () => _selected().map((x) => x.data);

  const indexes = createMemo(() => {
    return _selected().reduce((p, c, i) => {
      p = p || {};
      p[calcIndex(c.data, c.index, key)] = c;
      return p;
    }, {} as { [key: string]: T });
  });

  const checkSelected = (data: T, index: number) => {
    return indexes()[calcIndex(data, index, key)] !== undefined;
  };

  const clearSelected = () => setSelected([]);

  const onSelectedAll = (checked: boolean) => {
    if (checked) {
      setSelected((v) => createIndexed(datas ?? []));
    } else {
      clearSelected();
    }
  };

  const onSelected = (data: T, index: number, checked: boolean) => {
    if (checked) {
      if (checkSelected(data, index)) {
        return;
      }

      setSelected((v) => [...v, createIndexData(data, index)]);
    } else {
      setSelected((v) =>
        v.filter(
          (x) => calcIndex(x.data, x.index, key) !== calcIndex(data, index, key)
        )
      );
    }
  };

  const selectedAll = createMemo(
    () => datas?.length === selected().length && selected().length > 0
  );

  return {
    selected,
    selectedAll,
    onSelected,
    onSelectedAll,
    checkSelected,
    clearSelected,
  } as IMultiSelectFeature<T>;
};

export const CheckboxColumn = <T extends {} = any>(
  props: {
    state: IMultiSelectFeature<T>;
    inputClass?: string;
    inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
  } & Pick<TableColumnProps<T>, "class" | "cellClass" | "headerClass" | "as">
) => {
  const [local, others] = splitProps(props, [
    "state",
    "inputClass",
    "inputProps",
  ]);

  return (
    <TableColumn
      header={() => (
        <input
          title="Select All"
          type="checkbox"
          class={local.inputClass}
          checked={local.state.selectedAll?.()}
          onchange={(e) => local.state.onSelectedAll?.(e.target.checked)}
          {...local.inputProps}
        ></input>
      )}
      {...others}
    >
      {(data, col, index) => (
        <input
          type="checkbox"
          class={local.inputClass}
          checked={local.state.checkSelected?.(data, index!)}
          onchange={(e) =>
            local.state.onSelected?.(data, index, e.target.checked)
          }
          {...local.inputProps}
        ></input>
      )}
    </TableColumn>
  );
};
