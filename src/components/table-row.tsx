import { createMemo, mergeProps, ParentProps } from "solid-js";
import {
  TableRowContext,
  TableRowContextProps,
  TableRowProps,
  useTableRowContext,
} from "./types";
import { mergeClass } from "@src/utils";

const defaultProps: Partial<TableRowProps> = {
  activeClass: "active",
};

export const TableRow = (p: ParentProps<TableRowProps>) => {
  const props = mergeProps(defaultProps, p);

  const context = useTableRowContext();

  const getActiveClass = () =>
    props.activeClass && context?.active?.() ? props.activeClass : "";

  const classNames = createMemo(() => {
    return context?.type === "head"
      ? mergeClass(props.class, props.headClass, getActiveClass())
      : mergeClass(props.class, props.headClass, getActiveClass());
  });

  const handleClick = (e: MouseEvent) => {
    props.onClick?.(context as TableRowContextProps);
  };

  return (
    <tr class={classNames()} onClick={handleClick}>
      {props.children}
    </tr>
  );
};
