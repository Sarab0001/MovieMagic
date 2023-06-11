import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
        const headers = {
            Authorization:
                `Bearer ${process.env.REACT_APP_API_KEY}`,
            accept: "application/json",
        };

        try {
            const response = await axios.get(url, { headers });
            const { data } = response;
            setGenres(data?.genres);
            console.log("genres", data?.genres);
            // Handle the API response data
        } catch (error) {
            console.error("Error:", error.message);
            // Handle the error
        }

    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres([]); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres && selectedGenres?.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres && genres?.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    );
};

export default Genres;