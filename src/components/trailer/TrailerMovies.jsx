import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { Container } from "../page/Navbar";

const TrailerMovies = ({ moviesTitel }) => {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("no vidiew");

  const { toggel } = useContext(Container);

  function handleSearch() {
    setVideo(moviesTitel);
    movieTrailer(video).then((res) => {
      setVideoURL(res);
    });
  }

  useEffect(() => {
    handleSearch();
  }, [videoURL]);

  return (
    <>
      <div className="Container"></div>
      <div className="player">
        <h2 id={toggel ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {moviesTitel}
        </h2>
        <ReactPlayer
          url={videoURL}
          controls={true}
          playing={true}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
};

export default TrailerMovies;
