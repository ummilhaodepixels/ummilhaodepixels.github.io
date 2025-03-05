import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

type SelectFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

export const FormSelectField = ({
  control,
  name,
  label,
  options,
  required = false,
}: SelectFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
