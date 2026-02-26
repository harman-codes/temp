import { CircleCheck, CircleX } from 'lucide-react';

function MyCellBooleanIcon({ value }: { value: boolean }) {
    return value ? (
        <CircleCheck className="h-4 w-4 text-green-500" />
    ) : (
        <CircleX className="h-4 w-4 text-red-500" />
    );
}

export default MyCellBooleanIcon;
