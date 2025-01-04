"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';
import { insertEmployee, fetchEmployees } from '@/app/reduxToolkit/slice';
import { fetchListData } from '@/app/reduxToolkit/listSlice';

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '' });
  const { data, loading, error } = useSelector((state: RootState) => state.list);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(insertEmployee(formData));
      // clear the form data
      setFormData({ name: '' });
      await dispatch(fetchListData());
    } catch (err) {
      console.error('Error submitting form:', err);
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
              onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {data.map((item: { id: number; name: string }) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}