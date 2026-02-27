import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { ComponentProps } from 'react';
import { TQReturnType } from '@/tq/tq-types';

interface MyFormFieldPropTypes {
    variant?: 'input' | 'textarea';
    name: string;
    label: string | number | null;
    defaultValue?: string | number | readonly string[] | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean;
    description?: string;
    hint?: string | number | undefined;
    formState: TQReturnType;
}

export function MyFormFieldInput({
    variant = 'input',
    name,
    label,
    defaultValue,
    placeholder,
    isRequired = false,
    description,
    hint,
    formState: state,
    ...props
}: MyFormFieldPropTypes &
    ComponentProps<typeof Input> &
    ComponentProps<typeof Textarea>) {
    return (
        <Field className="mb-4">
            <FieldLabel className="items-center justify-between" htmlFor={name}>
                <span>
                    {label}{' '}
                    {isRequired && (
                        <span className="text-xs text-red-500">*</span>
                    )}
                </span>
                <span className="text-xs font-light text-muted-foreground">
                    {hint}
                </span>
            </FieldLabel>
            {variant === 'input' ? (
                <Input
                    key={name}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    required={isRequired}
                    className="focus:border-2 focus:border-primary/80! focus:ring-0!"
                    {...props}
                />
            ) : (
                <Textarea
                    key={name}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    required={isRequired}
                    rows={4}
                    className="focus:border-2 focus:border-primary/80! focus:ring-0!"
                    {...props}
                />
            )}
            {/*{state.errors[name] && (*/}
            {/*    <FieldError>{state.errors[name]}</FieldError>*/}
            {/*)}*/}
            {state.mutation.error?.response?.data?.errors &&
                state.mutation.error?.response?.data?.errors[name]?.map(
                    (error, index) => {
                        console.log(error);
                        return <FieldError key={index}>{error}</FieldError>;
                    },
                )}
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );
}
