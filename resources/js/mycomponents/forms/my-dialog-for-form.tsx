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
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { ReactNode } from 'react';

function MyDialogForForm({
    state,
    children,
}: {
    state: FormStateHookReturnType;
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
                    <DialogTitle>{state.title}</DialogTitle>
                    <DialogDescription>{state.description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter className="mt-4">
                    {state.mode == 'delete' ? (
                        <MyButton
                            loading={state.processing}
                            color="red"
                            type="submit"
                            form="inertiaform"
                        >
                            Confirm
                        </MyButton>
                    ) : (
                        <MyButton
                            loading={state.processing}
                            type="submit"
                            form="inertiaform"
                        >
                            Submit
                        </MyButton>
                    )}
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default MyDialogForForm;
