import type { SubmitEvent } from 'react';

export type TQmodeType = 'create' | 'update' | 'delete' | 'post' | null;

export type TQPropsType = {
    query: {
        url: string;
        queryKey: string[] | number[] | unknown[];
        options?: {
            [key: string]: unknown;
        };
    };
};

export type TQReturnType<
    TDataType = Record<string, Record<string, unknown>[]>,
> = {
    query: {
        data: TDataType | undefined;
        isPending: boolean;
        isError: boolean;
        isSuccess: boolean;
        isFetching: boolean;
        error: Error | null;
    };
    mutation: {
        isPending: boolean;
        isError: boolean;
        isSuccess: boolean;
        error: Error | null;
        data: TDataType | undefined;
    };
    mode: TQmodeType;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    modalTitle: string;
    modalDescription: string;
    deleteRecord: ({
        url,
        dataKey,
        modalTitle,
        modalDescription,
    }: {
        url: string;
        dataKey: string;
        modalTitle?: string;
        modalDescription?: string;
    }) => void;
    confirmDelete: () => void;
    onSubmit: (event: SubmitEvent) => void;
    createRecord: ({
        url,
        dataKey,
        modalTitle,
        modalDescription,
    }: {
        url: string;
        dataKey: string;
        modalTitle?: string;
        modalDescription?: string;
    }) => void;
    updateRecord: ({
        url,
        id,
        dataKey,
        modalTitle,
        modalDescription,
    }: {
        url: string;
        id: number | string;
        dataKey: string;
        modalTitle?: string;
        modalDescription?: string;
    }) => void;
    reset: () => void;
};
