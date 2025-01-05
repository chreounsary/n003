"use client";
import { useRouter, redirect } from 'next/navigation';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from 'next/link';
import Image from "next/image";

export default function Users() {
    interface User {
        id: number;
        name: string;
        email: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const fetchUsers = async () => {
        const response = await fetch("/api/users");  
        const data = await response.json();
        setUsers(data);
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (id: number, name: string, email: string) => {
        setEditingUserId(id);
        setName(name);
        setEmail(email);
    };

    const handleSave = async () => {
        if (editingUserId !== null) {
            // Update the user on the server
            fetch(`/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            })
                .then(response => response.json())
                .then(updatedUser => {
                    setUsers(users.map(user => user.id === editingUserId ? updatedUser : user));
                    setEditingUserId(null);
                    setName("");
                    setEmail("");
                    fetchUsers();
                })
        } else {
            // Add a new user to the server
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            if (response.ok) {
                const newUser = await response.json();
                setUsers([...users, newUser]);
                setName("");
                setEmail("");
                fetchUsers();
            } else {
                console.error("Failed to add user");
            }
        }
    };

    const handleDelete = (id: number) => {
        // Delete the user from the server
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setUsers(users.filter(user => user.id !== id));
        });
    };

    return (
        <div>
        <Breadcrumb pageName="User List" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    {/* <!-- Sign Up Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                        Add User
                        </h3>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter user name"
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter user email"
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">{editingUserId !== null ? "Update" : "Add"} User</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <br />
            
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Email
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Action
                        </h5>
                    </div>
                    </div>

                    {users.map((user, key) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                            key === users.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                            key={key}
                        >
                            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                <p className="hidden text-black dark:text-white sm:block">
                                    {user.name}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{user.email}K</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <button onClick={() => handleEdit(user.id, user.name, user.email)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}