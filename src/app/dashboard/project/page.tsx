"use client";
import { fetchProjects, addProjectAsync } from '@/app/reduxToolkit/project/projectSlice';
import { AppDispatch } from '@/app/store';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import your organization's specific modules for API calls if available
// import { useApi } from 'your-org-api-module';

export default function Page() {
  interface Project {
    id: string;
    name: string;
    userId: number;
  }

  const [projectName, setProjectName] = useState('');
  const [userId, setUserId] = useState<number | null>(null); // Assuming user ID is available
  const [error, setError] = useState<unknown>(null);
  const dispatch: AppDispatch = useDispatch();
  const { projects } = useSelector((state: any) => state.project);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Assuming you have a createProject action
      const userId = 1;
      if (userId !== null) {
        await dispatch(addProjectAsync({ userId, newProject: { name: projectName } }));
        await dispatch(fetchProjects(1));
      } else {
        setError('User ID is required');
      }
      setProjectName('');

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const  response = await dispatch(fetchProjects(1));
        console.log(response);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className="project">
        <h1>New Project</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            name='projectName'
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id}>
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
