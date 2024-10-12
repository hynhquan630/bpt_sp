import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import './Artist.css';

const Artist = ({ artist }) => {

    const { isLoading, error, data } = useQuery(["FAA", artist.id], () =>
        makeRequest.get("/figures/artist/" + artist.id).then((res) => {
            return res.data;
        })
    );
    let total = 0;
    let nb = 0;

    let ext = 0;
    console.log(data)
    if (data) {
        data.map((figure) => {
            total = total + scoreIns(figure.ver)

            if (figure.ver == 'cameo') ext = ext + 1;
            nb = nb + 1
        })
    }

    let percent = (total / (nb - ext)).toFixed(1)
    return (
        <div className="artist-card">
            <Link to={`/profile/${artist.id}`} className="link">
                <div className="artists-image" >
                    <img src={artist.avatar} alt="Không có gì cả" /></div>
                <p className="artist-name">{artist.name}</p>
                <p className="artist-birth">{artist.birth}</p>
                <p className="artist-city">{total} - {nb} - {percent}%</p>
            </Link>
        </div>
    )
}
let scoreIns = (viral) => {
    if (viral == 'main') return 100;
    else if (viral == 'part') return 50;
    else if (viral == 'support') return 25;
    else if (viral == 'youth') return 20;
    else if (viral == 'cameo') return 10;
    else return 0;
}

export default Artist