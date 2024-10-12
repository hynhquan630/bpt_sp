import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import './AddArtist.css';

const AddArtist = () => {
    const [user, setUser] = useState({
        name: '',
        dob: '',
        city: '',
        avatar: null
    });

    const queryClient = useQueryClient()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const mutation = useMutation(async (newArtist) => {
        const res = await makeRequest.post("/artists/", newArtist)
        return res.data
    },
        {
            onSuccess: async (data) => {
                queryClient.invalidateQueries(["artists"]);
            }
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(user);
        setUser({ name: '', dob: '', city: '' ,avatar:''}); // Reset form
    };

    return (
        <div className="form-container">
            <h1>ADD ARTIST</h1>
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
                    <label htmlFor="dob">Birth</label>
                    <input
                        type="text"
                        id="dob"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add</button>
            </form>
        </div>
    );
}

export default AddArtist