import { notFound } from "next/navigation";
import { getBlogById } from "@/app/api/blogs";
import { BlogDetails } from "./blog-details";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogById(params.id);
  
  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
}