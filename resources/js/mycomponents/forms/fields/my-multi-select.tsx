import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { useEffect, useMemo, useState } from 'react';

type MyMultiSelectPropsType = {
    name: string;
    label: string | number | null;
    defaultValue?: string[];
    description?: string;
    hint?: string | number | undefined;
    isRequired?: boolean;
    formState: FormStateHookReturnType;
    options: { [key: string]: string }[];
    valueField?: string;
    labelField?: string;
    selectedValue?: (value: string[]) => void;
};
export default function MyMultiSelect({
    name,
    label,
    defaultValue = [],
    description,
    hint,
    isRequired,
    formState: state,
    options,
    valueField = 'id',
    labelField = 'name',
    selectedValue,
}: MyMultiSelectPropsType) {
    const [selected, setSelected] = useState<string[]>(defaultValue || []);

    const toggle = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        );
        selectedValue?.(selected);
    };

    useEffect(() => {
        if (selectedValue) {
            selectedValue(defaultValue || []);
        }
    }, []);

    const optionsValueLabel = useMemo(() => {
        return options.map((option) => {
            return {
                value: option[valueField],
                label: option[labelField],
            };
        });
    }, [labelField, options, valueField]);

    return (
        <>
            <Field
                className="mb-4"
                {...(state.errors[name] && { 'data-invalid': true })}
            >
                <FieldLabel
                    className="items-center justify-between"
                    htmlFor={name}
                >
                    <span>
                        <span>{label}</span>{' '}
                        {isRequired && (
                            <span className="text-xs text-red-500">*</span>
                        )}
                    </span>
                    <span className="text-xs font-light text-muted-foreground">
                        {hint}
                    </span>
                </FieldLabel>
                <input
                    type="hidden"
                    name={name}
                    value={selected}
                    required={isRequired}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {selected.length
                                ? `${selected.length} selected`
                                : 'Select'}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        {optionsValueLabel.map((item) => (
                            <DropdownMenuCheckboxItem
                                key={item.value}
                                className="capitalize"
                                onSelect={(event) => event.preventDefault()}
                                checked={selected.includes(item.value)}
                                onCheckedChange={() => toggle(item.value)}
                            >
                                {item.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {state.errors[name] && (
                    <FieldError>{state.errors[name]}</FieldError>
                )}
                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}
            </Field>
        </>
    );
}
