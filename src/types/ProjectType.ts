export type Project = {
  title: string;
  id: string;
  description: string;
  technologies: string[];
  projectLinks: { name: string; link: string }[];
  image:  undefined | string;
  imageName?: string;
  createdDate: string;
  updatedDate?: string
}