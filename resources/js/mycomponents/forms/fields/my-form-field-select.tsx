import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { Eraser } from 'lucide-react';
import { ComponentProps, JSX, useState } from 'react';
interface MyFormFieldPropTypes {
    name: string;
    label: string | number | null;
    options: {
        [key: string]: {
            label: string;
            icon?: JSX.Element;
        };
    };
    defaultValue?: string | number | readonly string[] | undefined;
    placeholder?: string | undefined;
    isRequired: boolean;
    description?: string;
    hint?: string | number | undefined;
    formState: FormStateHookReturnType;
}

export function MyFormFieldSelect({
    name,
    label,
    options,
    defaultValue,
    placeholder,
    isRequired,
    description,
    hint,
    formState: state,
    ...props
}: MyFormFieldPropTypes & ComponentProps<typeof Select>) {
    const [value, setValue] = useState<string>(defaultValue ?? '');

    return (
        <Field
            className="mb-4"
            {...(state.errors[name] && { 'data-invalid': true })}
        >
            <FieldLabel className="items-center justify-between">
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

            <div className="flex items-center gap-1">
                <Select
                    key={name}
                    name={name}
                    required={isRequired}
                    value={value}
                    onValueChange={setValue}
                    defaultValue={defaultValue}
                    {...props}
                    {...(state.errors[name] && { 'aria-invalid': true })}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={placeholder || 'Select'} />
                    </SelectTrigger>
                    <SelectContent>
                        {/*<SelectItem value="clearselectedvalue">Clear</SelectItem>*/}
                        {Object.entries(options).map(([key, { label }]) => {
                            return (
                                <SelectItem key={key} value={key}>
                                    {label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setValue('')}
                >
                    <Eraser className="h-4 w-4" />
                </Button>
            </div>

            {state.errors[name] && (
                <FieldError>{state.errors[name]}</FieldError>
            )}
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );
}
