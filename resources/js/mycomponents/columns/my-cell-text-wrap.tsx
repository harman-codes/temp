import { cn } from '@/lib/utils';
import { CellValueType } from '@/mycomponents/columns/types';

function MyCellTextWrap({ cellValue, className }: CellValueType) {
    return (
        <span className={cn('line-clamp-2 text-wrap', className)}>
            {cellValue}
        </span>
    );
}

export default MyCellTextWrap;
