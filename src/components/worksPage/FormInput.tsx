import {Field, FieldAttributes} from "formik";
import {cn} from "@/utils/cn";

interface FormInputProps extends FieldAttributes<any> {
  name: string,
  placeholder?: string,
  className?: string,
  getFieldMeta: (name: string) => any
}

const FormInput = ({name, placeholder, className, getFieldMeta, ...otherProps}: FormInputProps) => {

  return (
    <>
      <Field
        {...otherProps}
        className={cn("font-light text-sm bg-darkslate-500 hover:border-blue-400 border border-transparent rounded resize-both overflow-hidden",
          {"border-red-500": getFieldMeta(name).error && getFieldMeta(name).touched},
          className)}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      {getFieldMeta(name).error && getFieldMeta(name).touched && (
        <div className="text-red-500 mb-4">{getFieldMeta(name).error}</div>
      )}
    </>
  );
}

export default FormInput;