import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillCloseCircle } from "react-icons/ai";
import noImg from "./No-Image.webp";
import { Container } from "./Navbar";
import TrailerMovies from "../trailer/TrailerMovies";

const TvShows = () => {
  const [i, setI] = useState(1);

  const { toggel, inputValue } = useContext(Container);

  const input = inputValue;

  const shown = input ? "search" : "discover";

  const Api = `https://api.themoviedb.org/3/${shown}/tv`;

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const [trailer, setTrailer] = useState(true);

  const [title, setTitle] = useState("");

  const [tvShowsdata, setTvShowsdata] = useState([]);

  const tvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "332bf6f2494947a00f06179fa43320b9",
        query: input,
        page: i,
      },
    });
    const results = data.data.results;
    setTvShowsdata(results);
  };

  useEffect(() => {
    setTimeout(() => {
      tvShows();
    }, 100);
  }, [input, i]);

  const tvShowsTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };

  const handleclick = () => {
    setI(i + 1);
  };

  return (
    <div className={toggel ? "mainBgColor" : ""}>
      <div className="movies-container">
        {tvShowsdata.map((shows) => (
          <div id={trailer ? "container" : "NoContainer"} key={shows.id}>
            <AiFillPlayCircle
              id={trailer ? "playIcon" : "hide"}
              onClick={() => tvShowsTitle(shows)}
            />
            <img
              src={shows.poster_path ? `${imgUrl}${shows.poster_path}` : noImg}
              alt={shows.name}
              onClick={() => tvShowsTitle(shows)}
            />
            <h3
              id={shows.name.length > 28 ? "smaller-Text" : ""}
              className={toggel ? "mainColor" : "secondaryColor"}
            >
              {shows.name ? shows.name : "Name not found"}
            </h3>
          </div>
        ))}
        {trailer ? "" : <TrailerMovies moviesTitel={title} />}
        <AiFillCloseCircle
          id={trailer ? "Nothing" : "Exit1"}
          className={trailer ? "DarkTheme" : "LightThemeClose"}
          onClick={() => setTrailer(true)}
        />
      </div>
      <center>
        <button className="button" onClick={handleclick}>
          Read More
        </button>
      </center>
    </div>
  );
};

export default TvShows;
