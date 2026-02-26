import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { TQmodeType, TQPropsType } from '@/tq/tq-types';

function useTQ<TDataType = Record<string, Record<string, unknown>[]>>({
    query,
}: TQPropsType) {
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState(false);
    const [mode, setmode] = useState<TQmodeType>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [dataKey, setDataKey] = useState<string | undefined>(undefined);
    const [recordId, setRecordId] = useState<number | string | undefined>(
        undefined,
    );
    const [currentModalTitle, setCurrentModalTitle] = useState<string>('');
    const [currentModalDescription, setCurrentModalDescription] =
        useState<string>('');

    // Get Data from a url
    const { data, isPending, isError, isSuccess, isFetching, error } =
        useQuery<TDataType>({
            queryKey: [...query.queryKey],
            queryFn: async (): Promise<TDataType> => {
                const response = await axios.get(query.url);
                return response.data;
            },
            // enabled: !!query.url,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            ...query.options,
        });

    /******************************Mutation*******************************/
    const mutation = useMutation({
        mutationFn: async (variables: {
            url: string;
            data?: FormData | Record<string, unknown> | { id: number | string };
            mode: TQmodeType;
            id?: number | string;
            dataKey: string;
        }) => {
            const targetMode = variables.mode;
            if (targetMode === 'delete') {
                const response = await axios.delete(variables.url);
                return response.data;
            }

            if (targetMode === 'update') {
                if (variables.data instanceof FormData) {
                    variables.data.append('_method', 'PUT');
                }
                const response = await axios.post(
                    variables.url,
                    variables.data,
                );
                // const response = await axios.put(variables.url, variables.data);
                return response.data;
            }

            const response = await axios.post(variables.url, variables.data);
            return response.data;
        },
        onMutate: async (variables) => {
            const targetMode = variables.mode;
            if (!targetMode) return;

            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: [...query.queryKey],
            });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData([...query.queryKey]);

            // Handling Optimistic Update
            queryClient.setQueryData([...query.queryKey], (old: any) => {
                const dataKey = variables.dataKey;
                const id = variables.id;

                if (!old) return old;

                /*If mode is delete mode*/
                if (targetMode === 'delete') {
                    if (dataKey && old[dataKey]) {
                        return {
                            ...old,
                            [dataKey]: old[dataKey].filter(
                                (item: Record<string, unknown>) =>
                                    item.id !== id,
                            ),
                        };
                    }

                    //if array is simple array like [{id:1, name: something}, {id:2, name: otherwise}...]
                    if (Array.isArray(old)) {
                        return old.filter(
                            (item: Record<string, unknown>) => item.id !== id,
                        );
                    }

                    return old;
                }

                /*If mode is create or update*/

                // Transform FormData to object for optimistic update (Create/Update)
                const payloadObj: Record<string, unknown> = {};
                if (variables.data instanceof FormData) {
                    variables.data.forEach((value, key) => {
                        payloadObj[key] = value;
                    });
                } else if (
                    typeof variables.data === 'object' &&
                    variables.data !== null
                ) {
                    Object.assign(payloadObj, variables.data);
                }

                const isUpdate = targetMode === 'update';

                if (dataKey && old[dataKey]) {
                    const list = old[dataKey];
                    if (isUpdate) {
                        return {
                            ...old,
                            [dataKey]: list.map(
                                (item: Record<string, unknown>) =>
                                    item.id === id
                                        ? { ...item, ...payloadObj }
                                        : item,
                            ),
                        };
                    } else {
                        //It means mode is create
                        const newItem = {
                            id: Math.floor(Math.random() * 10000), // temporary ID
                            ...payloadObj,
                        };
                        return {
                            ...old,
                            [dataKey]: [...list, newItem],
                        };
                    }
                }

                //if array is simple array like [{id:1, name: something}, {id:2, name: otherwise}...]
                if (Array.isArray(old)) {
                    if (isUpdate) {
                        return old.map((item: Record<string, unknown>) =>
                            item.id === id ? { ...item, ...payloadObj } : item,
                        );
                    } else {
                        return [
                            ...old,
                            {
                                id: Math.floor(Math.random() * 10000),
                                ...payloadObj,
                            },
                        ];
                    }
                }

                return old;
            }); //setQueryData

            return { previousData };
        },
        onError: (error, variables, context) => {
            const targetMode = variables.mode;
            if (context?.previousData) {
                queryClient.setQueryData(
                    [...query.queryKey],
                    context.previousData,
                );
            }

            /*If we have error message from server, display it in a toast*/
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                toast.error(error.response.data.message);
                return;
            }
            toast.error(`Error: Failed to ${targetMode} record`);
        },
        onSuccess: (data, variables) => {
            const targetMode = variables.mode;
            const successMessage =
                data?.message ||
                (targetMode === 'delete'
                    ? 'Deleted successfully'
                    : `${targetMode === 'create' ? 'Created' : 'Updated'} successfully`);
            reset();
            toast.success(successMessage);
        },
        onSettled: (data) => {
            queryClient.invalidateQueries({
                queryKey: [...query.queryKey],
            });
        },
    });

    const reset = () => {
        setOpenModal(false);
        setUrl(null);
        setDataKey(undefined);
        setRecordId(undefined);
        setCurrentModalTitle('');
        setCurrentModalDescription('');
        setmode(null);
    };

    const deleteRecord = ({
        url,
        dataKey,
        modalTitle,
        modalDescription,
    }: {
        url: string;
        dataKey: string;
        modalTitle?: string;
        modalDescription?: string;
    }) => {
        setUrl(url);
        setDataKey(dataKey);
        setmode('delete');
        setCurrentModalTitle(modalTitle || 'Delete');
        setCurrentModalDescription(
            modalDescription || 'Are you sure you want to delete?',
        );
        setOpenModal(true);
    };

    const confirmDelete = () => {
        if (!url || !dataKey) {
            return;
        }
        mutation.mutate({
            url: url,
            dataKey: dataKey,
            mode: 'delete',
        });
    };

    const onSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        if (!mode || !url || !dataKey) {
            toast.error('Mode, url or dataKey is not defined');
            return;
        }

        mutation.mutate({
            url: url,
            id: recordId,
            mode: mode,
            dataKey: dataKey,
            data: new FormData(event.target as HTMLFormElement),
        });
    };

    const createRecord = ({
        url,
        dataKey,
        modalTitle,
        modalDescription,
    }: {
        url: string;
        dataKey: string;
        modalTitle?: string;
        modalDescription?: string;
    }) => {
        setUrl(url);
        setDataKey(dataKey);
        setRecordId(undefined);
        setmode('create');
        setCurrentModalTitle(modalTitle || 'Create');
        setCurrentModalDescription(
            modalDescription || 'Enter the details below.',
        );
        setOpenModal(true);
    };

    const updateRecord = ({
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
    }) => {
        setUrl(url);
        setRecordId(id);
        setDataKey(dataKey);
        setmode('update');
        setCurrentModalTitle(modalTitle || 'Update');
        setCurrentModalDescription(
            modalDescription || 'Change the details below to update.',
        );
        setOpenModal(true);
    };

    return {
        state: {
            query: {
                data: data,
                isPending: isPending,
                isError: isError,
                isSuccess: isSuccess,
                isFetching: isFetching,
                error: error,
            },
            mutation: {
                isPending: mutation.isPending,
                isError: mutation.isError,
                isSuccess: mutation.isSuccess,
                error: mutation.error,
                data: mutation.data,
            },
            mode,
            openModal,
            setOpenModal,
            modalTitle: currentModalTitle,
            modalDescription: currentModalDescription,
            deleteRecord,
            confirmDelete,
            onSubmit,
            createRecord,
            updateRecord,
            reset,
        },
    };
}

export default useTQ;
