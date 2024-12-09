import Card from "@/components/Card";
import FormInput from "@/components/worksPage/FormInput";
import {Button, IconButton} from "@mui/material";
import {cn} from "@/utils/cn";
import LinkIcon from "@/components/icons/LinkIcon";
import Image from "next/image";
import {FieldMetaProps, FormikErrors} from "formik";
import useThemeColor from "@/hooks/useThemeColor";
import useDarkMode from "@/hooks/useDarkMode";
import {FormValues} from "@/types/FormValuesType";

const CreateProjectCard = ({
                             values,
                             setFieldValue,
                             getFieldMeta,
                             imageFile,
                             setImageFile,
                             isValid,
                             submitDone,
                           }: {
                             values: FormValues,
                             setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>,
                             getFieldMeta: <Value>(name: string) => FieldMetaProps<Value>,
                             imageFile: File | undefined,
                             setImageFile: (file: File | undefined) => void;
                             isValid: boolean;
                             submitDone: boolean;
                           }
) => {
  const {themeColor} = useThemeColor();
  const {darkMode} = useDarkMode();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result) return
        setFieldValue("image", reader.result.toString());
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const imageError = getFieldMeta('image').error
  const imageTouched = getFieldMeta('image').touched

  return (
    <Card
      themeColor={themeColor}
      className="flex  flex-col items-center sm:items-start sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4"
    >
      <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
        <div className="flex flex-col w-full">
          <FormInput
            name="title"
            placeholder="Title"
            className="text-xl font-bold"
          />
          <FormInput
            name="description"
            placeholder="Description"
            className="w-[240px] md:w-[340px] lg:w-[600px] min-[1160px]:w-[720px]"
            as="textarea"
          />
          <div className="flex items-center mt-4">
            <h2 className="text-base font-medium">
              {values.technologies.length > 1 ? "Technologies" : "Technology"} that I used:
            </h2>
            <IconButton
              size="medium"
              className="w-[30px] h-[30px] p-0 hover:scale-110"
              onClick={() => setFieldValue("technologies", [...values.technologies, ""])}
            >
              <div className="text-white">+</div>
            </IconButton>
            {values.technologies.length !== 1 && (
              <IconButton
                size="small"
                className="w-[30px] h-[30px] p-0 hover:scale-110"
                onClick={() => setFieldValue("technologies", [...values.technologies.slice(0, -1)])}
              >
                <div className="text-white">-</div>
              </IconButton>)}
          </div>
          <ul className="list-disc list-inside text-sm">
            {values.technologies.map((tech, index) => (
              <li key={'techList' + index}>
                <FormInput
                  name={`technologies[${index}]`}
                  placeholder="Technology"
                  value={tech}
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className={cn("bg-gray-300 p-4 max-w-[260px] rounded mb-10 sm:mb-0", {"bg-darkslate-400": darkMode})}>
          <div className="flex items-center">
            <h2 className="text-base font-bold">Project Links</h2>
            <div className="flex">
              <IconButton
                size="medium"
                className="w-[30px] h-[30px] p-0 hover:scale-110"
                onClick={() => setFieldValue("projectLinks", [...values.projectLinks, {name: "", link: ""}])}
              >
                <div className="text-white">+</div>
              </IconButton>
              <IconButton
                size="small"
                className="w-[30px] h-[30px] p-0 hover:scale-110"
                onClick={() => setFieldValue("projectLinks", [...values.projectLinks.slice(0, -1)])}
              >
                <div className="text-white">-</div>
              </IconButton>
            </div>
          </div>
          {values.projectLinks.map((link, index) => (
            <div className="flex" key={index}>
              <div>
                <FormInput
                  name={`projectLinks.${index}.name`}
                  placeholder="Link name"
                  value={link.name}
                  className="bg-[#4C4C4C] block"
                  onInput={(e: any) => e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 8) + 'px'}
                />
              </div>
              <div className="cursor-pointer flex items-center">
                <LinkIcon color={darkMode} width="16" height="16"/>
                <div>
                  <FormInput
                    name={`projectLinks.${index}.link`}
                    placeholder="Link"
                    value={link.link}
                    className="bg-[#4C4C4C] block"
                    onInput={(e: any) => e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 8) + 'px'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full justify-between gap-2 items-end sm:min-h-[400px]">
        {!imageFile && (
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file"
                   className={cn("flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-[300px] h-[400px]",
                     {"border-red-500": imageError && imageTouched}
                   )}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                  className="font-semibold">Click to upload</span> or
                  drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
              </div>

              <input type="file"
                     id="dropzone-file"
                     className="hidden"
                     onChange={handleImageChange}/>
              {imageError && imageTouched && (
                <div className="text-red-500 mb-4">{imageError}</div>
              )}
            </label>
          </div>
        )}
        {values.image && (
          <Image
            src={values.image}
            className="rounded w-[300px] h-[400px]"
            alt="Selected Image"
            width={300}
            height={400}
          />
        )}
        <div className={cn("", {"w-full flex justify-between": imageFile})}>
          {imageFile && (
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-40 h-[36.5px]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose another image</p>
              <input type="file"
                     id="dropzone-file"
                     className="hidden"
                     onChange={handleImageChange}/>
              {imageError && imageTouched && (
                <div className="text-red-500 mb-4">{imageError}</div>
              )}
            </label>
          )}
          <Button
            type="submit"
            className="max-w-[100px] ml-auto"
            variant="contained"
            disabled={!isValid}
          >Submit</Button>
        </div>
      </div>
    </Card>
  );
}

export default CreateProjectCard;