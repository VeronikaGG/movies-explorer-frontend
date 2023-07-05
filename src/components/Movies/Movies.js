import React from 'react';
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import More from '../More/More';

function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <More />
    </>
  );
}

export default Movies;
