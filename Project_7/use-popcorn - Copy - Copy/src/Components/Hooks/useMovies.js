import { useState, useEffect } from "react";


const KEY = "35c4c73c";

export function useMovie(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        // callback?.();

        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );
                if (!res.ok)
                    throw new Error("Something Went Wrong with fetching movie data!");
                const data = await res.json();
                if (data.Response === "False") throw new Error("Movie Not Found");
                setMovies(data.Search);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    return {movies, isLoading, error, KEY};
}
