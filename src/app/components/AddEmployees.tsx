"use client";
import React, { useState } from 'react'

export default function AddEmployees() {
    const [name, setName] = useState('');
    const dataDispatch = () => {
            fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        });
    }
    return (
        <div>
            <form>
                <label>
                    Name:
                    <input type="text" onChange={(e) => setName(e.target.value)} name="name" />
                </label>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
