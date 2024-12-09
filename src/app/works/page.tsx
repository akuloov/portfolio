"use client";

import React, {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import LinkButton from "@/components/LinkButton";
import {collection, doc, getDocs, runTransaction, updateDoc} from "@firebase/firestore";
import {db, storage} from "@/firebase/firebase.config";
import {Project} from "@/types/ProjectType";
import useStore from "@/stateStorage/storage";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import {Form, Formik, FormikErrors} from "formik";
import {FormValues} from "@/types/FormValuesType";
import {ref, uploadBytes, getDownloadURL, deleteObject,} from "firebase/storage";
import validations from "@/validation/validations";
import CreateProjectCard from "@/components/worksPage/CreateProjectCard";
import Projects from "@/components/worksPage/Projects";
import {TextField} from "@mui/material";
import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";
import SortIcon from "@/components/icons/SortIcon";
import ActionsMenu from "@/components/worksPage/ActionsMenu";

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

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

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
        createdDate: doc.data().createdDate,
        updatedDate: doc.data().updatedDate,
      }));
      setProjects([...projectsData]);
      const filteredProjects = [...projectsData].sort((a, b) => {
        const dateA = new Date(a.createdDate).getTime();
        const dateB = new Date(b.createdDate).getTime();
        return dateB - dateA
      });
      setFilteredProjects(filteredProjects);
      setIsLoading(false);
    };
    fetchProjects().then();
  }, []);

  const uploadProjectCache = async (newProject: Project) => {
    return new Promise<void>((resolve) => {
      setFilteredProjects((prevProjects) => {
        const updatedProjects = [newProject, ...prevProjects];
        resolve(); // Resolves the promise after updating the state
        return updatedProjects;
      });
    });
  };

  const updateProjectCache = (updatedProject: Project) => {
    updatedProject.updatedDate = new Date().toISOString();
    setFilteredProjects((prevProjects) => {
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

  const handleSubmit = async (values: FormValues, resetForm: () => void) => {
    const newProject: Project = {
      id: "newProject",
      title: values.title,
      description: values.description,
      technologies: values.technologies,
      projectLinks: values.projectLinks,
      image: values.image ?? "",
      imageName: imageFile?.name ?? undefined,
      createdDate: new Date().toISOString(),
    };

    // Optimistic UI update: Add a temporary project with id 'newProject'
    try {
      await uploadProjectCache(newProject);

      setSubmitDone(false);
      setCreateProjectMode(false);

      // Upload image if necessary
      const imageURL = await uploadImage(imageFile);
      // Execute Firestore transaction
      await runTransaction(db, async (transaction) => {
        const projectRef = doc(collection(db, "projects"));
        const {id, ...projData} = newProject; // Exclude temporary ID
        transaction.set(projectRef, {...projData, image: imageURL});
        setFilteredProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === newProject.id
              ? {...newProject, id}
              : proj
          )
        );
      });

      setImageFile(undefined);
      setSubmitDone(true);
      resetForm()
    } catch (error) {
      console.error("Transaction failed: ", error);

      // Roll back optimistic update
      setFilteredProjects((prevProjects) => prevProjects.filter(({id}) => id !== newProject.id));
      setCreateProjectMode(true);
    }
  };

  // Handle project deletion
  const handleDelete = async (project: Project, index: number) => {
    // Optimistic UI update
    setFilteredProjects(filteredProjects.filter((proj) => proj.id !== project.id));
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
      const restoredProjects = [...filteredProjects];
      restoredProjects.splice(index, 0, project);
      setFilteredProjects(restoredProjects);
      console.error(`Error deleting project with ID: ${project.id} `, {error});
    }
  };

  const openEditProject = async (project: Project, setValues: (values: SetStateAction<FormValues>, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormValues>>) => {
    await setValues(project);
    setImageFile(project.imageName ? new File([], project.imageName) : undefined);
    setEditMode(project.id);
  };

  const submitEditProject = async (values: FormValues, resetForm: () => void) => {
    if (!values.id) {
      console.error("Project ID is missing");
      return;
    }

    updateProjectCache(values)
    setEditMode(null);
    resetForm();

    const projectRef = doc(db, "projects", values.id);
    await updateDoc(projectRef, {
      title: values.title,
      description: values.description,
      technologies: values.technologies,
      projectLinks: values.projectLinks,
      image: values.image,
      createdDate: values.createdDate,
      updatedDate: new Date().toISOString(),
    });
  }

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;
    if (!projects) return;

    if (searchString === '') {
      setFilteredProjects(projects);
      return
    }

    const searchResults = projects.filter((project) => {
      return project.title.toLowerCase().includes(searchString.toLowerCase().trim());
    });

    setFilteredProjects(searchResults);
  };

  const sortProjectsByDate = (sortFilter: 'asc' | 'desc'): void => {
    const sortedProjects = [...filteredProjects].sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return sortFilter === 'desc' ? dateB - dateA : dateA - dateB;
    });
    setFilteredProjects(sortedProjects);
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
        createdDate: new Date().toISOString(),
      }}
      validationSchema={validations}
      onSubmit={(values, {resetForm}) => {
        editMode ? submitEditProject(values, resetForm) : handleSubmit(values, resetForm)
      }}
    >
      {({values, setFieldValue, getFieldMeta, isValid, setValues}) => (
        <Form className="w-full">
          <main
            className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
            <div className="flex justify-between items-center">
              <LinkButton route={"/"} className="animate-fade-down"/>
            </div>
            <Card
              themeColor={themeColor}
              className="text-center mt-5 flex gap-4 items-center justify-between"
            >
              <TextField
                label="Search project by title"
                variant="outlined"
                className="w-full text-white outline-white"
                onChange={handleSearchOnChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
              <ActionsMenu
                options={[...(isAuthenticated ? ['Add new project'] : []), 'Sort by date ↓', 'Sort by date ↑']}
                sortDesc={() => sortProjectsByDate('desc')}
                sortAsc={() => sortProjectsByDate('asc')}
                createProject={() => setCreateProjectMode(true)}
              />
            </Card>
            {createProjectMode && (
              <CreateProjectCard
                values={values}
                setFieldValue={setFieldValue}
                getFieldMeta={getFieldMeta}
                imageFile={imageFile}
                setImageFile={setImageFile}
                isValid={isValid}
                submitDone={submitDone}
              />
            )}
            <Projects
              projects={filteredProjects}
              setFieldValue={setFieldValue}
              handleDelete={handleDelete}
              isLoading={isLoading}
              openEditProject={(project) => openEditProject(project, setValues)}
              values={values}
              getFieldMeta={getFieldMeta}
              imageFile={imageFile}
              setImageFile={setImageFile}
              isValid={isValid}
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