import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setValue(0);
        } else if (location.pathname === "/movies") {
            setValue(1);
        } else if (location.pathname === "/series") {
            setValue(2);
        } else if (location.pathname === "/search") {
            setValue(3);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate("/");
        } else if (newValue === 1) {
            navigate("/movies");
        } else if (newValue === 2) {
            navigate("/series");
        } else if (newValue === 3) {
            navigate("/search");
        }
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Trending"
                icon={<WhatshotIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Movies"
                icon={<MovieIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="TV Series"
                icon={<TvIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Search"
                icon={<SearchIcon />}
            />
        </BottomNavigation>
    );
}
