import { Badge } from '@/components/ui/badge';
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
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

interface MyFormFieldPropTypes {
    name: string;
    label: string | number | null;
    defaultValue?: string[] | undefined;
    description?: string;
    hint?: string | number | undefined;
    isRequired?: boolean;
    formState: FormStateHookReturnType;
    options: { [key: string]: string }[];
    valueField?: string;
    labelField?: string;
    selectTitle?: string;
    selectedValue?: (value: string[]) => void;
    deferredData?: string | string[];
}

function MyFormFieldSelectWithSearchMultiple({
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
}: MyFormFieldPropTypes &
    Omit<
        ComponentProps<typeof Select>,
        'defaultValue' | 'value' | 'onValueChange'
    >) {
    const [open, setOpen] = useState(false);
    const isDirty = useRef(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(() => {
        if (!defaultValue) return [];
        if (Array.isArray(defaultValue)) return defaultValue;
        return [String(defaultValue)];
    });

    useEffect(() => {
        if (isDirty.current) return;
        if (defaultValue !== undefined) {
            // Check for undefined, not just falsy
            const defaultArray = Array.isArray(defaultValue)
                ? defaultValue
                : [String(defaultValue)];
            // Simple interaction check or just trust the user wants to override?
            // For now, let's strictly follow defaultValue if it changes, assuming parent controls it
            // BUT we must avoid the infinite loop if parent passes new array ref but same content
            // Checking JSON stringify for simple comparison
            if (
                JSON.stringify(defaultArray) !== JSON.stringify(selectedValues)
            ) {
                setSelectedValues(defaultArray);
            }
        } else if (selectedValues.length > 0) {
            // If defaultValue becomes undefined, clear selectedValues
            setSelectedValues([]);
        }
    }, [defaultValue]); // Removed selectedValues from deps to avoid cycle

    useEffect(() => {
        if (selectedValue) {
            selectedValue(selectedValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]); // Added selectedValues to deps to trigger callback on change

    const optionsValueLabel = useMemo(() => {
        if (options === undefined) {
            return [];
        }

        return options?.map((option) => {
            return {
                value: String(option[valueField]),
                label: option[labelField],
            };
        });
    }, [labelField, options, valueField]);

    const handleSelect = (currentValue: string) => {
        const newSelectedValues = selectedValues.includes(currentValue)
            ? selectedValues.filter((value) => value !== currentValue)
            : [...selectedValues, currentValue];

        isDirty.current = true;
        setSelectedValues(newSelectedValues);
        // The useEffect above will now handle calling selectedValue
    };

    const handleRemove = (valueToRemove: string) => {
        const newSelectedValues = selectedValues.filter(
            (value) => value !== valueToRemove,
        );
        isDirty.current = true;
        setSelectedValues(newSelectedValues);
        // The useEffect above will now handle calling selectedValue
    };

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
            {/* Hidden inputs for form submission if needed, though usually handled by state */}
            {/* Hidden inputs for form submission if needed, though usually handled by state */}
            {selectedValues.length > 0 ? (
                selectedValues.map((value) => (
                    <input
                        key={value}
                        type="hidden"
                        name={`${name}[]`}
                        value={value}
                    />
                ))
            ) : (
                <input type="hidden" name={name} value="" />
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        type="button"
                        className="h-auto min-h-10 w-full justify-between py-2"
                    >
                        <div className="flex flex-wrap items-center gap-1">
                            {selectedValues.length > 0 ? (
                                selectedValues.map((value) => {
                                    const option = optionsValueLabel.find(
                                        (o) => o.value === value,
                                    );
                                    return (
                                        <Badge
                                            key={value}
                                            variant="secondary"
                                            className="cursor-default"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(value);
                                            }}
                                        >
                                            {option?.label || value}
                                            <X className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" />
                                        </Badge>
                                    );
                                })
                            ) : (
                                <span className="text-muted-foreground">
                                    {selectTitle || 'Select...'}
                                </span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Option found.</CommandEmpty>
                            <CommandGroup>
                                {optionsValueLabel.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => {
                                            handleSelect(option.value);
                                        }}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                selectedValues.includes(
                                                    option.value,
                                                )
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
                    fallback={<Skeleton className="h-10 w-full rounded-lg" />}
                >
                    {field}
                </Deferred>
            ) : (
                field
            )}
        </>
    );
}

export default MyFormFieldSelectWithSearchMultiple;
