import {FormItem} from "@/app/types/FormItem";
import React, {useEffect, useState} from "react";

type Props = {
    data: FormItem;
    onInputStateChange: (newValue: string | number) => void;
    resetForm: boolean;
}

const DropdownInput = ({data, onInputStateChange, resetForm}: Props) => {
    const [fieldValue, setFieldValue] = useState<string>(data.default_value as string);

    useEffect(() => {
        if (resetForm) {
            setFieldValue(data.default_value as string);
        }
    }, [resetForm]);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(event.target.value);
        onInputStateChange(event.target.value);
    }

    return (
        <div>
            <label htmlFor={data.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {data.label}
            </label>
            <select onChange={onChange} name={data.name} value={fieldValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {data.options?.map((option) => {
                    return (
                        <option key={option} value={option}>
                            {option.toUpperCase()}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default DropdownInput;