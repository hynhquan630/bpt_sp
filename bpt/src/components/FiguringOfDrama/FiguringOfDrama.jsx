import React from 'react';
import { Link } from 'react-router-dom';
import Figuring from "../../components/Figuring/Figuring"
import "./FiguringOfDrama.css"
import axios from "axios";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const FiguringOfDrama = ({ dramaId }) => {

    const { isLoading, error, data } = useQuery(["figuring"], () =>
        makeRequest.get("/figures/figuring/" + dramaId).then((res) => {
            return res.data;
        })
    );

    console.log(data)

    return (
        <div>
            <div className="figuring-drama-list">
            {error
                    ? "Something went wrong"
                    : isLoading
                        ? "loading"
                        : data?.map((figuring) => (
                            <Figuring key={figuring.id} figuring={figuring} />
                        ))}
            </div>
        </div>
    )
}

export default FiguringOfDrama