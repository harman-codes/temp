import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function MySkeletonTable({ rows = 5 }: { rows?: number }) {
    const skeletonClass = 'h-4 w-full bg-stone-300 dark:bg-stone-800';
    const headerSkeletonClass = 'h-4 bg-stone-400 dark:bg-stone-700';
    return (
        <div className="w-full space-y-2">
            {/* Loading Indicator Above Table */}
            {/*<div className="flex items-center justify-center space-x-2 text-slate-700 dark:text-slate-300">*/}
            {/*    <Spinner className="h-5 w-5" />*/}
            {/*    <span className="font-medium">Loading...</span>*/}
            {/*</div>*/}

            {/* Skeleton Table */}
            <Table className="animate-pulse">
                {/*<TableCaption>*/}
                {/*    <Skeleton className="h-4 w-40 bg-slate-300 dark:bg-slate-700" />*/}
                {/*</TableCaption>*/}

                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton
                                className={`${headerSkeletonClass} w-20`}
                            />
                        </TableHead>
                        <TableHead>
                            <Skeleton
                                className={`${headerSkeletonClass} w-32`}
                            />
                        </TableHead>
                        <TableHead>
                            <Skeleton
                                className={`${headerSkeletonClass} w-24`}
                            />
                        </TableHead>
                        <TableHead>
                            <Skeleton
                                className={`${headerSkeletonClass} w-16`}
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: rows }).map((_, idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                <Skeleton className={skeletonClass} />
                            </TableCell>
                            <TableCell>
                                <Skeleton className={skeletonClass} />
                            </TableCell>
                            <TableCell>
                                <Skeleton className={skeletonClass} />
                            </TableCell>
                            <TableCell>
                                <Skeleton className={skeletonClass} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default MySkeletonTable;
