import { Project } from "../shared/types";

interface ApiResponse {
  data: {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: string;
    updated_at: string;
  }[];
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/documents');
  const { data } = await response.json() as ApiResponse;
  
  return data.map(item => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    imageUrl: 'https://picsum.photos/300/200',
    link: item.url
  }));
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const response = await fetch(`http://127.0.0.1:8000/api/documents/${id}`);
  const { data } = await response.json() as { data: ApiResponse['data'][0] };
  
  if (!data) return undefined;
  
  return {
    id: data.id.toString(),
    title: data.title,
    description: data.description,
    imageUrl: 'https://picsum.photos/300/200',
    link: data.url
  };
};