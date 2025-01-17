import { API_URL } from "./constants";

// types.ts
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

export interface Image {
  id: number;
  url: string;
}

// api/blogs.ts
export const transformBlogData = (apiResponse: {
  data: Array<{
    id: number;
    title: string;
    excerpt: string;
    content: string;
    created_by: string;
    published_at: string;
    updated_at: string;
    images: Array<{ id: number; url: string }>;
    tags: string[];
  }>;
}): Blog[] => {
  return apiResponse.data.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.excerpt,
    images: item.images,
    tags: item.tags,
    createdBy: item.created_by,
    publishedAt: new Date(item.published_at),
    updatedAt: new Date(item.updated_at),
    content: item.content,
  }));
};

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const apiResponse = await response.json();
    return transformBlogData(apiResponse);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  const blogs = await getBlogs();
  console.log(
    "Blog:",
    blogs.find((blog) => blog.id === id)
  );
  return blogs.find((blog) => blog.id === id);
};
