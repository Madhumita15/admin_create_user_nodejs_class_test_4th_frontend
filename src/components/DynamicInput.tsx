import { TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldErrors, FieldValues, UseFormRegister,Path } from "react-hook-form";




interface DynamicInputInterface<T extends FieldValues>{
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  name:  Path<T>;
  type: "text" | "email" | "password" | "number" | "textarea";
  required: boolean;
  loading: boolean
}

const DynamicInput = <T extends FieldValues>({register, errors,label, name, type, required, loading}: DynamicInputInterface<T>) => {
    const DynamicError = errors[name]
    const errorMessage = DynamicError?.message as string | undefined
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
  return (
    <>
    <div className="flex flex-row relative items-center">
      <TextField
        type={(isPassword && !showPassword) ? "password" : "text"}
        disabled={loading}
        label={required ? <>{label}<span className="text-red-600">*</span></> : label}
        className={`border border-purple-700 rounded-lg p-2 text-lg w-[360px] `}
        placeholder="Please enter your name"
        {...register(name)}
        rows={type === "textarea" ? 3 : undefined}
        multiline={type === "textarea"}
        error={!!DynamicError}
        helperText={errorMessage}
      />
      {
        isPassword && <button type="button" onClick={()=> setShowPassword(!showPassword)}
           className="absolute right-4 ">
          {showPassword ? <EyeOff className="text-purple-700"/> : <Eye className="text-purple-700"/>}
        </button> 
      }
      
    </div>
      
    </>
  );
};
export default DynamicInput;
