import { createMemo, Index, ParentProps, Show } from "solid-js";
import { TableRow } from "./table-row";
import { TableProps } from "./types";
import {
  TableFeatureContextProvider,
  TableRowContextProvider,
} from "./providers";
import { calcIndex } from "@src/utils";

export const Table = <T extends {}>(props: ParentProps<TableProps<T>>) => {
  const datas = createMemo(() => {
    return props.datas ?? [];
  });

  const features = createMemo(() =>
    (props.features ?? []).reduce((p, c) => {
      p = p || {};
      p[c.name] = c;
      return p;
    }, {} as { [key: string]: any })
  );

  return (
    <TableFeatureContextProvider features={features()}>
      <table class={props.class}>
        <thead>
          <TableRowContextProvider type="head">
            {props.children}
          </TableRowContextProvider>
        </thead>
        <tbody>
          <Index each={datas()}>
            {(data, rowIndex) => (
              <TableRowContextProvider
                key={calcIndex(data(), rowIndex, props.key)}
                index={rowIndex}
                data={data()}
                type="cell"
              >
                {props.children}
              </TableRowContextProvider>
            )}
          </Index>
        </tbody>
        <Show when={false}>
          <tfoot>
            <TableRowContextProvider type="foot">
              {props.children}
            </TableRowContextProvider>
          </tfoot>
        </Show>
      </table>
    </TableFeatureContextProvider>
  );
};
