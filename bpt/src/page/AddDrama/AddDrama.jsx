import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import './AddDrama.css';

const AddDrama = () => {
    const [user, setUser] = useState({
        name: '',
        type: '',
        status: '',
        avatar: null
    });

    const queryClient = useQueryClient()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const mutation = useMutation(async (newDrama) => {
        const res = await makeRequest.post("/dramas/", newDrama)
        return res.data
    },
        {
            onSuccess: async (data) => {
                queryClient.invalidateQueries(["dramas"]);
            }
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(user);
        setUser({ name: '', status: '', avatar: '' , type: ''}); // Reset form
    };

    return (
        <div className="form-container">
            <h1>ADD Drama</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={user.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Avatar</label>
                    <input
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add</button>
            </form>
        </div>
    );
}

export default AddDrama