export type FormItem = {
    name: string;
    label: string;
    type: "text"| "longtext"| "dropdown"| "number";
    options?: string[] | number[];
    default_value?: string | number | boolean;
    value?: string | number | boolean;
    min_value?: number;
    max_value?: number;
    validation?: string;
}