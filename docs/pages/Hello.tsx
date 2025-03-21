import { Table } from "@src/components/table";
import { TableColumn } from "@src/components/table-column";
import { TableColumnDefinition } from "@src/components/types";
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

  return (
    <div class="size-full">
      {/* <Table columns={columns()} datas={datas()} /> */}
      <Table datas={datas()}>
        <TableColumn name={"id"} />
        <TableColumn name={"name"} />
        <TableColumn name={"deleted"}/>
      </Table>
    </div>
  );
};
