import { Blog } from "../shared/types";

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
    imageUrl: item.images.length > 0 ? item.images[0].url : '',
    link: '',
    createdBy: item.created_by,
    publishedAt: new Date(item.published_at),
    updatedAt: new Date(item.updated_at),
    content: item.content
  }));
};

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/blogs'); //  // TODO: Replace with your API endpoint
  const apiResponse = await response.json();
  return transformBlogData(apiResponse);
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  const blogs = await getBlogs();
  return blogs.find(blog => blog.id === id);
};