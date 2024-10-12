import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RankingCard.css';

const RankingCard = ({ artist, rank, type }) => {

  return (
    <div>
      <Link to={`/profile/${artist.id}`} className="link">
        <div className={`artist-rank-card highlight-${rank}`}>
          <span className={`artist-rank-info rank-${rank}`}>{rank}</span>
          <div className="avatar-rank-card" >
            <img src={artist.avatar} alt={`${artist.name}'s avatar`} />
          </div>
          <span className="artist-rank-name">{artist.name}</span>
          <span className="artist-type-info">
            {type === 1 ? artist.ndrama :
              type === 2 ? artist.score :
                type === 3 ? artist.main :
                  type === 4 ? artist.rating :
                    null}{type === 3 && "%"}</span>
        </div>

      </Link></div>
  );
};

export default RankingCard;
