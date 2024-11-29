import {Project} from "@/types/ProjectType";
import Card from "@/components/Card";
import {cn} from "@/utils/cn";
import LinkIcon from "@/components/icons/LinkIcon";
import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import useDarkMode from "@/hooks/useDarkMode";
import useThemeColor from "@/hooks/useThemeColor";
import {FormValues} from "@/types/FormValuesType";
import {FormikErrors} from "formik";
import ProjectCardSkeleton from "@/components/worksPage/ProjectCardSkeleton";

const Projects = ({
                    projects,
                    setFieldValue,
                    handleDelete,
                    isLoading
                  }: {
  projects: Project[],
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>,
  handleDelete: (project: Project, index: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>) => void;
  isLoading: boolean;
}) => {
  const {darkMode} = useDarkMode();
  const {themeColor} = useThemeColor();

  return isLoading ? <ProjectCardSkeleton/> : (
    <>
      {projects.map((project: Project, index: number) => (
          <Card themeColor={themeColor}
                className="flex flex-col items-center sm:items-start sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4"
                key={project.id}>
            <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
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
              <div
                className={cn("bg-gray-300 p-4 max-w-[260px] rounded mb-10 sm:mb-0", {"bg-darkslate-400": darkMode})}>
                <h2 className="text-base font-bold mb-2">Project Links</h2>
                {project.projectLinks.map((item: any, index: number) => (
                  <a key={index} href={item.link} target="_blank"
                     className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">
                    {item.name}
                    <LinkIcon color={darkMode} width="16" height="16"/>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {project.image && (
                <Image src={project.image} width={300} height={400} className="rounded w-[300px] h-[400px]"
                       alt="gdfgdf"/>)}
              <LinkCard
                themeColor="ThemeRed"
                className="ml-auto"
                onClick={() => handleDelete(project, index, setFieldValue)}
              >Delete project</LinkCard>
            </div>
          </Card>
        )
      )}
    </>
  );
}

export default Projects;