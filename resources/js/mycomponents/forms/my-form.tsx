import { Form, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyDialogForForm from '@/mycomponents/forms/my-dialog-for-form';
import MyDrawerForForm from '@/mycomponents/forms/my-drawer-for-form';
import MySheetForForm from '@/mycomponents/forms/my-sheet-for-form';
import type { FormStateHookReturnType } from '@/myhooks/useFormStateHook';

interface PropType {
    formState: FormStateHookReturnType;
    variant?: 'dialog' | 'sheet' | 'drawer';
    direction?: 'left' | 'right' | 'top' | 'bottom';
    partialLoadingOnlyArray?: string[];
    sheetWidth?: 'full' | 'three-quarter' | 'half' | 'quarter';
    closeOnFormSuccess?: boolean;
    children: ReactNode;
}

export function MyForm({
    formState: state,
    variant = 'dialog',
    direction = 'right',
    partialLoadingOnlyArray = [],
    sheetWidth,
    closeOnFormSuccess = true,
    children,
}: PropType) {
    const {
        flash,
    }: { flash: { toast?: { type: 'success' | 'error'; message?: string } } } =
        usePage();
    const [isDisplaySuccessToast, setIsDisplaySuccessToast] = useState(false);

    useEffect(() => {
        // When no explicit success message is provided from a method in the controller, on successful request , we get type=success in flash. So, treat it accordingly.
        if (
            flash.toast &&
            flash.toast.type === 'success' &&
            isDisplaySuccessToast
        ) {
            toast.success(flash.toast.message ?? state.successMessage);
        }
        return () => {
            setIsDisplaySuccessToast(false);
        };
    }, [flash.toast, state.successMessage, isDisplaySuccessToast]);

    /*Always open dialog for delete*/
    if (state.method === 'delete') {
        variant = 'dialog';
    }

    const handleError = (e: Record<string, string>) => {
        state.setProcessing(false);
        state.setWasSuccessful(false);
        state.setHasErrors(true);
        state.setErrors(e);
    };

    const handleProcessing = () => {
        state.setWasSuccessful(false);
        state.setHasErrors(false);
        state.setErrors({});
        state.setProcessing(true);
    };

    const handleSuccess = () => {
        state.setWasSuccessful(true);
        setIsDisplaySuccessToast(true);
        if (closeOnFormSuccess) {
            state.reset();
        }
    };

    const resetErrorsAndProcessing = () => {
        state.setWasSuccessful(false);
        state.setProcessing(false);
        state.setHasErrors(false);
        state.setErrors({});
    };

    const form = (
        <Form
            id="inertiaform"
            action={state.url}
            method={state.method}
            onError={handleError}
            onSuccess={handleSuccess}
            onStart={handleProcessing}
            onSubmit={resetErrorsAndProcessing}
            onFinish={() => state.setProcessing(false)}
            disableWhileProcessing={true}
            showProgress={true}
            options={{
                preserveScroll: true,
                preserveState: true,
                only: partialLoadingOnlyArray,
            }}
            transform={(data) => {
                return Object.keys(state.transformData).length === 0
                    ? data
                    : { ...data, ...state.transformData };
            }}
        >
            {state.method !== 'delete' && children}
        </Form>
    );

    if (variant === 'sheet') {
        return (
            <MySheetForForm
                state={state}
                direction={direction}
                sheetWidth={sheetWidth}
            >
                {form}
            </MySheetForForm>
        );
    }

    if (variant === 'drawer') {
        return (
            <MyDrawerForForm state={state} direction={direction}>
                {form}
            </MyDrawerForForm>
        );
    }

    return <MyDialogForForm state={state}>{form}</MyDialogForForm>;
}
