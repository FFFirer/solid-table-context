import { createContext, JSXElement, useContext } from "solid-js";

export type TableColumnType = 'index' | 'selection' | undefined
export type TableRowType = 'head' | 'cell'
// export type ClassListType = string | { [key: string]: boolean } | ClassListType[]
export type ClassListType = string

export interface TableColumnDefinition<T> {
    name?: keyof T;
    type?: string;
    header?: JSXElement | ((col: TableColumnDefinition<T>) => JSXElement);
    headerClass?: ClassListType;
    children?: (
        data: T,
        col: TableColumnDefinition<T>,
        rowIndex?: number
    ) => JSXElement;
    class?: ClassListType
    footer?: JSXElement | ((datas: T[], name: string) => JSXElement)
}

export interface TableColumnProps<T> extends TableColumnDefinition<T> {
}

export interface TableRowProps {
    data?: any;
    index?: number;
    columns?: TableColumnProps<any>[];
    type?: TableRowType
}

export interface TableRowContextProps {
    data?: any;
    index?: number;
    type?: TableRowType
}

export interface TableProps<T extends {}> {
    datas?: T[]
    columns?: TableColumnDefinition<T>[]
}

export const TableRowContext = createContext<TableRowContextProps>();
export const useTableRowContext = () => useContext(TableRowContext);