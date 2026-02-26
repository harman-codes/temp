import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

function MyCellAvatar({
    url,
    name,
    size,
    className,
    ...props
}: {
    url: string;
    name: string;
    size?: 'default' | 'sm' | 'lg';
} & ComponentProps<typeof AvatarPrimitive.Root>) {
    return (
        <Avatar className={className} size={size} {...props}>
            <AvatarImage
                src={'https://i.pravatar.cc/150?u=' + url + name}
                alt={name}
            />
            {/* <AvatarImage src={url} alt={name} /> */}
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
    );
}

export default MyCellAvatar;
