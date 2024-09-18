export type FormItem = {
    name: string;
    label: string;
    type: "text"| "longtext"| "dropdown"| "number";
    options?: string[] | number[];
    default_value?: string | number;
    value?: string | number;
    min_value?: number;
    max_value?: number;
    validation?: string;
}