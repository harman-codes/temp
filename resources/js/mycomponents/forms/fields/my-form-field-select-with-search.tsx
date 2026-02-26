import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FormStateHookReturnType } from '@/myhooks/useFormStateHook';
import { Deferred } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ComponentProps, useEffect, useMemo, useState } from 'react';

interface MyFormFieldPropTypes {
    name: string;
    label: string | number | null;
    defaultValue?: string | number | undefined;
    description?: string;
    hint?: string | number | undefined;
    isRequired?: boolean;
    formState: FormStateHookReturnType;
    options: { [key: string]: string }[];
    valueField?: string;
    labelField?: string;
    selectTitle?: string;
    selectedValue?: (value: string) => void;
    deferredData?: string | string[];
}

// const options = [
//     {
//         value: 'next.js',
//         label: 'Next.js',
//     },
//     {
//         value: 'sveltekit',
//         label: 'SvelteKit',
//     },
//     {
//         value: 'nuxt.js',
//         label: 'Nuxt.js',
//     },
//     {
//         value: 'remix',
//         label: 'Remix',
//     },
//     {
//         value: 'astro',
//         label: 'Astro',
//     },
// ];

function MyFormFieldSelectWithSearch({
    name,
    label,
    defaultValue,
    description,
    hint,
    isRequired,
    formState: state,
    options,
    valueField = 'id',
    labelField = 'name',
    selectTitle,
    selectedValue,
    deferredData,
}: MyFormFieldPropTypes & ComponentProps<typeof Select>) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    useEffect(() => {
        if (selectedValue) {
            selectedValue(defaultValue || '');
        }
    }, []);

    const optionsValueLabel = useMemo(() => {
        if (options === undefined) {
            return [];
        }

        return options?.map((option) => {
            return {
                value: option[valueField],
                label: option[labelField],
            };
        });
    }, [labelField, options, valueField]);

    // if (options === undefined) {
    //     return <Skeleton className="h-8 w-sm rounded-lg" />;
    // }

    const field = (
        <Field
            className="mb-4"
            {...(state.errors[name] && { 'data-invalid': true })}
        >
            <FieldLabel className="items-center justify-between" htmlFor={name}>
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
                value={value}
                required={isRequired}
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-50 justify-between"
                    >
                        {value &&
                        options &&
                        optionsValueLabel.find(
                            (option) => option.value === value,
                        )?.value
                            ? optionsValueLabel.find(
                                  (option) => option.value === value,
                              )?.label
                            : selectTitle || 'Select'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Option found.</CommandEmpty>
                            <CommandGroup>
                                {options &&
                                    optionsValueLabel.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onSelect={(currentValue) => {
                                                const selectedOption =
                                                    optionsValueLabel.filter(
                                                        (option) =>
                                                            option.label ===
                                                            currentValue,
                                                    )[0];
                                                const cv =
                                                    selectedOption?.value;
                                                setValue(
                                                    cv === value ? '' : cv,
                                                );
                                                /*Callback*/
                                                selectedValue?.(
                                                    cv === value ? '' : cv,
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            {option.label}
                                            <Check
                                                className={cn(
                                                    'ml-auto',
                                                    value === option.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {state.errors[name] && (
                <FieldError>{state.errors[name]}</FieldError>
            )}
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );

    return (
        <>
            {deferredData ? (
                <Deferred
                    data={deferredData}
                    fallback={<Skeleton className="h-8 w-sm rounded-lg" />}
                >
                    {field}
                </Deferred>
            ) : (
                field
            )}
        </>
    );
}

export default MyFormFieldSelectWithSearch;
