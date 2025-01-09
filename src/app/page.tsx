"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { fetchAllProjects } from './reduxToolkit/project/projectSlice';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project: Project) => (
          <div key={project.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-2">
              <p className="text-green-600">Completed: 70%</p>
              <p className="text-yellow-600">Pending: 30%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}