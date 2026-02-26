import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

type UsePageAuthType = {
    auth: {
        permissions: string[];
    };
};

function MyButtonContainerForCreateButton({
    permission = '',
    children,
}: {
    permission: string;
    children: ReactNode;
}) {
    const { auth } = usePage<UsePageAuthType>().props;
    return (
        <>
            {auth.permissions.includes(permission) && (
                <div className="my-8 flex w-full items-center justify-end">
                    {children}
                </div>
            )}
        </>
    );
}

export default MyButtonContainerForCreateButton;
