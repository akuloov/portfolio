"use client";

import useThemeColor from "@/hooks/useThemeColor";
import Card from "@/components/Card";
import Image from "next/image";
import weatherApp from "../../../public/weatherApp.png";
import LinkIcon from "@/components/icons/LinkIcon";
import useDarkMode from "@/hooks/useDarkMode";
import {useEffect, useState} from "react";
import {cn} from "@/utils/cn";
import LinkButton from "@/components/LinkButton";
import {addDoc, collection, deleteDoc, doc, getDocs, runTransaction} from "@firebase/firestore";
import {db, storage} from "@/firebase/firebase.config";
import {Project} from "@/types/ProjectType";
import useStore from "@/stateStorage/storage";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import {Button, IconButton} from "@mui/material";
import LinkCard from "@/components/LinkCard";
import {Form, Formik, Field} from "formik";
import {FormValues} from "@/types/FormValuesType";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import validations from "@/validation/validations";


const Works = () => {
  const {darkMode} = useDarkMode();
  const {themeColor} = useThemeColor();
  const {isAuthenticated} = useIsAuthenticated();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [projectLinks, setProjectLinks] = useState<{ name: string; link: string }[]>([]);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageString, setImageString] = useState<undefined | string>(undefined);


  const [createProjectMode, setCreateProjectMode] = useState<boolean>(false);
  const [technologyNumber, setTechnologyNumber] = useState(1); // number of technologies
  const [linkNumber, setLinkNumber] = useState(1); // number of project links

  const projects = useStore((state) => state.projects);
  const setProjects = useStore((state) => state.setProjects);


  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        technologies: doc.data().technologies,
        projectLinks: doc.data().projectLinks,
        image: doc.data().image,
      }));
      setTitle("");
      setDescription("");
      setTechnologies([]);
      setProjectLinks([]);
      setProjects(projectsData);
      console.log(projectsData);
    };
    fetchProjects();
  }, []);

  // Handle project adding
  const handleSubmit = async (values: FormValues) => {
    let imageURL: string | undefined = undefined
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageURL = await getDownloadURL(imageRef);
      setCreateProjectMode(false);
      console.log(values);
    }

    const newProject: Project = {
      id: "newProject",
      title: values.title,
      description: values.description,
      technologies: values.technologies,
      projectLinks: values.projectLinks,
      image: imageURL,
    }
    // Optimistic UI update: Add a temporary project with id 'newProject'
    setProjects([
      newProject,
      ...projects,
    ]);

    try {
      // Execute the transaction
      await runTransaction(db, async (transaction) => {
        const projectRef = doc(collection(db, "projects"));


        // Add the project data
        transaction.set(projectRef, newProject);

        // Update the state with the new project ID
        setProjects([
          {
            ...newProject,
            id: projectRef.id,
          },
          ...projects.filter(({id}) => id !== newProject.id), // Remove the temporary project
        ]);
      });

      // Reset the form and other state variables
      setCreateProjectMode(false);
      setTechnologyNumber(1);
      setLinkNumber(1);
    } catch (error) {
      console.error("Transaction failed: ", error);

      // Roll back optimistic update if the transaction fails
      setProjects(
        projects.filter(({id}) => id !== newProject.id)
      );
      setCreateProjectMode(true);
    }
  };


  // Handle the file input change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result) return
        setImageString(reader.result.toString());
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  // Handle project deletion
  const handleDelete = async (project: Project, index: number) => {
    // Optimistic UI update
    setProjects(projects.filter((proj) => proj.id !== project.id));
    const docRef = doc(db, "projects", project.id);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnapshot = await transaction.get(docRef);
        if (!docSnapshot.exists()) {
          throw new Error(`Document with ID ${project.id} does not exist.`);
        }
        transaction.delete(docRef);
      });
    } catch (error) {
      // Restore UI and log the error
      const restoredProjects = [...projects];
      restoredProjects.splice(index, 0, project);
      setProjects(restoredProjects);
      console.error("Error deleting project: ", error);
    }
  };


  const deleteTechnology = (
    values: FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (technologyNumber > 1) {
      // Remove the last technology from the array
      const updatedTechnologies = values.technologies.slice(0, -1);

      // Update Formik's field value
      setFieldValue("technologies", updatedTechnologies);

      // Update the number of fields
      setTechnologyNumber((prev) => prev - 1);
    }
  };


  const deleteLink = (
    values: FormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (linkNumber > 1) {
      // Remove the last link from the array
      const updatedLinks = values.projectLinks.slice(0, -1);

      // Update Formik's field value
      setFieldValue("projectLinks", updatedLinks);

      // Update the number of fields
      setLinkNumber((prev) => prev - 1);
    }
  };

  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <div className="flex justify-between items-center">
        <LinkButton route={"/"} className="animate-fade-down"/>
        {isAuthenticated && (
          <LinkButton
            className="animate-fade-down"
            text="Add new project"
            onClick={() => {
              setCreateProjectMode(true);
            }}
          />
        )}
      </div>
      {createProjectMode && (
        <Formik<FormValues>
          initialValues={{
            title: "",
            description: "",
            technologies: technologies.length > 0 ? technologies : [""],
            projectLinks: projectLinks.length > 0 ? projectLinks : [{name: "", link: ""}],
            image: imageString,
          }}
          /*validationSchema={validations}*/
          onSubmit={handleSubmit}
        >
          {({values, validateForm, setTouched, errors, setFieldValue, getFieldMeta}) => (
            <Form>
              <Card themeColor={themeColor}
                    className="flex flex-col items-center sm:items-start sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4">
                <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
                  <div className="flex flex-col w-full">
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="text-xl font-bold bg-darkslate-500 hover:border-blue-400 border border-transparent rounded"
                      placeholder="Title"
                    />
                    {getFieldMeta('title').error && getFieldMeta('title').touched && (
                      <div className="text-red-500">{getFieldMeta('title').error}</div>
                    )}
                    <Field as="textarea"
                           className="font-light mb-4 text-sm bg-darkslate-500 w-[240px] md:w-[340px] lg:w-[600px] min-[1160px]:w-[720px] hover:border-blue-400 border border-transparent rounded resize-both overflow-hidden"
                           id="description"
                           name="description"
                           placeholder="Description"
                           resize="none"
                    />
                    {getFieldMeta('description').error && getFieldMeta('description').touched && (
                      <div className="text-red-500">{getFieldMeta('description').error}</div>
                    )}
                    <div className="flex items-center">
                      <h2 className="text-base font-medium">
                        {technologyNumber > 1 ? "Technologies" : "Technology"} that I used:
                      </h2>
                      <IconButton
                        size="medium"
                        className="w-[30px] h-[30px] bg-white p-0"
                        onClick={() => setTechnologyNumber((prev) => prev + 1)}
                      >
                        <div className="text-white">+</div>
                      </IconButton>
                      <IconButton
                        size="small"
                        className="w-[30px] h-[30px] bg-white p-0"
                        onClick={() => deleteTechnology(values, setFieldValue)}
                      >
                        <div className="text-white">-</div>
                      </IconButton>
                    </div>
                    <ul className="list-disc list-inside text-sm">
                      {Array.from({length: technologyNumber}).map((_, index) => (
                        <li key={'techList' + index}>
                          <Field
                            type="text"
                            className="bg-darkslate-500 hover:border-blue-400 border border-transparent rounded"
                            placeholder="Technology"
                            id={`technologies.${index}`}
                            name={`technologies.${index}`}
                            value={values.technologies[index] || ""}
                          />
                          {getFieldMeta('technologies').error && (
                            <div className="text-red-500">{getFieldMeta('technologies').error}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={cn("bg-gray-300 p-4 max-w-[260px] rounded mb-10 sm:mb-0", {"bg-darkslate-400": darkMode})}>
                    <div className="flex items-center">
                      <h2 className="text-base font-bold">Project Links</h2>
                      <div className="flex items-center">
                        <IconButton
                          size="medium"
                          className="w-[30px] h-[30px] bg-white p-0 mb-2"
                          onClick={() => setLinkNumber((prev) => prev + 1)}
                        >
                          <div className="text-white">+</div>
                        </IconButton>
                        <IconButton
                          size="small"
                          className="w-[30px] h-[30px] bg-white p-0"
                          onClick={() => deleteLink(values, setFieldValue)}
                        >
                          <div className="text-white">-</div>
                        </IconButton>
                      </div>
                    </div>
                    {Array.from({length: linkNumber}).map((_, index) => (
                      <div className="flex items-center" key={index}>
                        <Field
                          type="text"
                          className="bg-darkslate-400 hover:border-blue-400 border border-transparent rounded font-light"
                          placeholder="Link name"
                          onInput={(e: any) => e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 8) + 'px'}
                          id={`projectLinks.${index}.name`}
                          name={`projectLinks.${index}.name`}
                          value={values.projectLinks[index]?.name || ""}
                        />
                        {getFieldMeta('projectLinks').error && (
                          <div className="text-red-500">{getFieldMeta('projectLinks').error}</div>
                        )}
                        <div className="cursor-pointer flex items-center"
                        >
                          <LinkIcon color={darkMode} width="16" height="16"/>
                          <Field
                            type="text"
                            className="hover:border-blue-400 border border-transparent rounded font-light bg-[#4C4C4C]"
                            placeholder="Link"
                            onInput={(e: any) => e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 8) + 'px'}
                            id={`projectLinks.${index}.link`}
                            name={`projectLinks.${index}.link`}
                            value={values.projectLinks[index]?.link || ""}
                          />
                          {getFieldMeta('projectLinks').error && (
                            <div className="text-red-500">{getFieldMeta('projectLinks').error}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col h-full justify-between gap-2 items-end sm:min-h-[400px]">
                  {!imageFile && (
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file"
                             className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-[300px] h-[400px]">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                            className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                            800x400px)</p>
                        </div>
                        <Field
                          type="file"
                          name="image"
                          id="dropzone-file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        {getFieldMeta('image').error && (
                          <div className="text-red-500">{getFieldMeta('image').error}</div>
                        )}
                      </label>
                    </div>
                  )}
                  {imageString && (
                    <Image
                      src={imageString}
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
                        <Field
                          type="file"
                          name="image"
                          id="dropzone-file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                    <Button
                      type="submit"
                      className="max-w-[100px] ml-auto"
                      variant="contained"
                    >Submit</Button>
                  </div>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      )}
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
              onClick={() => handleDelete(project, index)}
            >Delete project</LinkCard>
          </div>
        </Card>
      ))}
    </main>
  );
};

export default Works;