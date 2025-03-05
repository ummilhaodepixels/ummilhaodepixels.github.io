import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

type InputFieldProps = React.ComponentProps<"input"> & {
  control: Control<any>;
  name: string;
  label: string;
  description?: string | (() => React.ReactNode);
};

export const FormInputField = ({
  control,
  name,
  label,
  required = false,
  type = "text",
  ...props
}: InputFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
        <FormControl>
          <Input {...field} type={type} {...props} />
        </FormControl>
        {props.description && (
          <FormDescription>
            {typeof props.description === "string"
              ? props.description
              : props.description()}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
