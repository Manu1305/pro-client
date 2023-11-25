import * as Yup from 'yup'
export const Schema=Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirm_password: Yup.string().required("Password is required").oneOf([Yup.ref('password'), null], "Paswword does'nt match")
})