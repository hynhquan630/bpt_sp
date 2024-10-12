import React from 'react';
import { Link } from 'react-router-dom';
import './Drama.css';

const Drama = ({drama}) => {
    return (
        <div className="drama-card">
            <Link to={`/info-drama/${drama.id}`}className="link">
                <img src={drama.avatar} alt="Không có gì cả" className="drama-image" />
                <h2 className="drama-name">{drama.name}</h2>
                <p className="drama-type">{drama.type}</p>
                <p className="drama-status">{drama.status}</p>
            </Link>
        </div>
    )
}

export default Drama