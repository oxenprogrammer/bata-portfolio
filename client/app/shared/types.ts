export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export type ProjectApiResponse = {
  project: Project;
};

export interface Blog {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
}

export type BlogApiResponse = {
  blog: Blog;
};
