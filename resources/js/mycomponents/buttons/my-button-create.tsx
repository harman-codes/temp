import { Spinner } from '@/components/ui/spinner';
import MyButton from '@/mycomponents/buttons/my-button';
import { PlusCircle } from 'lucide-react';
import { ComponentProps } from 'react';

function MyButtonCreate({
    showLoadingAndDisableButton = false,
    children,
    ...props
}: ComponentProps<typeof MyButton> & {
    showLoadingAndDisableButton?: boolean;
}) {
    if (showLoadingAndDisableButton === true) {
        return (
            <MyButton icon={<Spinner />} disabled={true}>
                Loading...
            </MyButton>
        );
    }

    return (
        <MyButton icon={<PlusCircle />} {...props}>
            {children || 'Create'}
        </MyButton>
    );
}

export default MyButtonCreate;
