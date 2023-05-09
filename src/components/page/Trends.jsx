import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillPlayCircle } from "react-icons/ai";
import { Container } from "./Navbar";
import noImg from "./No-Image.webp";
import TrailerMovies from "../trailer/TrailerMovies";

const Trends = () => {
  const [i, setI] = useState(1);

  const { toggel } = useContext(Container);

  const [trailer, setTrailer] = useState(true);

  const [title, setTitle] = useState("");

  const [trendsData, setTrendsData] = useState([]);

  const Api = `https://api.themoviedb.org/3/trending/all/week`;

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const Trends = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "332bf6f2494947a00f06179fa43320b9",
        page: i,
      },
    });
    const results = data.data.results;
    setTrendsData(results);
  };

  useEffect(() => {
    setTimeout(() => {
      Trends();
    }, 100);
  }, [i]);

  const trendsTitle = (trends) => {
    setTitle(trends.title);
    setTrailer(!trailer);
  };

  const handleclick = () => {
    setI(i + 1);
  };

  return (
    <div className={toggel ? "mainBgColor" : ""}>
      <div className="movies-container">
        {trendsData.map((trends) => (
          <div id={trailer ? "container" : "NoContainer"} key={trends.id}>
            <AiFillPlayCircle
              id={trailer ? "playIcon" : "hide"}
              onClick={() => trendsTitle(trends)}
            />
            <img
              src={
                trends.poster_path ? `${imgUrl}${trends.poster_path}` : noImg
              }
              alt={trends.title}
              onClick={() => trendsTitle(trends)}
            />
            <h3
              id="smaller-Text"
              className={toggel ? "mainColor" : "secondaryColor"}
            >
              {trends.title ? trends.title : "Name not found"}
            </h3>
          </div>
        ))}
        {trailer ? (
          ""
        ) : (
          <TrailerMovies moviesTitel={title ? title : "no name"} />
        )}
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

export default Trends;
