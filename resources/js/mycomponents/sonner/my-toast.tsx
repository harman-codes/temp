import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type ToastType = {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    description?: string;
};

function MyToast({ type, message, description }: ToastType) {
    const hasRun = useRef(false);
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        switch (type) {
            case 'success':
                toast.success(message, { description });
                break;
            case 'error':
                toast.error(message, { description });
                break;
            case 'warning':
                toast.warning(message, { description });
                break;
            case 'info':
                toast.info(message, { description });
                break;
            default:
                toast(message, { description });
                break;
        }
    }, [type, message, description]);

    return <></>;
}

export default MyToast;
