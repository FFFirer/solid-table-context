import {
  createMemo,
  JSXElement,
  ParentComponent,
  splitProps,
  ValidComponent,
} from "solid-js";
import { TableColumnProps, useTableRowContext } from "./types";
import { Dynamic } from "solid-js/web";

const TableCell = (
  props: { children?: JSXElement; class?: string } & { as: ValidComponent }
) => {
  const [local, others] = splitProps(props, ["as"]);
  return <Dynamic component={local.as} {...others}></Dynamic>;
};

export const TableColumn = <T extends {} = any>(props: TableColumnProps<T>) => {
  const rowContext = useTableRowContext();

  const cellComponent = createMemo(() =>
    rowContext?.type === "head" ? "th" : "td"
  );

  const children = createMemo(() => {
    return rowContext?.type === "head"
      ? typeof props.header === "function"
        ? props.header?.(props)
        : props.header
      : props.children === undefined
        ? rowContext?.data?.[props.name]
        : props.children?.(rowContext?.data, props, rowContext?.index);
  });

  const classNames = createMemo(() => {
    return rowContext?.type === "head" ? props.headerClass : props.class;
  });

  return (
    <TableCell as={cellComponent()} class={classNames()}>
      {children()}
    </TableCell>
  );
};
