import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiFillCloseCircle } from "react-icons/ai";
import noImg from "./No-Image.webp";
import { Container } from "./Navbar";
import TrailerMovies from "../trailer/TrailerMovies";

const Movies = () => {
  const [i, setI] = useState(1);

  const { toggel, inputValue } = useContext(Container);

  const input = inputValue;

  const [moviesData, setMoviesData] = useState([]);

  const [trailer, setTrailer] = useState(true);

  const [title, setTitle] = useState("");

  const shown = input ? "search" : "discover";

  const Api = `https://api.themoviedb.org/3/${shown}/movie`;

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const MoviesCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "332bf6f2494947a00f06179fa43320b9",
        query: input,
        page: i,
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };

  useEffect(() => {
    setTimeout(() => {
      MoviesCall();
    }, 100);
  }, [input, i]);

  const moviesTitle = (movie) => {
    setTitle(movie.title);
    setTrailer(!trailer);
  };

  const handleclick = () => {
    setI(i + 1);
  };

  return (
    <div className={toggel ? "mainBgColor" : ""}>
      <div className="movies-container">
        {moviesData.map((movie) => (
          <div id={trailer ? "container" : "NoContainer"} key={movie.id}>
            <AiFillPlayCircle
              id={trailer ? "playIcon" : "hide"}
              onClick={() => moviesTitle(movie)}
            />
            <img
              src={movie.poster_path ? `${imgUrl}${movie.poster_path}` : noImg}
              alt={movie.title}
              onClick={() => moviesTitle(movie)}
            />
            <h3
              id={movie.title.length > 28 ? "smaller-Text" : ""}
              className={toggel ? "mainColor" : "secondaryColor"}
            >
              {movie.title ? movie.title : "Name not found"}
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

export default Movies;
