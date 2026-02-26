import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function MyBadge({
    variant = 'default',
    type = 'soft',
    className,
    children,
}: {
    variant?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'destructive'
        | 'warning'
        | 'green'
        | 'blue'
        | 'sky'
        | 'purple'
        | 'red'
        | 'yellow'
        | 'pink'
        | 'orange'
        | 'indigo'
        | 'teal'
        | 'cyan'
        | 'lime';
    type?: 'soft' | 'solid';
    className?: string;
    children: ReactNode;
}) {
    const variantsSoft = useMemo(() => {
        return {
            default:
                'bg-blue-50 text-primary dark:bg-blue-950 dark:text-primary',
            primary:
                'bg-blue-50 text-primary dark:bg-blue-950 dark:text-primary',
            secondary: 'bg-secondary text-secondary-foreground',
            destructive:
                'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
            warning:
                'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
            green: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
            blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
            sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
            purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
            red: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
            yellow: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
            pink: 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
            orange: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
            indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
            teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
            cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
            lime: 'bg-lime-50 text-lime-700 dark:bg-lime-950 dark:text-lime-300',
        };
    }, []);

    const variantsSolid = useMemo(() => {
        return {
            default: 'bg-primary text-primary-foreground',
            primary: 'bg-primary text-primary-foreground',
            secondary: 'bg-secondary text-secondary-foreground',
            destructive:
                'bg-red-600 text-red-50 dark:bg-red-950 dark:text-red-300',
            warning:
                'bg-yellow-500 text-yellow-50 dark:bg-yellow-950 dark:text-yellow-300',
            green: 'bg-green-500 text-green-50 dark:bg-green-950 dark:text-green-300',
            blue: 'bg-blue-500 text-blue-50 dark:bg-blue-950 dark:text-blue-300',
            sky: 'bg-sky-500 text-sky-50 dark:bg-sky-950 dark:text-sky-300',
            purple: 'bg-purple-500 text-purple-50 dark:bg-purple-950 dark:text-purple-300',
            red: 'bg-red-600 text-red-50 dark:bg-red-950 dark:text-red-300',
            yellow: 'bg-yellow-500 text-yellow-50 dark:bg-yellow-950 dark:text-yellow-300',
            pink: 'bg-pink-500 text-pink-50 dark:bg-pink-950 dark:text-pink-300',
            orange: 'bg-orange-500 text-orange-50 dark:bg-orange-950 dark:text-orange-300',
            indigo: 'bg-indigo-500 text-indigo-50 dark:bg-indigo-950 dark:text-indigo-300',
            teal: 'bg-teal-500 text-teal-50 dark:bg-teal-950 dark:text-teal-300',
            cyan: 'bg-cyan-500 text-cyan-50 dark:bg-cyan-950 dark:text-cyan-300',
            lime: 'bg-lime-500 text-lime-50 dark:bg-lime-950 dark:text-lime-300',
        };
    }, []);

    if (children === '' || children === undefined || children === null) {
        return null;
    }

    if (type === 'solid') {
        return (
            <Badge className={cn(variantsSolid[variant], className)}>
                {children}
            </Badge>
        );
    }

    return (
        <Badge className={cn(variantsSoft[variant], className)}>
            {children}
        </Badge>
    );
}

export default MyBadge;
