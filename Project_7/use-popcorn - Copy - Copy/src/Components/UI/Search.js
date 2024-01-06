import { useRef } from "react";
import "../../index.css";
import { useKey } from "../Hooks/useKey";

const Search = ({ query, setQuery }) => {
    const input = useRef(null);

    useKey("Enter", function () {
            if (document.activeElement === input.current) return;
            input.current.focus();
            setQuery("");
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={input}
        />
    );
};

export default Search;
