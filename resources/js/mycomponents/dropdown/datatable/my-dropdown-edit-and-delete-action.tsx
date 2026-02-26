import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { usePage } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { ReactNode } from 'react';

type PropsType = {
    state: FormStateHookReturnType;
    rowOriginalObject: Record<string, unknown>;
    controllerUrlUpdate: string;
    controllerUrlDestroy: string;
    identityName: string;
    identityValue: string | number;
    permissionEdit: string;
    permissionDelete: string;
    children?: ReactNode;
};

function MyDropdownEditAndDeleteAction({
    state,
    rowOriginalObject,
    controllerUrlUpdate,
    controllerUrlDestroy,
    identityName = 'id',
    identityValue,
    permissionEdit = '',
    permissionDelete = '',
    children,
}: PropsType) {
    const { auth } = usePage<UsePageAuthType>().props;
    return (
        (auth.permissions.includes(permissionEdit) ||
            auth.permissions.includes(permissionDelete)) && (
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {children}
                        {auth.permissions.includes(permissionEdit) && (
                            <DropdownMenuItem
                                onClick={() => {
                                    state.editRecord({
                                        url: controllerUrlUpdate,
                                        rowOriginalObject: rowOriginalObject,
                                        identityName: identityName,
                                        identityValue: identityValue,
                                        modalTitle: 'Edit',
                                        modalDescription:
                                            'Please change details below to update',
                                        successMessage: 'Updated Successfully',
                                    });
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                        )}
                        {auth.permissions.includes(permissionDelete) && (
                            <DropdownMenuItem
                                className="dropdown-delete-button"
                                onClick={() =>
                                    state.deleteRecord({
                                        url: controllerUrlDestroy,
                                        identityValue: identityValue,
                                        identityName: identityName,
                                        modalTitle: 'Confirm Delete',
                                        modalDescription:
                                            'Are you sure you want to delete ?',
                                        successMessage: 'Deleted Successfully',
                                    })
                                }
                            >
                                Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    );
}

export default MyDropdownEditAndDeleteAction;
