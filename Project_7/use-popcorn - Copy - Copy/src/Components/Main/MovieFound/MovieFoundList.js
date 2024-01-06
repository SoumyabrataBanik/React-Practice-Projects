import MovieFoundListItem from "./MovieFoundListItem";

const MovieFoundList = ({ movies, onSelectId }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieFoundListItem movie={movie} key={movie.imdbID} onSelectId={onSelectId} />
            ))}
        </ul>
    );
};

export default MovieFoundList;
