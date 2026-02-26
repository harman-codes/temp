import { ReactNode } from 'react';

function MyViewField({
    title,
    className,
    children,
}: {
    title: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={className}>
            <div className="font-bold text-stone-700 dark:text-stone-300">
                {title}
            </div>
            <div className="mt-1">{children}</div>
        </div>
    );
}

export default MyViewField;
