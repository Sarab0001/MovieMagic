import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

const Series = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    const fetchSeries = async () => {
        const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;
        const headers = {
            Authorization:
                `Bearer ${process.env.REACT_APP_API_KEY}`,
            accept: "application/json",
        };

        try {
            const response = await axios.get(url, { headers });
            const { data } = response;
            setContent(data.results);
            setNumOfPages(data.total_pages);
            console.log("content", content);
            // Handle the API response data
        } catch (error) {
            console.error("Error:", error.message);
            // Handle the error
        }
        // console.log(data);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    return (
        <div>
            <span className="pageTitle">Discover Series</span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="tv"
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};

export default Series;