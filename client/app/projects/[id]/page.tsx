import { notFound } from "next/navigation";
import { ProjectDetails } from "./project-details";
import { getProjectById } from "@/app/api/projects";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(params.id);
  
  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}