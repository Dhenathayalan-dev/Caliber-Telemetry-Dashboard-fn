import * as Yup from "yup";

export const createUserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
});

export const updateUserSchema = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .notRequired(),
    email: Yup.string()
        .email("Invalid email")
        .notRequired(),
});
