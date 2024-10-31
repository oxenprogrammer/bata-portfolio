import { Blog } from "../shared/types";

// Mock data - replace with actual API call later
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with Next.js and Material UI',
    imageUrl: '/images/project-1.jpg',
    link: 'https://project1.com'
  },
  {
    id: '2',
    title: 'Healthcare Dashboard',
    description: 'Analytics dashboard for healthcare providers using React Query',
    imageUrl: '/images/project-2.png',
    link: 'https://project2.com'
  },
  {
    id: '3',
    title: 'AI Content Platform',
    description: 'Content generation platform powered by machine learning',
    imageUrl: '/images/project-3.png',
    link: 'https://project3.com'
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with Next.js and Material UI',
    imageUrl: '/images/project-4.avif',
    link: 'https://project1.com'
  },
  {
    id: '5',
    title: 'Healthcare Dashboard',
    description: 'Analytics dashboard for healthcare providers using React Query',
    imageUrl: 'https://picsum.photos/300/200',
    link: 'https://project2.com'
  },
  {
    id: '6',
    title: 'AI Content Platform',
    description: 'Content generation platform powered by machine learning',
    imageUrl: 'https://picsum.photos/300/200',
    link: 'https://project3.com'
  },
  {
    id: '7',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with Next.js and Material UI',
    imageUrl: 'https://picsum.photos/300/200',
    link: 'https://project1.com'
  },
  {
    id: '8',
    title: 'Healthcare Dashboard',
    description: 'Analytics dashboard for healthcare providers using React Query',
    imageUrl: 'https://picsum.photos/300/200',
    link: 'https://project2.com'
  },
  {
    id: '9',
    title: 'AI Content Platform',
    description: 'Content generation platform powered by machine learning',
    imageUrl: 'https://picsum.photos/300/200',
    link: 'https://project3.com'
  },
];

export const getBlogs = async (): Promise<Blog[]> => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Replace this with actual API call when ready
  // return await fetch('api/projects').then(res => res.json());
  return mockBlogs;
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockBlogs.find(blog => blog.id === id);
};