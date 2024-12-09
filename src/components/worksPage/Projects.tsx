import {Project} from "@/types/ProjectType";
import Card from "@/components/Card";
import {cn} from "@/utils/cn";
import LinkIcon from "@/components/icons/LinkIcon";
import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";
import useThemeColor from "@/hooks/useThemeColor";
import {FormValues} from "@/types/FormValuesType";
import {FieldMetaProps, FormikErrors} from "formik";
import ProjectCardSkeleton from "@/components/worksPage/ProjectCardSkeleton";
import CreateProjectCard from "@/components/worksPage/CreateProjectCard";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import formatDate from "@/utils/formatDate";
import ActionsMenu from "@/components/worksPage/ActionsMenu";

const Projects = ({
                    projects,
                    setFieldValue,
                    handleDelete,
                    isLoading,
                    openEditProject,
                    values,
                    setValues,
                    getFieldMeta,
                    imageFile,
                    setImageFile,
                    isValid,
                    submitDone,
                    editProjectID,
                  }: {
  projects: Project[],
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>,
  handleDelete: (project: Project, index: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>) => void;
  isLoading: boolean;
  openEditProject: (project: Project, setValues: (values: React.SetStateAction<FormValues>, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>) => void;
  values: FormValues,
  getFieldMeta: <Value>(name: string) => FieldMetaProps<Value>,
  imageFile: File | undefined,
  setImageFile: (file: File | undefined) => void;
  isValid: boolean;
  submitDone: boolean;
  setValues: (values: React.SetStateAction<FormValues>, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>;
  editProjectID: string | null;
}) => {
  const {isAuthenticated} = useIsAuthenticated();
  const {darkMode} = useDarkMode();
  const {themeColor} = useThemeColor();

  return isLoading ? <ProjectCardSkeleton/> : (
    <>
      {projects.map((project: Project, index: number) => editProjectID === project.id ? (
          <CreateProjectCard
            values={values}
            setFieldValue={setFieldValue}
            getFieldMeta={getFieldMeta}
            imageFile={imageFile}
            setImageFile={setImageFile}
            isValid={isValid}
            submitDone={submitDone}
            key={project.id}
          />) : (
          <Card themeColor={themeColor}
                className="flex flex-col items-center sm:items-stretch sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4"
                key={project.id}>
            <div className="flex flex-col w-full sm:justify-between sm:w-fit  min-h-full mr-auto sm:mr-0 ">
              <div className="flex flex-col w-full">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="font-light mb-4 text-sm">{project.description}</p>
                <h2 className="text-base font-medium">Technologies that I used:</h2>
                <ul className="list-disc list-inside text-sm">
                  {project.technologies.map((item: string, index: number) => (
                    <li key={item + index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={"flex flex-col gap-6"}>
                <div
                  className={cn("bg-gray-300 p-4 max-w-[260px] rounded mt-auto", {"bg-darkslate-400": darkMode})}>
                  <h2 className="text-base font-bold mb-2">Project Links</h2>
                  {project.projectLinks.map((item: any, index: number) => (
                    <a key={index} href={item.link} target="_blank"
                       className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">
                      {item.name}
                      <LinkIcon color={darkMode} width="16" height="16"/>
                    </a>
                  ))}
                </div>
                <div className="mb-10 sm:mb-0 mt-auto">
                  <div className="ml-1 text-darkslate-300 text-xs">
                    {project.updatedDate ? "Last updated" : "Created"} {formatDate(project.updatedDate ?? project.createdDate)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {isAuthenticated && (
                <ActionsMenu
                  openEditProject={() => openEditProject(project, setValues)}
                  handleDelete={() => handleDelete(project, index, setFieldValue)}
                />
              )}
              {project.image && (
                <Image src={project.image} width={300} height={400} className="rounded w-[300px] h-[400px]"
                       alt="project image"/>)}
            </div>
          </Card>
        )
      )}
    </>
  );
}

export default Projects;