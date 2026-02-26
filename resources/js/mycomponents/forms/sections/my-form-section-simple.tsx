import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

type PropsType = {
    title?: string;
    description?: string;
    className?: string;
    children: ReactNode;
};

function MyFormSectionSimple({ title, description, children }: PropsType) {
    return (
        <Card className="mb-4 gap-4 py-4">
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
            )}
            {title && <Separator />}
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default MyFormSectionSimple;
