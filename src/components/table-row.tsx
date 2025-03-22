import {
  createMemo,
  Match,
  mergeProps,
  ParentProps,
  Show,
  Switch,
} from "solid-js";
import {
  TableRowTemplate,
  TableRowContext,
  TableRowContextProps,
  TableRowProps,
  useTableRowContext,
} from "./types";
import { mergeClass } from "@src/utils";

const defaultProps: Partial<TableRowProps> = {
  activeClass: "active",
};

const EmptyContent = (props: ParentProps<{ cols: number }>) => {
  return (
    <tr>
      <td colSpan={props.cols}>{props.children ?? "No more data."}</td>
    </tr>
  );
};

export const TableRow : TableRowTemplate = (p) => {
  const props = mergeProps(defaultProps, p);

  const context = useTableRowContext();
  
  const colspan = createMemo(() => {
    if (Array.isArray(props.children)) {
      return props.children.length;
    }
    return 1;
  });

  const getActiveClass = () =>
    props.activeClass && context?.active?.() ? props.activeClass : "";

  const classNames = createMemo(() => {
    switch (context?.type) {
      case "head":
        return mergeClass(props.class, props.headClass, getActiveClass());
      case "cell":
        return mergeClass(props.class, props.cellClass, getActiveClass());
      case "foot":
        return mergeClass(props.class, getActiveClass());
      default:
        return mergeClass(props.class, getActiveClass());
    }
  });

  const handleClick = (e: MouseEvent) => {
    props.onClick?.(context as TableRowContextProps);
  };

  return (
    <Show
      when={context?.type !== "empty"}
      fallback={
        <EmptyContent cols={colspan()}>{props.emptyContent}</EmptyContent>
      }
    >
      <tr class={classNames()} onClick={handleClick}>
        {props.children}
      </tr>
    </Show>
  );
};
