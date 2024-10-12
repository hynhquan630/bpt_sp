import React from 'react';
import { Link } from 'react-router-dom';
import './Figure.css';

const Figure = ({figure}) => {



    return (
        <div className="figure-card">
             <Link to={`/info-drama/${figure.dramaId}`} className="link">
            <div className="figure-image" >
                <img src={figure?.avatar?figure?.avatar:"https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg"} alt="https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg" /></div>
            <p className="figure-name">{figure.name}</p>
            <p className="figure-ver">{figure.ver}</p>
            </Link>
        </div>
    )
} 

export default Figure