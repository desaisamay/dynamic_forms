export interface FieldValidation {
    pattern?: string;
    message?: string;
    }
    
    
    export interface Field {
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'date' | 'dropdown' | 'multiselect' | 'checkbox';
    required?: boolean;
    options?: string[];
    validation?: FieldValidation;
    readonly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    }
    
    
    export interface FormSchema {
    title?: string;
    fields: Field[];
    }