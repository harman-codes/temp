import {
    destroy,
    getUsers,
    update,
} from '@/actions/App/Http/Controllers/UserController';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { PencilIcon, Trash2Icon, TrashIcon } from 'lucide-react';

function IndexCopy() {
    const queryClient = useQueryClient();
    // console.log(queryClient.getQueryData(['users']));

    // Get data of users from controller
    const { data, isLoading } = useQuery({
        queryKey: ['userskey'],
        queryFn: () => axios.get(getUsers().url).then((res) => res.data),
        staleTime: 1000 * 60 * 5,
        // staleTime: 0,
        // gcTime: 0,
    });

    // Delete a user
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(destroy(id).url);
            return response.data;
        },
        onMutate: () => {
            console.log('Deleting user');
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                toast.error(error.response.data.message);
                return;
            }

            toast.error(error.message);
            console.log(error);
        },
        onSuccess: () => {
            toast.success('User deleted successfully');
            console.log('User deleted successfully');
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['userskey'],
            });
        },
    });

    // Edit a user
    const editMutation = useMutation({
        mutationFn: (data: any) =>
            axios.put(update(data.id).url, data).then((res) => res?.data),
        onMutate: async (newUserData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['userskey'] });

            // Snapshot the previous value
            const previousUsers = queryClient.getQueryData(['userskey']);

            // Optimistically update to the new value
            queryClient.setQueryData(['userskey'], (old: any) => {
                console.log(old);
                if (!old) return old;
                return {
                    ...old,
                    users: old.users.map((oldUser: any) =>
                        oldUser.id === newUserData.id
                            ? { ...oldUser, ...newUserData }
                            : oldUser,
                    ),
                };
            });

            // Return a context object with the snapshotted value
            return { previousUsers };
        },
        onError: (err, newUserData, context: any) => {
            // Roll back to the previous value
            if (context?.previousUsers) {
                queryClient.setQueryData(['userskey'], context.previousUsers);
            }
            toast.error('Error: Unauthorized Access');
            console.log('Error editing user', err);
        },
        onSuccess: () => {
            toast.success('User updated successfully');
        },
        onSettled: () => {
            // Always refetch after error or success:
            queryClient.invalidateQueries({ queryKey: ['userskey'] });
        },
    });

    const handleEdit = (userId: string, oldName: string) => {
        const promptName = prompt('Please enter your name:', oldName);
        if (promptName !== '' && promptName !== null) {
            editMutation.mutate({ id: userId, name: promptName });
        }
    };

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.users?.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button
                                    className="cursor-pointer"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                        handleEdit(user.id, user.name)
                                    }
                                >
                                    <PencilIcon />
                                </Button>
                                <Button
                                    className="cursor-pointer"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <Trash2Icon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

IndexCopy.layout = (page: ReactNode) => (
    <AppSidebarLayout>{page}</AppSidebarLayout>
);

export default IndexCopy;
