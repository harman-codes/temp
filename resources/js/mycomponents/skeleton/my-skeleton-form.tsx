import { Skeleton } from '@/components/ui/skeleton';

interface FormSkeletonProps {
    fields?: number;
}

export function MySkeletonForm({ fields = 4 }: FormSkeletonProps) {
    return (
        <div className="animate-pulse space-y-6">
            {/* Title */}
            <Skeleton className="h-6 w-48 bg-stone-300 dark:bg-stone-700" />

            {/* Description */}
            <Skeleton className="h-4 w-80 bg-stone-200 dark:bg-stone-800" />

            {/* Fields */}
            <div className="space-y-4">
                {Array.from({ length: fields }).map((_, idx) => (
                    <div key={idx} className="space-y-2">
                        {/* Label */}
                        <Skeleton className="h-4 w-24 bg-stone-300 dark:bg-stone-700" />

                        {/* Input */}
                        <Skeleton className="h-10 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
                    </div>
                ))}
            </div>

            {/* Actions (always optional visually) */}
            <div className="flex gap-3 pt-4">
                <Skeleton className="h-10 w-24 rounded-md bg-stone-300 dark:bg-stone-700" />
                <Skeleton className="h-10 w-20 rounded-md bg-stone-200 dark:bg-stone-800" />
            </div>
        </div>
    );
}
