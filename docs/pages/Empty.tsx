import {
  CheckboxColumn,
  createMultiSelectFeature,
  IndexColumn,
  Table,
  TableColumn,
  TableRow,
} from "@src/index";
import { createMemo } from "solid-js";

export default () => {
  const selectState = createMemo(() => createMultiSelectFeature([]));

  return (
    <div class="overflow-auto">
      <Table
        rowClass="hover:bg-base-300"
        class="h-[200px] table table-zebra table-pin-rows table-pin-cols grow"
        datas={[]}
      >
        <TableRow
          emptyContent={
            <div class="bg-base-300 size-full flex items-center justify-center">Empty</div>
          }
        >
          <IndexColumn as={"th"} class="w-[10px] font-bold" />
          <CheckboxColumn class="checkbox" state={selectState()} />
          <TableColumn name={"id"} />
          <TableColumn name={"name"} />
          <TableColumn name={"deleted"}>
            {(data) => (data.deleted ? "YES" : "NO")}
          </TableColumn>
        </TableRow>
      </Table>
    </div>
  );
};
