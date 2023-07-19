import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { BASE__URL } from '../../utils/сonstants';
function MoviesCard(props) {
  let location = useLocation();

  let ButtonSaveClass = `${props.movie.isSaved ? "movie__save_active" : "movie__save"
    }`;
  let hours = Math.floor(props.movie.duration / 60);
  let min = props.movie.duration - hours * 60;

  function handleSaveMovie(e) {
    e.preventDefault();
    console.log(props.movie); // Добавьте эту строку
    props.onSaveMovie(props.movie);
  }


  function handleDeleteMovie(e) {
    e.preventDefault();
    props.onDeleteMovie(props.movie);
  }

  return (
    <section className="movie">
      <div className="movie__container">
        <div className="movie__info">
          <h2 className="movie__name">{props.movie.nameRU}</h2>
          <h2 className="movie__duration">
            {hours ? `${hours}ч` : ""} {min ? `${min}м` : ""}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Сохранить"
          className={`movie__button ${location.pathname === "/movies" ? ButtonSaveClass : "movie__hidden"
            }`}
          onClick={handleSaveMovie}
        />
        <button
          type="button"
          aria-label="Сохранить"
          className={`movie__button ${location.pathname === "/saved-movies"
              ? "movie__close"
              : "movie__hidden"
            }`}
          onClick={handleDeleteMovie}
        />
      </div>
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movie__img"
          alt={props.movie.nameRU || props.movie.nameEN}
          src={
            props.movie.image && props.movie.image.url
              ? `${BASE__URL}${props.movie.image.url}`
              : props.movie.image
          }
        />
      </a>
    </section>
  );
}

export default MoviesCard;
