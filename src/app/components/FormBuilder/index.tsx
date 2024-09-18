'use client'

import {FormItem} from "@/app/types/FormItem";
import React, {FormEvent, useEffect, useMemo, useState} from "react";
import TextInput from "@/app/components/TextInput";
import TextAreaInput from "@/app/components/TextareInput";
import DropdownInput from "@/app/components/DropdownInput";
import NumberInput from "@/app/components/NumberInput";
import SubmittedFormDataModal from "@/app/components/SubmittedFormDataModal";

type Props = {
    formData: FormItem[];
}

type FormStateProps = {
    errors: Record<string, boolean>;
    values: Record<string, string | number>;
}

const FormBuilder = ({formData}: React.FC<Props>) => {
    const initialFormState = useMemo(() => {
        const initialState = {
            errors: {},
            values: {}
        };
        for (let formItem of formData) {
            initialState.values[formItem.name] = formItem.value || formItem.default_value;
        }

        return initialState;
    }, [formData]);

    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [resetForm, setResetForm] = useState<boolean>(false);

    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const initialFormState = {
            errors: {},
            values: {}
        };
        for (let formItem of formData) {
            initialFormState.values[formItem.name] = formItem.value || formItem.default_value;
        }
        setFormState(initialFormState);
    }, []);

    useEffect(() => {
        setIsFormDisabled(
            Object.values(formState.errors).filter((hasError) => hasError).length > 0
        );
    }, [formState.errors]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setModalOpen(true);
    }

    const onModalClose = () => {
        setFormState(initialFormState);
        setModalOpen(false);

        setResetForm(true);
    }

    const onFormStateChange = (itemName: string, newItemValue?: string | number, isValid?: boolean) => {
        setFormState((prevValue) => {
            return {
                errors: {
                    ...prevValue.errors,
                    [itemName]: !isValid,
                },
                values: {
                    ...prevValue.values,
                    [itemName]: newItemValue || '',
                }
            }
        })
    };

    const formInputs = useMemo(() => {
        return formData.map((formItem: FormItem, index: number) => {
            switch (formItem.type) {
                case "text":
                    return (
                        <TextInput
                            key={`form-text-item-${formItem.name}`}
                            data={formItem}
                            onInputStateChange={(newValue, isValid) => {
                                onFormStateChange(formItem.name, newValue, isValid);
                            }}
                            resetForm={resetForm}
                        />
                    );
                case "longtext":
                    return (
                        <TextAreaInput
                            key={`form-longtext-item-${formItem.name}`}
                            data={formItem}
                            onInputStateChange={(newValue, isValid) => {
                                onFormStateChange(formItem.name, newValue, isValid);
                            }}
                            resetForm={resetForm}
                        />
                    );
                case "dropdown":
                    return (
                        <DropdownInput
                            key={`form-dropdown-item-${formItem.name}`}
                            data={formItem}
                            onInputStateChange={(newValue) => {
                                onFormStateChange(formItem.name, newValue, true);
                            }}
                            resetForm={resetForm}
                        />
                    );
                case "number":
                    return (
                        <NumberInput
                            key={`form-number-item-${formItem.name}`}
                            data={formItem}
                            onInputStateChange={(newValue, isValid) => {
                                onFormStateChange(formItem.name, newValue, isValid);
                            }}
                            resetForm={resetForm}
                        />
                    )
                default:
                    return <React.Fragment key={`form-item-${index}`}></React.Fragment>;
            }
        })
    }, [formState, resetForm])

    return (
        <React.Fragment>
            <form action="" className="flex flex-col gap-6 mb-6 min-w-full" onSubmit={onSubmit}>
                {formInputs}
                <button
                    disabled={isFormDisabled}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
            {
                isModalOpen &&
                (
                    <SubmittedFormDataModal
                        onClose={onModalClose}
                        filledData={formState.values}
                    />
                )
            }
        </React.Fragment>
    );
}

export default FormBuilder;