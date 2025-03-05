import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

type FileFieldProps = React.ComponentProps<"input"> & {
  control?: Control<any>;
  label?: string;
  name: string;
};

// export { Input as FormFileField };

// export function FormFileField({ ...props }: FileFieldProps) {
//   return <Input type="file" {...props} />;
// }

export const FormFileField = ({
  control,
  label,
  required = false,
  name,
  ...props
}: FileFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={() => (
      <FormItem>
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
        <FormControl>
          <Input name={name} type="file" {...props} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
