import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
        <div className="carouselItem">
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const url = `https://api.themoviedb.org/3/${media_type}/${id}/credits?language=en-US`;
        const headers = {
            Authorization:
                `Bearer ${process.env.REACT_APP_API_KEY}`,
            accept: "application/json",
        };

        try {
            const response = await axios.get(url, { headers });
            const { data } = response;
            setCredits(data.cast);
            // Handle the API response data
        } catch (error) {
            console.error("Error:", error.message);
            // Handle the error
        }
    };

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
};

export default Gallery;