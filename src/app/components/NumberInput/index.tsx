import {FormItem} from "@/app/types/FormItem";
import React, {useEffect, useState} from "react";

type Props = {
    data: FormItem;
    onInputStateChange: (newValue?: number, isValid?: boolean) => void;
    resetForm: boolean;
}

const NumberInput = ({data, onInputStateChange, resetForm}: Props) => {
    const [error, setError] = useState<string>('');
    const [fieldValue, setFieldValue] = useState<number | undefined>(data.value as number);

    useEffect(() => {
        if (resetForm) {
            setFieldValue(data.value as number);
        }
    }, [resetForm]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setFieldValue(newValue);
        if (data.min_value && newValue < data.min_value) {
            setError(`Input should be more than ${data.min_value}`);
        } else if (data.max_value && newValue > data.max_value) {
            setError(`Input should be less than ${data.max_value}`);
        } else {
            setError('');
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
                type="number"
                name={data.name}
                className={`${error ? 'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500': 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} border text-sm rounded-lg  block w-full p-2.5`}
                onChange={onChange}
                onBlur={onBlur}
                value={fieldValue}
            />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500 max-w-[340px]">{error}</p>}
        </div>
    );
}

export default NumberInput;