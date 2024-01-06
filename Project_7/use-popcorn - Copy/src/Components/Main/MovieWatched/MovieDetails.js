import { useEffect, useState } from "react";
import Loader from "../../UI/Loader";
import StarRating from "../../UI/StarRating/StarRating";

const MovieDetails = ({ id, onCloseMovie, KEY, onWatchMovie, watched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(
        watched.map((w) => (w.imdbID === id ? w.userRating : null))
    );
    const isWatched = watched.map((w) => w.imdbID).includes(id);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === id
    )?.userRating;

    useEffect(() => {
        const setMovieFunction = async () => {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        };
        setMovieFunction();
    }, [KEY, id]);

    const {
        imdbID,
        Title: title,
        Year: year,
        Rated: rated,
        Released: released,
        Runtime: runtime,
        Genre: genre,
        Director: director,
        Writer: writer,
        Actors: actors,
        Plot: plot,
        Language: language,
        Poster: poster,
        imdbRating,
    } = movie;

    const addWatchMovie = () => {
        const newMovie = {
            ...movie,
            imdbRating: Number(imdbRating),
            userRating: userRating,
            runtime: Number(runtime.split(" ").at(0)),
        };
        onWatchMovie(newMovie);
        onCloseMovie(newMovie.imdbRating);
    };

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

    useEffect(() => {

        const callback = (e) => {
            if (e.code === "Escape"){
                onCloseMovie();
            }
        }

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        }
    }, [onCloseMovie]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={title} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb Rating
                            </p>
                            <p>
                                <b>Available Languages:</b> {language}
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        defaultRating={userRating}
                                        maxRating={10}
                                        onSetTestRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button className="btn-add" onClick={addWatchMovie}>
                                            + Add Movie
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You have rated the movie {watchedUserRating} <span>🌟</span>
                                </p>
                            )}
                        </div>
                        <p>{plot}</p>
                        <p>
                            <b>Starring: </b>
                            {actors}
                        </p>
                        <p>
                            <b>Director: </b>
                            {director}
                        </p>
                        <p>
                            <b>Writer: </b>
                            {writer}
                        </p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
