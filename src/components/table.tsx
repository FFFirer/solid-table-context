import { createMemo, Index, ParentProps, Show } from "solid-js";
import { TableRow } from "./table-row";
import { TableProps } from "./types";
import {
  TableFeatureContextProvider,
  TableRowContextProvider,
} from "./providers";
import { calcIndex } from "@src/utils";
import { Dynamic } from "solid-js/web";

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

  const hasDatas = createMemo(
    () => datas() !== undefined && datas().length > 0
  );

  const tableRowTemplate = createMemo(() => props.rowTemplate ?? TableRow);

  return (
    <TableFeatureContextProvider features={features()}>
      <table class={props.class}>
        <thead>
          <TableRowContextProvider type="head" index={-1}>
            {props.children}
          </TableRowContextProvider>
        </thead>
        <tbody>
          <Show
            when={hasDatas()}
            fallback={
              <TableRowContextProvider type="empty" index={-2}>
                <Dynamic
                  component={tableRowTemplate()}
                  emptyContent={props.emptyContent}
                >
                  {props.children}
                </Dynamic>
              </TableRowContextProvider>
            }
          >
            <Index each={datas()}>
              {(data, rowIndex) => (
                <TableRowContextProvider
                  key={calcIndex(data(), rowIndex, props.key)}
                  index={rowIndex}
                  data={data()}
                  type="cell"
                >
                  <Dynamic component={tableRowTemplate()}>
                    {props.children}
                  </Dynamic>
                </TableRowContextProvider>
              )}
            </Index>
          </Show>
        </tbody>
        <Show when={datas.length > 0 && props.showFooter}>
          <tfoot>
            <TableRowContextProvider type="foot" index={-3}>
              <Dynamic component={tableRowTemplate()}>{props.children}</Dynamic>
            </TableRowContextProvider>
          </tfoot>
        </Show>
      </table>
    </TableFeatureContextProvider>
  );
};
