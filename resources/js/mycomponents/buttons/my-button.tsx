import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { ComponentProps, ReactNode } from 'react';

const colors = {
    blue: 'bg-blue-700 hover:bg-blue-600 disabled:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white',
    red: 'bg-red-700 hover:bg-red-600 disabled:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white',
    green: 'bg-green-700 hover:bg-green-600 disabled:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white',
    yellow: 'bg-yellow-700 hover:bg-yellow-600 disabled:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white',
    purple: 'bg-purple-700 hover:bg-purple-600 disabled:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-white',
    default: '',
    none: '',
};

function MyButton({
    className,
    loading,
    icon,
    color = 'none',
    children,
    ...props
}: ComponentProps<typeof Button> & {
    loading?: boolean;
    icon?: ReactNode;
    color?: null | keyof typeof colors;
}) {
    return (
        <Button
            className={cn(
                `cursor-pointer disabled:opacity-90 ${colors[color]}`,
                className,
            )}
            disabled={loading}
            // variant="default"
            {...props}
        >
            {loading ? <Spinner className="size-4" /> : icon && icon}
            {children}
        </Button>
    );
}

export default MyButton;
