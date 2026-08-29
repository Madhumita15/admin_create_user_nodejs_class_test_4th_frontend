import * as yup from 'yup'
export const UserSchema = yup.object({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit mobile number").required("Phone is required"),
})