import { Accessor, createContext, createMemo, JSXElement, ParentProps, Setter, useContext, ValidComponent } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

export type TableColumnType = 'index' | 'selection' | undefined
export type TableRowType = 'head' | 'cell' | 'foot'
// export type ClassListType = string | { [key: string]: boolean } | ClassListType[]
export type ClassListType = string

export interface TableColumnDefinition<T> {
    name?: keyof T;
    type?: string;
    header?: JSXElement | ((col: TableColumnDefinition<T>) => JSXElement);
    children?: (
        data: T,
        col: TableColumnDefinition<T>,
        rowIndex: number
    ) => JSXElement;
    class?: ClassListType
    headerClass?: ClassListType
    cellClass?: ClassListType
    footer?: JSXElement | ((datas: T[], name: string) => JSXElement)
}

export interface TableColumnProps<T> extends TableColumnDefinition<T> {
    as?: ValidComponent
}

export interface IndexColumnProps extends Omit<TableColumnProps<any>, 'type' | 'name' | 'children' | 'footer'> {
    children?: (index?: number) => JSXElement
}

export interface TableRowProps {
    // data?: any;
    // index?: number;
    // type?: TableRowType
    onClick?: (ctx: TableRowContextProps) => void
    class?: string
    headClass?: string
    cellClass?: string
    activeClass?: string
}

export interface TableRowContextProviderProps extends TableRowContextProps {
    key?: string
}

export type KeyValueCollection = { [key: string]: any } & {
    [RowContextStateKeys.Key]?: string
}

export interface TableRowContextProps {
    data?: any;
    key?: string;
    index?: number;
    type?: TableRowType;
    active?: Accessor<boolean>;
    setActive?: Setter<boolean>;
    state?: KeyValueCollection;
    setState?: SetStoreFunction<KeyValueCollection>;
}

export interface NamedFeature {
    name: string,
}

export type KeySelector<T> = string | ((data: T, index: number) => string)

export type IndexData<T> = T & {
    index: number,
    data: T
}

export interface TableProps<T extends {}> {
    datas?: T[]
    columns?: TableColumnDefinition<T>[]
    class?: string
    rowClass?: string
    headRowClass?: string
    key?: KeySelector<T>
    features?: NamedFeature[]
}

export const TableRowContext = createContext<TableRowContextProps>();
export const useTableRowContext = () => useContext(TableRowContext);

export interface TableFeatureContextProps {
    getFeature: <T>(name: string) => T
}
export interface TableFeatureContextProviderProps {
    features: {
        [key: string]: any
    }
}

export const TableFeaturesContext = createContext<TableFeatureContextProps>();
export const useTableFeatures = () => useContext(TableFeaturesContext);

export const RowContextStateKeys = {
    Key: "Key"
}