import * as Yup from "yup";

const validations =
  Yup.object({
    title: Yup.string()
      .required("Title must be filled in")
      .matches(/^.{3,}$/, "Title must have at least 3 characters"),
    description: Yup.string()
      .required("Description must be filled in")
      .matches(/^.{10,}$/, "Description must have at least 10 characters"),
    technologies: Yup.array().of(
      Yup.string().required('At least 1 technology is required')
    ),
      projectLinks: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('At least 1 link name is required'),
            link: Yup.string().url('Invalid URL').required('At least 1 link is required'),
        })
      ),
    image: Yup.string()
      .required("The project must have an image/screenshot"),
  });

export default validations;
