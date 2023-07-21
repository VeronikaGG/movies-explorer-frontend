import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies">
      {props.movies?.map((movie, index) => {
        return (
          <MoviesCard
          key={index}
          movie={movie}
          onSaveMovie={props.onSaveMovie}
          onDeleteMovie={props.onDeleteMovie}
        />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
