"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { fetchAllProjects } from './reduxToolkit/project/projectSlice';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
  completedPercentage: number;
  pendingPercentage: number;
}

export default function AdminProjectPage() {
  const dispatch: AppDispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects) as unknown as Project[];

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project: Project) => (
          <div key={project.id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-300 hover:shadow-lg transition-shadow duration-300">
            <Link href={`/dashboard/project/${project.id}`}>
              <h2 className="text-lg font-semibold mb-2 text-blue-700">{project.name}</h2>
            </Link>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex justify-between mt-2">
              <p className="text-green-500 font-medium">Completed: {project.completedPercentage}%</p>
              <p className="text-yellow-500 font-medium">Pending: {project.pendingPercentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}