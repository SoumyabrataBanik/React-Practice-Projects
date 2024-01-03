import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import { useState } from "react";
import tempMovieData from "./Components/Data/TempMovieData";
import tempWatchedData from "./Components/Data/TempWatchedData";
import NavBarResults from "./Components/NavBar/NavBarResults";
import Search from "./Components/UI/Search";
import MovieFoundList from "./Components/Main/MovieFound/MovieFoundList";
import Box from "./Components/UI/Box";
import Summary from "./Components/Main/MovieWatched/Summary";
import MovieWatchedList from "./Components/Main/MovieWatched/MovieWatchedList";

export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NavBarResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieFoundList movies={movies} />
        </Box>

        <Box>
          <Summary watched={watched} />

          <MovieWatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
