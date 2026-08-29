import type { InputType, PasswordDataType } from "../../../typescript/type/user.type";

export const PasswordInput: InputType<PasswordDataType>[]=[
     {
        label: "Cuurent Password",
        required: true,
        name: "curPassword",
        type: "password"
    },
     {
        label: "New Password",
        required: true,
        name: "newPassword",
        type: "password"
    },
     {
        label: "ConfirmPassword",
        required: true,
        name: "confirmPassword",
        type: "password"
    }
]