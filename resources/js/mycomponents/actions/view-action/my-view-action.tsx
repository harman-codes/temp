import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { ReactNode } from 'react';

function MyViewAction({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Eye />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[90vh] flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="max-h-full overflow-y-auto py-2 space-y-2">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MyViewAction;
