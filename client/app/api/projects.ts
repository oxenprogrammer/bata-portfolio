import { z } from 'zod';

// Zod schema for validation
const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  file_url: z.string().url(),
  date: z.string(),
  summary: z.string(),
  organization: z.string(),
  video_url: z.string().url().nullable(),
  images: z.array(z.string().url()),
  categories: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string()
});

// TypeScript type derived from the schema
type ApiProject = z.infer<typeof ProjectSchema>;

// Response type
interface ApiResponse {
  data: ApiProject[];
}

// Our transformed Project type for the frontend
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

const transformProject = (data: ApiProject): Project => ({
  id: data.id.toString(),
  title: data.title,
  description: data.description,
  summary: data.summary,
  date: data.date,
  organization: data.organization,
  fileUrl: data.file_url,
  videoUrl: data.video_url,
  images: data.images,
  categories: data.categories,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at)
});

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public body: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function for common fetch error handling
async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new ApiError(
        `API request failed with status ${response.status}`,
        response.status,
        body
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to fetch', 500, error);
  }
}

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getProjects = async (): Promise<Project[]> => {
  const rawData = await fetchWithErrorHandling(`${API_BASE_URL}/documents`) as ApiResponse;
  
  // Validate the response data
  const validatedData = z.array(ProjectSchema).parse(rawData.data);
  
  return validatedData.map(transformProject);
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const rawData = await fetchWithErrorHandling(`${API_BASE_URL}/documents/${id}`) as { data: ApiProject };
  
  // Validate the response data
  try {
    const validatedData = ProjectSchema.parse(rawData.data);
    return transformProject(validatedData);
  } catch (error) {
    console.error('Failed to validate project data:', error);
    return undefined;
  }
};