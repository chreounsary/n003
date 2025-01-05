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
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { projects } = useSelector((state: any) => state.project);
  
  useEffect(() => {
    setError(null);
  }, [projectName, userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Assuming you have a createProject action
      //set validation
      const userId = Number(e.target.userID.value);
      if (!projectName || !userId) {
        setError('Project name and user ID are required');
        return;
      }
      if (userId !== null) {
        await dispatch(addProjectAsync({ userId, newProject: { name: projectName } }));
        await dispatch(fetchProjects(1));
      } else {
        setError('User ID is required');
      }
      setProjectName('');

    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to create project');
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
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    }
    fetchData();
    fetchUsers();
  }, [dispatch]);

  return (
    <div>
      <div className="project">
        <h1>New Project</h1>
        {/* display error message set color red by using class taiwind*/}
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            name='projectName'
            onChange={(e) => setProjectName(e.target.value)}
          />
          {/* add item select for userID */}
          <select name="userID" id="userID" onChange={(e) => setUserId(Number(e.target.value))}>
            <option value="">Select User</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
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
