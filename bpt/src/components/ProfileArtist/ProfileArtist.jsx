import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import './ProfileArtist.css';

const ProfileArtist = ({ artistId }) => {

    const { isLoading, error, data: artist } = useQuery(["artist"], () =>
        makeRequest.get("/artists/info/" + artistId).then((res) => {
            return res.data;
        })
    );

    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({
        artistId: '',
        name: '',
        birth: '',
        city: '',
        avatar: '',
        nickname: '',
        rating: ''
    });
    useEffect(() => {
        if (artist) {
            setData({
                artistId: artist.id,
                name: artist.name,
                birth: artist.birth,
                city: artist.city,
                avatar: artist.avatar,
                nickname: artist.nickname,
                rating: artist.rating
            });
        }
    }, [artist]);
    // Hàm xử lý khi bấm nút "Sửa" hoặc "Lưu"
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Hàm xử lý khi thay đổi các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (data) => {
            console.log(data)
            return makeRequest.put("/artists", data.data);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["artists"]);
                queryClient.invalidateQueries(["artist"]);
            },
        }
    );
    // Hàm xử lý khi lưu dữ liệu
    const handleSave = () => {
        // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

        mutation.mutate({ data })
        setIsEditing(false);
    };

    return (
        <div className='left-profile'>
            <div className="profile-header ">
                <div className='align-image'><div className="artist-image" >
                    <img src={data.avatar} alt="Không có gì cả" /></div>
                    <h1 className="username">{data.name}</h1>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="bio">Ta là bà hoàng tài nguyên</p>
                    )}

                </div>
            </div>

            <div className="profile-content">
                <div className='option-profile'> <h2>Info</h2>
                    {/* Nút sửa và lưu */}
                    <div className='button-edit-artist'>
                        {isEditing ? (
                            <button onClick={handleSave}>Lưu</button>
                        ) : (
                            <button onClick={toggleEdit}>Sửa</button>
                        )}
                    </div></div>

                <ul>
                    <li>
                        <strong>Nickname</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nickname"
                                value={data.nickname}
                                onChange={handleChange}
                            />
                        ) : (
                            data.nickname
                        )}
                    </li>
                    <li>
                        <strong>Birth</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="birth"
                                value={data.birth}
                                onChange={handleChange}
                            />
                        ) : (
                            data.birth
                        )}
                    </li>
                    <li>
                        <strong>City</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                            />
                        ) : (
                            data.city
                        )}
                    </li>
                    <li>
                        <strong>Rating</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="rating"
                                value={data.rating}
                                onChange={handleChange}
                            />
                        ) : (
                            data.rating
                        )}
                    </li>
                    <li>

                        {isEditing && (
                            <div>
                                <strong>Avatar</strong>
                                <input
                                    type="text"
                                    name="avatar"
                                    value={data.avatar}
                                    onChange={handleChange}
                                />
                            </div>

                        )}
                    </li>
                </ul>
            </div>


        </div>
    );

}

export default ProfileArtist