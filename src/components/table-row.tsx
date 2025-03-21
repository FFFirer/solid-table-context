import {
  createMemo,
  ParentProps,
} from "solid-js";
import { TableRowContext, TableRowProps } from "./types";

export const TableRow = (props: ParentProps<TableRowProps>) => {
  const rowContextValue = createMemo(() => {
    return {
      data: props.data,
      index: props.index,
      type: props.type,
    };
  });

  const columns = createMemo(() => props.columns ?? []);

  return (
    <tr>
      <TableRowContext.Provider value={rowContextValue()}>
        {props.children}
      </TableRowContext.Provider>
    </tr>
  );
};
