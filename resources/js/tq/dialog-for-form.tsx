import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import MyButton from '@/mycomponents/buttons/my-button';
import type { TQReturnType } from '@/tq/tq-types';

function DialogForForm({
    state,
    children,
}: {
    state: TQReturnType;
    children: ReactNode;
}) {
    return (
        <Dialog
            open={state.openModal}
            onOpenChange={(e) => {
                state.setOpenModal(e);
                state.reset();
            }}
            modal={true}
        >
            <DialogContent
                className="sm:max-w-[425px]"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{state.modalTitle}</DialogTitle>
                    <DialogDescription>
                        {state.modalDescription}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter className="mt-4">
                    <MyButton
                        loading={state.mutation.isPending}
                        type="submit"
                        form="tqform"
                    >
                        {state.mode === 'update' ? 'Save' : 'Submit'}
                    </MyButton>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogForForm;
