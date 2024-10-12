import React from 'react';
import { Link } from 'react-router-dom';
import Figure from "../../components/Figure/Figure"
import "./DramaOfArtist.css"
import axios from "axios";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DOArtist from "../../components/DOArtist/DOArtist"

const DramaOfArtist = ({ artistId }) => {

    const { isLoading, error, data } = useQuery(["DOA"], () =>
        makeRequest.get("/figures/drama/" + artistId).then((res) => {
            return res.data;
        })
    );

    console.log(data)

    return (
        <div>
            <div style={{marginLeft:'1rem'}}>Tổng vai: {data?.length}</div>
            <div className="drama-artist-list">
                {error
                    ? "Something went wrong"
                    : isLoading
                        ? "loading"
                        : data?.map((drama) => (
                            <DOArtist key={drama.id} dOArtist={drama} />
                        ))}
            </div>
        </div>
    )
}

export default DramaOfArtist