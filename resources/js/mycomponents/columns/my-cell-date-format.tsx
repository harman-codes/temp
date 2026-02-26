import { cn } from '@/lib/utils';
import { formatDate } from '@/myhelpers/formatDate';

function MyCellDateFormat({
    date,
    className,
}: {
    date: string | null | undefined;
    className?: string;
}) {
    return (
        <div className={cn('flex justify-center', className)}>
            {formatDate(date)}
        </div>
    );
}

export default MyCellDateFormat;
