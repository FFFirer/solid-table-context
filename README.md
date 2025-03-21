# Features

1. simple to use
2. use `Context` to transfer state/value
3. custom column template
4. feature extensions

# Installation

```bash
pnpm create solid@latest

pnpm add solid-table-context
```

# Usage

> No class used.

```ts
// use tailwindcss/daisyui
// ./docs/pages/Hello.tsx

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

  // 提供多选框选择数据交互
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
        <TableRow>
          <IndexColumn as={"th"} class="w-[10px] font-bold" />
          <CheckboxColumn class="checkbox" state={multiSelect()} />
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
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)
