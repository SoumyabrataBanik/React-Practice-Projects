import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import NavBarResults from "./Components/NavBar/NavBarResults";
import Search from "./Components/UI/Search";
import MovieFoundList from "./Components/Main/MovieFound/MovieFoundList";
import Box from "./Components/UI/Box";
import Summary from "./Components/Main/MovieWatched/Summary";
import MovieWatchedList from "./Components/Main/MovieWatched/MovieWatchedList";
import Loader from "./Components/UI/Loader";
import ErrorMessage from "./Components/UI/ErrorMessage";
import MovieDetails from "./Components/Main/MovieWatched/MovieDetails";
import StarRating from "./Components/UI/StarRating/StarRating";
import PropTypes from "prop-types";
import { useMovie } from "./Components/Hooks/useMovies";
import { useLocalStorageState } from "./Components/Hooks/useLocalStorageState";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  message: PropTypes.array,
};

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error, KEY } = useMovie(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');


  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteMovie = (id) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NavBarResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader>Loading...</Loader> : <MovieFoundList movies={movies} />} */}
          {isLoading && <Loader>Loading...</Loader>}
          {!isLoading && !error && (
            <MovieFoundList movies={movies} onSelectId={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={handleCloseMovie}
              KEY={KEY}
              onWatchMovie={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieWatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
