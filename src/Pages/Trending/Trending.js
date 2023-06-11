import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
        const headers = {
            Authorization:
                `Bearer ${process.env.REACT_APP_API_KEY}`,
            accept: "application/json",
        };

        try {
            const response = await axios.get(url, { headers });
            const { data } = response;
            setContent(data?.results)
            console.log("content", content);
            // Handle the API response data
        } catch (error) {
            console.error("Error:", error.message);
            // Handle the error
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending Today</span>
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Trending;