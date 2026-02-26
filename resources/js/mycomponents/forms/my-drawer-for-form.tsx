import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import MyButton from '@/mycomponents/buttons/my-button';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { ReactNode } from 'react';

function MyDrawerForForm({
    state,
    direction,
    children,
}: {
    state: FormStateHookReturnType;
    direction: 'top' | 'bottom' | 'left' | 'right';
    children: ReactNode;
}) {
    return (
        <Drawer
            open={state.openModal}
            onOpenChange={(e) => {
                state.setOpenModal(e);
                state.reset();
            }}
            modal={true}
            direction={direction}
        >
            <DrawerContent
                // className="sm:max-w-[425px]"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <div className="flex justify-center overflow-y-auto">
                    <div className="max-w-[500px] flex-1">
                        <DrawerHeader>
                            <DrawerTitle>{state.title}</DrawerTitle>
                            <DrawerDescription>
                                {state.description}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4">{children}</div>
                        <DrawerFooter>
                            <MyButton
                                loading={state.processing}
                                type="submit"
                                form="inertiaform"
                            >
                                Submit
                            </MyButton>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default MyDrawerForForm;
