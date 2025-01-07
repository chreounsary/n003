"use client";
import { fetchProjects, addProjectAsync } from '@/app/reduxToolkit/project/projectSlice';
import { AppDispatch } from '@/app/store';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
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
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 my-4">
        <div className="flex flex-col gap-9">
          {/* <!-- Sign Up Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add User
              </h3>
          </div>
          <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter user name"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* select option by using taiwind */}
                <select name="userID" id="userID" onChange={(e) => setUserId(Number(e.target.value))} className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input my-4 text-white text-left'>
                  <option value="">Select User</option>
                  {users.map((user: any) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">Add Project</button>
              </div>
          </form>
          </div>
        </div>
      </div>
        
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
          </div>

            {projects.map((project: Project, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${key === projects.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {project.name}
              </p>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>

    
  );
}
