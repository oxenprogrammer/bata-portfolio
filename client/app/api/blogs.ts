// types.ts
export interface Blog {
  id: string;
  title: string;
  description: string;
  images: string[];  // Changed from imageUrl to images array
  link: string;
  createdBy: string;
  publishedAt: Date;
  updatedAt: Date;
  content: string;
}

// api/blogs.ts
const transformBlogData = (apiResponse: { data: Array<{
  id: number | string;
  title: string;
  excerpt: string;
  images: Array<{ url: string }>;
  created_by: string;
  published_at: string;
  updated_at: string;
  content: string;
}>}): Blog[] => {
  return apiResponse.data.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.excerpt,
    images: item.images.map(img => img.url),  // Store all image URLs
    link: '',
    createdBy: item.created_by,
    publishedAt: new Date(item.published_at),
    updatedAt: new Date(item.updated_at),
    content: item.content
  }));
};

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/blogs');
  const apiResponse = await response.json();
  return transformBlogData(apiResponse);
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  const blogs = await getBlogs();
  return blogs.find(blog => blog.id === id);
};