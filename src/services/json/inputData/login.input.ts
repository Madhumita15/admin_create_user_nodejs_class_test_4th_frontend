import type { InputType, LoginDataType } from "../../../typescript/type/user.type";

export const loginInput:InputType<LoginDataType>[] = [
    {
        label: "Email",
        required: true,
        name: "email",
        type: "text"
    },
    {
        label: "Password",
        required: true,
        name: "password",
        type: "password"
    }
]