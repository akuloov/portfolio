"use client";

import React, {ChangeEvent, ChangeEventHandler, SetStateAction, useEffect, useState} from "react";
import LinkButton from "@/components/LinkButton";
import {collection, doc, getDocs, runTransaction, updateDoc} from "@firebase/firestore";
import {db, storage} from "@/firebase/firebase.config";
import {Project} from "@/types/ProjectType";
import useStore from "@/stateStorage/storage";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import {Form, Formik, FormikErrors, FormikHelpers} from "formik";
import {FormValues} from "@/types/FormValuesType";
import {ref, uploadBytes, getDownloadURL, deleteObject,} from "firebase/storage";
import validations from "@/validation/validations";
import CreateProjectCard from "@/components/worksPage/CreateProjectCard";
import Projects from "@/components/worksPage/Projects";
import {TextField} from "@mui/material";
import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";

const Works = () => {
  const {isAuthenticated} = useIsAuthenticated();
  const {themeColor} = useThemeColor();

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [createProjectMode, setCreateProjectMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<null | string>(null);

  const [submitDone, setSubmitDone] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const projects = useStore((state) => state.projects);
  const setProjects = useStore((state) => state.setProjects);

  const [filteredProjects, setFilteredProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    // initial fetch of projects
    const fetchProjects = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        technologies: doc.data().technologies,
        projectLinks: doc.data().projectLinks,
        image: doc.data().image,
        imageName: doc.data().imageName,
        date: doc.data().date,
      }));
      setProjects(projectsData);
      setIsLoading(false);
    };
    fetchProjects().then();
  }, []);

  const uploadProjectCache = async (newProject: Project) => {
    return new Promise<void>((resolve) => {
      setProjects((prevProjects) => {
        const updatedProjects = [newProject, ...prevProjects];
        resolve(); // Resolves the promise after updating the state
        return updatedProjects;
      });
    });
  };

  const updateProjectCache = (updatedProject: Project) => {
    setProjects((prevProjects) => {
      return prevProjects.map((proj) =>
        proj.id === updatedProject.id ? updatedProject : proj
      );
    });
  }

  const uploadImage = async (file: File | undefined): Promise<string | undefined> => {
    if (!file) return undefined;
    const imageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const handleSubmit = async (values: FormValues) => {
    const newProject: Project = {
      id: "newProject",
      title: values.title,
      description: values.description,
      technologies: values.technologies,
      projectLinks: values.projectLinks,
      image: values.image ?? "",
      imageName: imageFile?.name ?? undefined,
      date: new Date().toISOString(),
    };

    // Optimistic UI update: Add a temporary project with id 'newProject'
    try {
      await uploadProjectCache(newProject);

      setSubmitDone(false);
      setCreateProjectMode(false);

      // Upload image if necessary
      const imageURL = await uploadImage(imageFile);
      // Execute Firestore transaction
      const newProjectProperties = await runTransaction(db, async (transaction) => {
        const projectRef = doc(collection(db, "projects"));
        const {id, ...projData} = newProject; // Exclude temporary ID
        transaction.set(projectRef, {...projData, image: imageURL});
        return {id: projectRef.id, image: imageURL};
      });

      // Update the state with the new project ID and image
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === newProject.id
            ? {...newProject, ...newProjectProperties}
            : proj
        )
      );

      setImageFile(undefined);
      setSubmitDone(true);
    } catch (error) {
      console.error("Transaction failed: ", error);

      // Roll back optimistic update
      setProjects((prevProjects) => prevProjects.filter(({id}) => id !== newProject.id));
      setCreateProjectMode(true);
    }
  };

  // Handle project deletion
  const handleDelete = async (project: Project, index: number) => {
    // Optimistic UI update
    setProjects(projects.filter((proj) => proj.id !== project.id));
    const docRef = doc(db, "projects", project.id);
    if (project.image) {
      const imageRef = ref(storage, `images/${project.imageName}`);
      deleteObject(imageRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        console.error(`Error in deleting project image with reference: ${project.imageName}`, {error})
      });
    }
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
      console.error(`Error deleting project with ID: ${project.id} `, {error});
    }
  };

  const openEditProject = async (project: Project, setValues: (values: SetStateAction<FormValues>, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormValues>>) => {
    await setValues(project);
    setImageFile(project.imageName ? new File([], project.imageName) : undefined);
    setEditMode(project.id);
  };

  const submitEditProject = async (values: FormValues) => {
    if (!values.id) {
      console.error("Project ID is missing");
      return;
    }

    updateProjectCache(values)
    setEditMode(null);

    const projectRef = doc(db, "projects", values.id);
    await updateDoc(projectRef, {
      title: values.title,
      description: values.description,
      technologies: values.technologies,
      projectLinks: values.projectLinks,
      image: values.image,
    });
  }

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;
    if (!projects) return;

    const searchResults = projects.filter((project) => {
      return project.title.toLowerCase().includes(searchString.toLowerCase().trim());
    });

    setFilteredProjects(searchResults.length > 0 ? searchResults : []);
  };

  return (
    <Formik<FormValues>
      initialValues={{
        id: "",
        title: "",
        description: "",
        technologies: [""],
        projectLinks: [{name: "", link: ""}],
        image: '',
        date: new Date().toISOString(),
      }}
      validationSchema={validations}
      onSubmit={(values) => {
        console.log("Form values: ", values);
        editMode ? submitEditProject(values) : handleSubmit(values)
      }}
    >
      {({values, setFieldValue, getFieldMeta, resetForm, isValid, setValues}) => (
        <Form className="w-full">
          <main
            className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
            <div className="flex justify-between items-center ">
              <LinkButton route={"/"} className="animate-fade-down"/>
              {isAuthenticated && !isLoading && (
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
              <CreateProjectCard
                values={values}
                setFieldValue={setFieldValue}
                getFieldMeta={getFieldMeta}
                imageFile={imageFile}
                setImageFile={setImageFile}
                isValid={isValid}
                resetForm={resetForm}
                submitDone={submitDone}
                editMode={false}
                openEditProject={(project) => openEditProject(project, setValues)}
              />
            )}

            <div className="flex gap-4 mt-5">
              <Card
                themeColor={themeColor}
                className="w-1/2 bg-white text-center"
              >
                <TextField
                  label="Search a project"
                  variant="outlined"
                  className="w-full"
                  onChange={handleSearchOnChange}
                />
              </Card>
              <Card themeColor={themeColor} className="w-1/2">
                <h1 className="text-4xl font-bold text-center">Filtering</h1>
              </Card>
            </div>

            <Projects
              projects={filteredProjects ?? projects}
              setFieldValue={setFieldValue}
              handleDelete={handleDelete}
              isLoading={isLoading}
              openEditProject={(project) => openEditProject(project, setValues)}
              values={values}
              getFieldMeta={getFieldMeta}
              imageFile={imageFile}
              setImageFile={setImageFile}
              isValid={isValid}
              resetForm={resetForm}
              submitDone={submitDone}
              setValues={setValues}
              editProjectID={editMode}
            />
          </main>
        </Form>
      )}
    </Formik>
  )
};

export default Works;