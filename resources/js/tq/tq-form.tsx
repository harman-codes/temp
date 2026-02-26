import type { ReactNode } from 'react';
import { DeleteConfirmationModal } from '@/tq/delete-confirmation-modal';
import DialogForForm from '@/tq/dialog-for-form';
import SheetForForm from '@/tq/sheet-for-form';
import type { TQReturnType } from '@/tq/tq-types';

type PropType = {
    formState: TQReturnType;
    variant?: 'dialog' | 'sheet' | 'drawer';
    direction?: 'left' | 'right' | 'top' | 'bottom';
    sheetWidth?: 'full' | 'three-quarter' | 'half' | 'quarter';
    children?: ReactNode;
};

function TQForm({
    formState: state,
    variant = 'dialog',
    direction = 'right',
    sheetWidth,
    children,
}: PropType) {
    if (state.mode === 'delete') {
        return <DeleteConfirmationModal state={state} />;
    }

    if (variant === 'sheet') {
        return (
            <SheetForForm
                state={state}
                direction={direction}
                sheetWidth={sheetWidth}
            >
                <form id="tqform" onSubmit={state.onSubmit}>
                    {children}
                </form>
            </SheetForForm>
        );
    }

    return (
        <DialogForForm state={state}>
            <form id="tqform" onSubmit={state.onSubmit}>
                {children}
            </form>
        </DialogForForm>
    );
}

export default TQForm;
