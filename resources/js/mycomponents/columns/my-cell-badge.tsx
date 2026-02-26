import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CellValueType } from '@/mycomponents/columns/types';
import { useMemo } from 'react';

function MyCellBadge({
    cellValue,
    className,
    variant = 'default',
}: CellValueType & {
    variant?:
        | 'default'
        | 'secondary'
        | 'destructive'
        | 'outline'
        | 'warning'
        | 'yellow'
        | 'purple'
        | 'green'
        | 'red';
}) {
    const variants = useMemo(
        () => ({
            default:
                'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary:
                'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive:
                'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline:
                'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
            warning:
                'border-transparent bg-yellow-300 dark:bg-yellow-400 text-black/80 dark:text-black',
            yellow: 'border-transparent bg-yellow-300 dark:bg-yellow-400 text-black/80 dark:text-black',
            purple: 'border-transparent bg-purple-600 dark:bg-purple-400 text-white dark:text-black',
            green: 'border-transparent bg-green-600 dark:bg-green-400 text-white dark:text-black',
            red: 'border-transparent bg-red-500 dark:bg-red-400 text-white dark:text-black',
        }),
        [],
    );

    return cellValue ? (
        <div className="flex justify-center">
            <Badge className={cn(variants[variant], className)}>
                {cellValue}
            </Badge>
        </div>
    ) : (
        ''
    );
}

export default MyCellBadge;
