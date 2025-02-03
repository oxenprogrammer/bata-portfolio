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
  externalLinks: string[];
}

export type ProjectApiResponse = {
  project: Project;
};

interface Image {
  id: number;
  url: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  images: Image[];
  tags: string[];
  createdBy: string;
  publishedAt: Date;
  updatedAt: Date;
  content: string;
}

export type BlogApiResponse = {
  blog: Blog;
};
