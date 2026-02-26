import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import MyButton from '@/mycomponents/buttons/my-button';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { ReactNode, useMemo } from 'react';

function MySheetForForm({
    state,
    direction,
    sheetWidth,
    children,
}: {
    state: FormStateHookReturnType;
    direction: 'top' | 'bottom' | 'left' | 'right';
    sheetWidth?: 'full' | 'three-quarter' | 'half' | 'quarter';
    children: ReactNode;
}) {
    const sheetWidthClass = useMemo(() => {
        switch (sheetWidth) {
            case 'full':
                return 'min-w-full';
            case 'three-quarter':
                return 'min-w-[75%]';
            case 'half':
                return 'min-w-[50%]';
            case 'quarter':
                return 'min-w-[25%]';
            default:
                return 'max-w-2xl';
        }
    }, [sheetWidth]);

    return (
        <Sheet
            open={state.openModal}
            onOpenChange={(e) => {
                state.setOpenModal(e);
                state.reset();
            }}
            modal={true}
        >
            <SheetContent
                className={sheetWidthClass}
                onPointerDownOutside={(e) => e.preventDefault()}
                side={direction}
            >
                <SheetHeader>
                    <SheetTitle>{state.title}</SheetTitle>
                    <SheetDescription>{state.description}</SheetDescription>
                </SheetHeader>
                <div className="overflow-y-auto p-4">{children}</div>
                <SheetFooter className="flex flex-row justify-between border-t border-gray-200 dark:border-gray-900">
                    <MyButton
                        loading={state.processing}
                        type="submit"
                        form="inertiaform"
                    >
                        Submit
                    </MyButton>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default MySheetForForm;
