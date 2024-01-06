import { useEffect, useState } from "react";
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

const KEY = "35c4c73c";

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const controller = new AbortController();

  const handleSelectedMovie = (id) => {
    setSelectedId(selectedId => id===selectedId ? null : id);
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  const handleWatchedMovie = (movie) => {
    setWatched(watched => [...watched, movie]);
  }

  const handleDeleteMovie = (id) => {
    setWatched(watched.filter(movie=>movie.imdbID!==id));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal}
        );
        if (!res.ok)
          throw new Error("Something Went Wrong with fetching movie data!");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name!=="AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();

    fetchMovies();

    return () => {
      controller.abort();
    }
  }, [query]);

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
          {!isLoading && !error && <MovieFoundList movies={movies} onSelectId={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails id={selectedId} onCloseMovie={handleCloseMovie} KEY={KEY} onWatchMovie={handleWatchedMovie} watched={watched} />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieWatchedList watched={watched} onDeleteMovie={handleDeleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
