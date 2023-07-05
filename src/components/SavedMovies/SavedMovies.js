import React from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <div className='save-movie_box'></div>
    </>
  );
}

export default SavedMovies;
