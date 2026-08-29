import type { InputType, UserData } from "../../../typescript/type/user.type";


export const userInput:InputType<UserData>[]  = [
  {
    label: "Name",
    required: true,
    name: "name",
    type: "text",
  },
  {
    label: "Email",
    required: true,
    name: "email",
    type: "text",
  },
  {
    label: "Phone",
    required: true,
    name: "phone",
    type: "text",
  },
];
