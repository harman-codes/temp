import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

function gridColumnsClass(columns: number) {
    if (columns === 2) {
        return 'grid grid-cols-2';
    } else if (columns === 3) {
        return 'grid grid-cols-2';
    } else {
        return 'grid grid-cols-1';
    }
}

function MyViewSection({
    columns = 1,
    children,
}: {
    columns?: 1 | 2 | 3;
    children: ReactNode;
}) {
    return <div className={cn(gridColumnsClass(columns), 'space-y-2')}>{children}</div>;
}

export default MyViewSection;
