import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalogue = ({ movies, user }) => {
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100 });
    const [filteredMovies, setFilteredMovies] = useState([]);

    const navigate = useNavigate();

    // Filter movies by favorites and price
    const filterMovies = () => {
        const favorites = movies.filter((movie) =>
            user.favoriteMovies?.includes(movie.trackId)
        );
        const priceFiltered = favorites.filter(
            (movie) =>
                movie.collectionPrice >= priceFilter.min &&
                movie.collectionPrice <= priceFilter.max
        );
        setFilteredMovies(priceFiltered);
    };

    // Update price filter and refilter movies
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceFilter((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleNavigation = (id, data) => {
        sessionStorage.setItem("ID", id);
        navigate(`/details`, { state: { data } });
    };

    // Filter movies on mount or price change
    React.useEffect(() => {
        filterMovies();
    }, [movies, user.favoriteMovies, priceFilter]);

    return (
        <>
            <section className="section section--first">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section__wrap">
                                <h1 className="section__title section__title--head">
                                    Favourites
                                </h1>
                                <ul className="breadcrumbs">
                                    <li className="breadcrumbs__item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumbs__item breadcrumbs__item--active">
                                        Favourites
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="section section--catalog">
                <div className="container">
                    <div className="row">
                        {/* Price Filter Controls */}
                        <div className="col-12 mb-4">
                            <div className="filter-controls">
                                <label>
                                    Min Price:
                                    <input
                                        type="number"
                                        name="min"
                                        min={0}
                                        value={priceFilter.min}
                                        onChange={handlePriceChange}
                                        className="form-control"
                                    />
                                </label>
                                <label>
                                    Max Price:
                                    <input
                                        type="number"
                                        name="max"
                                        value={priceFilter.max}
                                        onChange={handlePriceChange}
                                        className="form-control"
                                    />
                                </label>
                                <button
                                    className="btn btn-primary ml-2"
                                    onClick={filterMovies}
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>

                        {/* Render Filtered Movies */}
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((ele, ind) => (
                                <div
                                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                                    key={ind}
                                >
                                    <div className="item">
                                        <div className="item__cover">
                                            <img
                                                src={ele?.artworkUrl100}
                                                className="w-full max-w-[416px] h-[320px]"
                                                alt=""
                                            />
                                            <a
                                                href="details.html"
                                                className="item__play"
                                            >
                                                <i className="ti ti-player-play-filled"></i>
                                            </a>
                                            <span className="item__rate item__rate--green">
                                                ${ele?.collectionPrice}
                                            </span>
                                            <button
                                                className="item__favorite"
                                                type="button"
                                            >
                                                <i className="ti ti-bookmark"></i>
                                            </button>
                                        </div>
                                        <div className="item__content">
                                            <h3 className="item__title">
                                                <a
                                                    onClick={() =>
                                                        handleNavigation(
                                                            ele.trackId,
                                                            ele
                                                        )
                                                    }
                                                >
                                                    {ele?.trackCensoredName}
                                                </a>
                                            </h3>
                                            <span className="item__category">
                                                <a href="#">
                                                    {ele?.primaryGenreName}
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p>No movies found in the selected price range.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalogue;
