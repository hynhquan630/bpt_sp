import React from 'react';
import { Link } from 'react-router-dom';
import './FODrama.css';

const FODrama = ({figure}) => {
    
console.log(figure)
    return (
        <div className="FODrama-card">
             <Link to={`/profile/${figure.artistId}`} className="link">
            <div className="FODrama-image" >
                <img src={figure?.avatar?figure?.avatar:"https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg"} alt="https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg" /></div>
            <p className="FODrama-name">{figure.name}</p>
            <p className="FODrama-ver">{figure.ver}</p>
            </Link>
        </div>
    )
}

export default FODrama