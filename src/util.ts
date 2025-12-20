export function useDateFunction() {

    function formatDate(date: string) {
        return new Date(date).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    return {formatDate}
}


import { ValidationError } from "yup";

export const mapYupErrorsToForm = (error: ValidationError) => {
    return error.inner.map((err) => ({
        name: err.path,
        errors: [err.message],
    }));
};
