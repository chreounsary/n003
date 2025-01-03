"use client";
import { useRouter, redirect } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Users() {
    const router = useRouter();
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
            <h1>User List</h1>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter user name"
                    required
                />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
            />
                <button type="submit">{editingUserId !== null ? "Update" : "Add"} User</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id, user.name, user.email)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}