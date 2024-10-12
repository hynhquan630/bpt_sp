import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Profile.css';
import ProfileArtist from '../../components/ProfileArtist/ProfileArtist';
import FigureOfArtist from "../../components/FigureOfArtist/FigureOfArtist"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import DramaOfArtist from '../../components/DramaOfArtist/DramaOfArtist';
const Profile = () => {

    const artistId = parseInt(useLocation().pathname.split("/")[2])

    console.log(artistId)

    const [isView, setIsView] = useState(false);

    const toggleView = () => {
        setIsView(!isView);
    };
    return (

        <div class="container">
            <div class="left">
                <ProfileArtist artistId={artistId} />

            </div>
            {isView ? (
                <div class="right">
                    <button onClick={toggleView}></button>
                    <FigureOfArtist artistId={artistId} />
                   
                </div>
            ) : (
                <div class="right">

                    <button onClick={toggleView}></button>
                    <DramaOfArtist artistId={artistId} />
                </div>
            )}
        </div>
    )
}

export default Profile