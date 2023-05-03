import React, { useEffect } from "react";
import "./Loader.scss";
import loaderImg from "./img/WavyCircle.svg";

const Loader: React.FC = () => {
    useEffect(() => {
        removeLoader();
    }, []);

    return (
        <>
            <div className="loader">
                <img className="loader-img" src={loaderImg} alt="loader-icon" />
            </div>
        </>
    );
};

const removeLoader = () => {
    const loaderDiv = document.querySelector(".loader");
    if (loaderDiv) {
        setTimeout(() => {
            loaderDiv.remove();
        }, 3000);
    }
};

export default Loader;
