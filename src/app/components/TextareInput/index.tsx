import {FormItem} from "@/app/types/FormItem";
import React, {useEffect, useState} from "react";

type Props = {
    data: FormItem;
    onInputStateChange: (newValue: string, isValid: boolean) => void;
    resetForm: boolean;
}

const TextAreaInput = ({data, onInputStateChange, resetForm}: Props) => {
    const [error, setError] = useState<string>('');
    const [fieldValue, setFieldValue] = useState<string>(data.value as string);

    useEffect(() => {
        if (resetForm) {
            setError('');
            setFieldValue(data.value as string);
        }
    }, [resetForm]);

    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            <label htmlFor={data.name} className={`block text-sm font-medium ${error ? 'text-red-900' : 'text-gray-900'}`}>
                {data.label}
            </label>
            <textarea
                name={data.name}
                rows="4"
                className={`block p-2.5 w-full text-sm rounded-lg border ${error ? 'text-red-900 bg-red-50 border-red-300 focus:ring-red-500 focus:border-red-500': 'text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                placeholder="Write your thoughts here..."
                onChange={onTextChange}
                value={fieldValue}
                onBlur={onBlur}></textarea>
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500 max-w-[340px]">{error}</p>}
        </div>
    )
}

export default TextAreaInput;