export interface Project {
  id: string;
  title: string;
  description: string | null;
  summary: string;
  date: string;
  organization: string;
  fileUrl: string;
  videoUrl: string | null;
  images: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
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
