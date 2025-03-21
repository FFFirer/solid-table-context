import {
  CheckboxColumn,
  createIndexData,
  createIndexed,
  createMultiSelectFeature,
  IndexColumn,
} from "@src/components/columns";
import { Table } from "@src/components/table";
import { TableColumn } from "@src/components/table-column";
import { TableColumnDefinition } from "@src/components/types";
import { TableRow } from "@src/index";
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

  return (
    <div class="w-[200px] h-[200px] overflow-auto">
      <Table
        rowClass="hover:bg-base-300"
        class="table table-zebra table-pin-rows table-pin-cols"
        datas={datas()}
      >
        <TableRow>
          <IndexColumn as={"th"} class="w-[10px] font-bold" />
          <CheckboxColumn class="checkbox" feature={multiSelect()} />
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
