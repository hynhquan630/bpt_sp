import React from 'react';
import { Link } from 'react-router-dom';
import Artist from "../../components/Artist/Artist"
import "./Artists.css"
import axios from "axios";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Artists = () => {

  const { isLoading, error, data } = useQuery(["artists"], () =>
    makeRequest.get("/artists").then((res) => {
      return res.data;
    })
  );


  return (
    <div>
      <div className="artist-list">
        {error
          ? "Something went wrong"
          : isLoading
            ? "loading"
            : data?.map((artist) => (
              <Artist key={artist.id} artist={artist}/>
            ))}
      </div>
    </div>
  )
}

export default Artists