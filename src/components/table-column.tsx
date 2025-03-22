import {
  children,
  ComponentProps,
  createMemo,
  JSXElement,
  mergeProps,
  ParentComponent,
  splitProps,
  ValidComponent,
} from "solid-js";
import {
  IndexColumnProps,
  TableColumnProps,
  TableColumnType,
  useTableRowContext,
} from "./types";
import { Dynamic } from "solid-js/web";
import { mergeClass } from "@src/utils";

const TableCell = (
  props: { children?: JSXElement; class?: string } & { as: ValidComponent }
) => {
  const [local, others] = splitProps(props, ["as"]);
  return <Dynamic component={local.as} {...others}></Dynamic>;
};

export const TableColumn = <T extends {} = any>(props: TableColumnProps<T>) => {
  const rowContext = useTableRowContext();

  const cellComponent = createMemo(() => props.as ?? "td");

  const children = createMemo(() => {
    switch (rowContext?.type) {
      case "head":
        return typeof props.header === "function"
          ? props.header?.(props)
          : props.header ?? props.name;
      case "cell":
        return props.children === undefined
          ? rowContext?.data?.[props.name]
          : props.children?.(rowContext?.data, props, rowContext?.index!);
      case "foot":
        return typeof props.footer === "function"
          ? props.footer?.([], rowContext.data)
          : props.footer;
      default:
        return undefined;
    }

    // return rowContext?.type === "head"
    //   ? typeof props.header === "function"
    //     ? props.header?.(props)
    //     : props.header ?? props.name
    //   : props.children === undefined
    //   ? rowContext?.data?.[props.name]
    //   : props.children?.(rowContext?.data, props, rowContext?.index!);
  });

  const classNames = createMemo(() => {
    return rowContext?.type === "head"
      ? mergeClass(props.headerClass, props.class)
      : mergeClass(props.cellClass, props.class);
  });

  return (
    <TableCell as={cellComponent()} class={classNames()}>
      {children()}
    </TableCell>
  );
};
