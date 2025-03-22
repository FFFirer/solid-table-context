import {
  CheckboxColumn,
  createMultiSelectFeature,
  IndexColumn,
} from "@src/components/columns";
import { Table } from "@src/components/table";
import { TableColumn } from "@src/components/table-column";
import { TableColumnDefinition } from "@src/components/types";
import { TableRow } from "@src/index";
import { createIndexed } from "@src/utils";
import { Accessor, createMemo } from "solid-js";

interface DemoData {
  id?: number;
  name?: string;
  deleted?: boolean;
}

const fakes: DemoData[] = [
  {
    id: 1,
    name: "Amy",
    deleted: false,
  },
  {
    id: 2,
    name: "Rory",
    deleted: false,
  },
  {
    id: 3,
    name: "Delark",
    deleted: true,
  },
  {
    id: 4,
    name: "CyberMen",
    deleted: true,
  },
  {
    id: 5,
    name: "The Docker",
    deleted: false,
  },
];

export default () => {
  const datas = createMemo(() => fakes);
  const columns = createMemo(() => {
    const cols: TableColumnDefinition<DemoData>[] = [
      {
        name: "id",
        header: "Id",
        children: (d, c, i) => <>{d?.[c.name!]}</>,
      },
      {
        name: "id",
        header: "Name",
        children: (d, c, i) => <>{d?.[c.name!]}</>,
      },
      {
        name: "deleted",
        header: "Deleted!",
        children: (d, c, i) => <>{d?.[c.name!]}</>,
      },
    ];

    return cols;
  });

  const multiSelect = createMemo(() =>
    createMultiSelectFeature(createIndexed(datas()))
  );

  const checkSelected = () => {
    console.log("selected count: ", multiSelect().selected?.().length);
  };

  return (
    <div class="size-full overflow-auto">
      <div class="mb-2">
        <button type="button" class="btn btn-primary" onClick={checkSelected}>
          check
        </button>
      </div>
      <Table
        rowClass="hover:bg-base-300"
        class="table table-zebra table-pin-rows table-pin-cols"
        datas={datas()}
      >
        <IndexColumn as={"th"} class="w-[10px] font-bold" />
        <CheckboxColumn
          class="w-[1rem]"
          inputClass="checkbox"
          state={multiSelect()}
        />
        <TableColumn name={"id"} />
        <TableColumn name={"name"} />
        <TableColumn name={"deleted"}>
          {(data) => (data.deleted ? "YES" : "NO")}
        </TableColumn>
      </Table>
    </div>
  );
};
