import React, { createContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Routes, Route, NavLink } from "react-router-dom";
import Movies from "./Movies";
import TvShows from "./TvShows";
import Trends from "./Trends";
import NotFound from "./404/NotFound";

export const Container = createContext();

const Navbar = () => {
  const [toggel, setToggel] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const isActive = ({ isActive }) => {
    return { color: isActive ? "#ee9b00" : "#fff" };
  };

  return (
    <Container.Provider value={{ toggel, inputValue }}>
      <nav className={toggel ? "navBarColor" : "secondaryBgColor"}>
        <div className="nav-options">
          <NavLink to="/">
            <h1 id={toggel ? "" : "heading"}>Movies App</h1>
          </NavLink>
          <NavLink to="/" style={isActive}>
            <span id={toggel ? "Movies" : "MoviesLight"}>movies</span>
          </NavLink>
          <NavLink to="/tvShows" style={isActive}>
            <span id={toggel ? "Movies" : "MoviesLight"}>tv Shows</span>
          </NavLink>
          <NavLink to="/trending" style={isActive}>
            <span id={toggel ? "Movies" : "MoviesLight"}>trending</span>
          </NavLink>
        </div>
        <div className="input-group">
          <div className="input_text">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <AiOutlineSearch id="search" />
          </div>
          <div id="Color-switcher" onClick={() => setToggel(!toggel)}>
            <div
              id={toggel ? "Color-switcher-mover" : "Color-switcher-moved"}
            ></div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/tvShows" element={<TvShows />} />
        <Route path="/trending" element={<Trends />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container.Provider>
  );
};

export default Navbar;
