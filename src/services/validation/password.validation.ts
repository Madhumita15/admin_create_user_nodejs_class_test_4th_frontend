import * as yup from 'yup'
export const PasswordSchema = yup.object({
    curPassword: yup.string().trim().required("Current password is required"),
    newPassword: yup.string().trim().required("New Password is required"),
    confirmPassword: yup.string().trim().required("Confirm Password is required")  
})