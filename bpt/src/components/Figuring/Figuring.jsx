import React from 'react';
import { Link } from 'react-router-dom';
import './Figuring.css';

const Figuring = ({figuring}) => {

    

    return (
        <div className="figuring-card">
             <Link to={`/profile/${figuring.artistId}`} className="link">
            <div className="figuring-image" >
                <img src={figuring?.avatarArtist?figuring?.avatarArtist:"https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg"} alt="https://staticfvvn.s3-ap-southeast-1.amazonaws.com/fv4uploads/uploads/users/le/9ro/i3r/avatar/thumb_356987957833475.jpg" /></div>
            <p className="figuring-name">{figuring.artistName}</p>
            <p className="figuring-ver">{figuring.ver}</p>
            </Link>
        </div>
    )
}

export default Figuring