import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { SwitchProps } from '@radix-ui/react-switch';

export function MySwitch({
    name,
    label,
    defaultChecked,
    className,
    ...props
}: {
    name: string;
    label: string;
    defaultChecked: boolean | undefined;
    className?: string;
} & SwitchProps) {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Switch
                id={`toggle-switch-${name}`}
                name={name}
                defaultChecked={defaultChecked || false}
                {...props}
            />
            <Label htmlFor={`toggle-switch-${name}`}>{label}</Label>
        </div>
    );
}
