import { ReactNode } from 'react';

function MyCellCenter({ children }: { children: ReactNode }) {
    return <span className="flex w-full justify-center">{children}</span>;
}

export default MyCellCenter;
