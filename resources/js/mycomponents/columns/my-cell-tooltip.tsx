import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CellValueType } from '@/mycomponents/columns/types';

function MyCellTooltip({ cellValue, className }: CellValueType) {
    return (
        <Tooltip>
            <TooltipTrigger>
                <div className="max-w-72 cursor-pointer truncate text-sm">
                    {cellValue}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <span className={cn('line-clamp-3 max-w-md text-wrap', className)}>
                    {cellValue}
                </span>
            </TooltipContent>
        </Tooltip>
    );
}

export default MyCellTooltip;
