import React from 'react';
import { Link } from 'react-router-dom';
import './DOArtist.css';

const DOArtist = ({dOArtist}) => {


    return (
        <div className="dOArtist-card">
            <Link to={`/info-drama/${dOArtist.dramaId}`} className="link">
                <img src={dOArtist.avatarDrama} alt="Không có gì cả" className="drama-artist-image" />
                <h2 className="drama-artist-name">{dOArtist.dramaName}</h2>
                <p className="drama-artist-type">{dOArtist.type}</p>
                <p className="drama-artist-status">{dOArtist.status}</p>
            </Link>
        </div>
    )
}

export default DOArtist