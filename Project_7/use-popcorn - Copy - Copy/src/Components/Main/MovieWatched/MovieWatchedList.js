import MovieWatchedListItem from "./MovieWatchedListItem";

const MovieWatchedList = ({watched, onDeleteMovie}) => {
    return (
        <ul className="list list-movies">
            {watched.map((movie) => (
                <MovieWatchedListItem movie={movie} key={movie.imdbID} onDeleteMovie={onDeleteMovie} />
            ))}
        </ul>
    );
};

export default MovieWatchedList;