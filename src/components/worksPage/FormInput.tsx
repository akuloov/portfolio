import {Field, FieldAttributes, useField} from "formik";
import {cn} from "@/utils/cn";

interface FormInputProps extends FieldAttributes<any> {
  name: string,
  placeholder?: string,
  className?: string,
}

const FormInput = ({name, placeholder, className, ...otherProps}: FormInputProps) => {
  const [field, meta] = useField(name);
  return (
    <>
      <Field
        {...otherProps}
        className={cn("font-light text-sm bg-darkslate-500 hover:border-blue-400 border border-transparent rounded resize-both overflow-hidden",
          {"border-red-500": meta.error && meta.touched},
          className)}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      {meta.error && meta.touched && (
        <div className="text-red-500 mb-4">{meta.error}</div>
      )}
    </>
  );
}

export default FormInput;