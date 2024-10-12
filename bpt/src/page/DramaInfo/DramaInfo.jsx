import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FigureOfDrama from '../../components/FigureOfDrama/FigureOfDrama';
import FiguringOfDrama from '../../components/FiguringOfDrama/FiguringOfDrama';
import InfoDrama from '../../components/InfoDrama/InfoDrama';
import './DramaInfo.css';

const DramaInfo = () => {
    const dramaId = parseInt(useLocation().pathname.split("/")[2])

    console.log(dramaId)

    const [isView, setIsView] = useState(false);

    const toggleView = () => {
        setIsView(!isView);
    };

    return (
        <div class="container">
            <div class="left">
                <InfoDrama dramaId={dramaId}/>
            </div>
            {!isView ? (
                <div class="right">
                    <button onClick={toggleView}></button>
                    <FigureOfDrama dramaId={dramaId} />
                    {/* Diễn viên */}
                </div>
            ) : (
                <div class="right">

                    <button onClick={toggleView}></button>
                    <FiguringOfDrama  dramaId={dramaId}/>
                    {/* Vai Diễn */}
                </div>
            )}
        </div>
    )
}

export default DramaInfo