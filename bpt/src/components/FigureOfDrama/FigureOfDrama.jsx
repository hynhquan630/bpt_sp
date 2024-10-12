import React from 'react';
import { Link } from 'react-router-dom';
import Figure from "../../components/Figure/Figure"
import "./FigureOfDrama.css"
import axios from "axios";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FODrama from '../FODrama/FODrama';

const FigureOfDrama = ({ dramaId }) => {

    const { isLoading, error, data } = useQuery(["FOD"], () =>
        makeRequest.get("/figures/figure/" + dramaId).then((res) => {
            return res.data;
        })
    );

    console.log(data)
    
    return (
        <div>
            <div className="figure-of-drama-list">
                {error
                    ? "Something went wrong"
                    : isLoading
                        ? "loading"
                        : data?.map((figure) => (
                            <FODrama key={figure.id} figure={figure} />
                        ))}
            </div>
        </div>
    )
}

export default FigureOfDrama