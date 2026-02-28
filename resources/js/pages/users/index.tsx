import { PencilIcon, Trash2Icon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
    deleteDepartment,
    destroy,
    getUsers,
    store,
    update,
} from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { MyFormFieldInput } from '@/mycomponents/forms/fields/my-form-field-input';
import type {
    DepartmentType,
    UsersDataType,
    UserType,
} from '@/pages/users/types';
import TQForm from '@/tq/tq-form';
import useTQ from '@/tq/useTQ';
import DepartmentController from '@/actions/App/Http/Controllers/DepartmentController';

function Index() {
    const [defaultFormValue, setdefaultFormValue] = useState<
        UserType | undefined
    >(undefined);

    const { state } = useTQ<UsersDataType>({
        query: {
            url: getUsers().url,
            queryKey: ['users'],
        },
    });

    // console.log(state.mutation.error?.response?.data?.errors);
    // console.log(state.mutation.error?.response);

    // const handleCreate = () => {
    //     state.createRecord({ url: store().url, dataKey: 'users' });
    // };

    // const handleEdit = (user: UserType) => {
    //     state.updateRecord({
    //         url: update(user.id).url,
    //         id: user.id,
    //         dataKey: 'users',
    //     });
    // };

    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await axios.get(getUsers().url);
    //         console.log(response.data);
    //     };
    //     fetch();
    // }, []);

    if (state.query.isPending) return <div>Loading...</div>;

    return (
        <div>
            <div className="mx-2 mb-4 flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setdefaultFormValue(undefined);
                        state.createRecord({
                            url: store().url,
                            dataKey: 'users',
                            modalTitle: 'Create',
                            modalDescription: 'Create User',
                        });
                    }}
                >
                    Add User
                </Button>

                <Button
                    variant="outline"
                    onClick={() => {
                        state.createRecord({
                            url: store().url,
                            dataKey: 'users',
                            withoutForm: true,
                            data: {
                                name:
                                    'John Doe' +
                                    Math.round(Math.random() * 1000),
                                email:
                                    'john' +
                                    Math.round(Math.random() * 1000) +
                                    '@testtttt.com',
                                password: '1234',
                            },
                        });
                    }}
                >
                    Add without Form
                </Button>

                <Button
                    variant="default"
                    onClick={() => {
                        const id = prompt('Enter id');
                        state.updateRecord({
                            url: update(id || 99999).url,
                            dataKey: 'users',
                            id: id || 99999,
                            withoutForm: true,
                            data: {
                                name: 'u' + Math.round(Math.random() * 1000),
                                email:
                                    Math.round(Math.random() * 1000) +
                                    '@test.com',
                            },
                        });
                    }}
                >
                    Update without Form
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => {
                        state.post({
                            url: DepartmentController.update(53).url,
                            dataKey: 'departments',
                            data: {
                                name: 'u' + Math.round(Math.random() * 1000),
                                code:
                                    Math.round(Math.random() * 1000) +
                                    '@test.com',
                                _method: 'PUT',
                            },
                        });
                    }}
                >
                    Create with general post method
                </Button>
            </div>
            <TQForm formState={state}>
                <MyFormFieldInput
                    name={'name'}
                    label={'name'}
                    formState={state}
                    defaultValue={
                        defaultFormValue ? defaultFormValue?.name : undefined
                    }
                />
                <MyFormFieldInput
                    name={'email'}
                    label={'email'}
                    formState={state}
                    defaultValue={
                        defaultFormValue ? defaultFormValue?.email : undefined
                    }
                />
                {/* <input type="checkbox" name="is_active" />
                <input type="radio" name="gender" value="male" />
                <input type="radio" name="gender" value="female" />
                <input type="radio" name="gender" value="other" /> */}
                {state.mode === 'create' && (
                    <MyFormFieldInput
                        name={'password'}
                        label={'password'}
                        formState={state}
                    />
                )}
            </TQForm>
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
                    {state.query.data?.users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button
                                    className="cursor-pointer"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => {
                                        setdefaultFormValue(user);
                                        state.updateRecord({
                                            url: update(user.id).url,
                                            id: user.id,
                                            dataKey: 'users',
                                        });
                                    }}
                                >
                                    <PencilIcon />
                                </Button>
                                <Button
                                    type="button"
                                    className="cursor-pointer"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                        state.deleteRecord({
                                            url: destroy(user.id).url,
                                            id: user.id,
                                            dataKey: 'users',
                                            modalTitle: 'Delete User',
                                            modalDescription: `Are you sure you want to delete ${user.name}?`,
                                        })
                                    }
                                >
                                    <Trash2Icon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table className="mt-12 bg-gray-800">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {state.query.data?.departments?.map(
                        (department: DepartmentType) => (
                            <TableRow key={department.id}>
                                <TableCell>{department.id}</TableCell>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.code}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        className="cursor-pointer"
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => {
                                            setdefaultFormValue(department);
                                            state.updateRecord({
                                                url: DepartmentController.update(
                                                    department.id,
                                                ).url,
                                                id: department.id,
                                                dataKey: 'departments',
                                            });
                                        }}
                                    >
                                        <PencilIcon />
                                    </Button>
                                    <Button
                                        className="cursor-pointer"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                            state.deleteRecord({
                                                url: deleteDepartment(
                                                    department.id,
                                                ).url,
                                                id: department.id,
                                                dataKey: 'departments',
                                            })
                                        }
                                    >
                                        <Trash2Icon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

Index.layout = (page: ReactNode) => <AppSidebarLayout>{page}</AppSidebarLayout>;

export default Index;
