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
import { Spinner } from '@/components/ui/spinner';
import type { TQReturnType } from '@/tq/tq-types';

export function DeleteConfirmationModal({ state }: { state: TQReturnType }) {
    return (
        <Dialog open={state.openModal} onOpenChange={state.reset} modal={false}>
            {/* <DialogTrigger asChild> */}
            {/*<Button variant="outline">Open Dialog</Button>*/}
            {/* </DialogTrigger> */}
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{state.modalTitle}</DialogTitle>
                    <DialogDescription>
                        {state.modalDescription}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={state.confirmDelete}
                        disabled={state.mutation.isPending}
                    >
                        {state.mutation.isPending ? (
                            <>
                                <Spinner /> Deleting...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
