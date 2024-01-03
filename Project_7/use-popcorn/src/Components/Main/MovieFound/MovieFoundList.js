import MovieFoundListItem from "./MovieFoundListItem";

const MovieFoundList = ({movies}) => {

    return (
        <ul className="list">
            {movies?.map((movie) => (
                <MovieFoundListItem movie={movie}/>
            ))}
        </ul>
    );
};

export default MovieFoundList;