import React, {useEffect, useState} from "react";

import {FormItem} from "@/app/types/FormItem";

type Props = {
    data: FormItem;
    onInputStateChange: (newValue: string, isValid: boolean) => void;
    resetForm: boolean;
}

const TextInput = ({data, onInputStateChange, resetForm}: Props) => {
    const [error, setError] = useState<string>('');
    const [fieldValue, setFieldValue] = useState<string>(data.value as string);

    useEffect(() => {
        if (resetForm) {
            setError('');
            setFieldValue(data.value as string);
        }
    }, [resetForm]);

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setFieldValue(newValue);
        if (data.validation) {
            const validationRegexp = new RegExp(data.validation, 'g');
            if (!validationRegexp.test(newValue)) {
                setError(`Input value should match the following regex ${data.validation}`);
            } else {
                setError('');
            }
        }
    }

    const onBlur = () => {
        onInputStateChange(fieldValue, !error);
    }

    return (
        <div>
            <label htmlFor={data.name} className={`block mb-2 text-sm font-medium ${error ? 'text-red-900' : 'text-gray-900'}`}>
                {data.label}
            </label>
            <input
                type="text"
                name={data.name}
                className={`${error ? 'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500': 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} border text-sm rounded-lg  block w-full p-2.5`}
                autoComplete="off"
                onChange={onTextChange}
                onBlur={onBlur}
                value={fieldValue}
            />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500 max-w-[340px]">{error}</p>}
        </div>
    );
}

export default TextInput;