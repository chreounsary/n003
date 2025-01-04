"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';
import { insertEmployee, updateEmployees, deleteEmployees } from '@/app/reduxToolkit/slice';
import { fetchListData } from '@/app/reduxToolkit/listSlice';

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<{ id: number | null; name: string }>({ id: null, name: '' });
  const { data, loading, error } = useSelector((state: RootState) => state.list);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await dispatch(updateEmployees(formData));
      } else {
        await dispatch(insertEmployee(formData));
      }
      setFormData({ id: null, name: '' });
      await dispatch(fetchListData());
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };
  const handleEdit = (employee: { id: number; name: string }) => {
    setFormData(employee);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteEmployees(id));
      await dispatch(fetchListData());
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListData());
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Employees</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <button type="submit">{formData.id ? 'Update' : 'Submit'}</button>
        </form>
        <table className='table table-striped table-bordered bg-slate-200'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='table-body border-spacing-1 col-12'>
            {data.map((item: { id: number; name: string }) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className='mr-2 inline-block border-l-stone-500'>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}