import React from 'react';
import { Link } from 'react-router-dom';
import Figure from "../../components/Figure/Figure"
import "./FigureOfArtist.css"
import axios from "axios";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const FigureOfArtist = ({ artistId }) => {

    const { isLoading, error, data } = useQuery(["FOA"], () =>
        makeRequest.get("/figures/artist/" + artistId).then((res) => {
            return res.data;
        })
    );

    console.log(data)

    return (
        <div>
            <div style={{marginLeft:'1rem'}}>Tổng vai: {data?.length}</div>
            <div className="figure-list">
                {error
                    ? "Something went wrong"
                    : isLoading
                        ? "loading"
                        : data?.map((figure) => (
                            <Figure key={figure.id} figure={figure} />
                        ))}
            </div>
        </div>
    )
}

export default FigureOfArtist