import { IndexData, KeySelector } from "@src/components/types";
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const mergeClass = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}

export const calcIndex = <T extends {}>(data: T, index: number, selector?: KeySelector<T>) => {
    if (selector) {
        if (typeof selector === "function") {
            return selector(data, index);
        }

        return (data as any)[selector];
    }

    return index.toString();
}


export const createIndexData = <T extends {}>(data: T, index: number) => {
    return {
        index,
        data,
    } as IndexData<T>;
};

export const createIndexed = <T extends {}>(datas: T[]) =>
    datas.map(createIndexData);