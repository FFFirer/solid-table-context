import { createMemo, Index, ParentProps } from "solid-js";
import { TableRow } from "./table-row";
import { TableProps } from "./types";

export const Table = <T extends {} = any>(
  props: ParentProps<TableProps<T>>
) => {
  const datas = createMemo(() => {
    return props.datas ?? [];
  });

  return (
    <table class="table">
      <thead>
        <TableRow index={0} type={"head"}>
          {props.children}
        </TableRow>
      </thead>
      <tbody>
        <Index each={datas()}>
          {(data, rowIndex) => (
            <TableRow index={rowIndex} data={data()} type="cell">
              {props.children}
            </TableRow>
          )}
        </Index>
      </tbody>
    </table>
  );
};
