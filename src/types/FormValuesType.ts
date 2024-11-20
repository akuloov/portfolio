export interface FormValues {
  title: string;
  description: string;
  technologies: string[];
  projectLinks: { name: string; link: string }[];
  image: File | undefined;
}