import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../apiClient';

const MovieDetails = () => {
    const location = useLocation();
    const [details, setDetails] = useState(location.state?.data || []);
    const [data, setData] = useState([]);
    const [loadData, setLoadData] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    let navigate = useNavigate()
    const id = sessionStorage.getItem('ID');    
    useEffect(() => {
        const loadData = async () => {
            try {
                // const result = await fetchDataById('api/service', id);
                // setLoadData(result);
                setDetails(location.state?.data)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        loadData();
    }, [id]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchMovies();
                console.log('result', result?.results)
                const genreMatchedMovies = result?.results.filter(
                    (movie) => movie.primaryGenreName === details?.primaryGenreName
                );
                console.log('genreMatchedMovies', genreMatchedMovies);
                setFilteredMovies(genreMatchedMovies);
                setData(result.results);
            } catch (error) {
                console.error('Error fetching data', error);
            }
            finally {
                // setLoading(false);
            }
        };
        loadData();
    }, []);
    // useEffect(() => {
    //     // Filter movies with the same genre
    //     const genreMatchedMovies = data.filter(
    //         (movie) => movie.primaryGenreName === details?.primaryGenreName
    //     );
    //     console.log('genreMatchedMovies',genreMatchedMovies);
    //     setFilteredMovies(genreMatchedMovies);
    // }, []);
    const handleNavigation = (id,data) => {
        sessionStorage.setItem('ID', id);
        navigate(`/details`, { state: { data } });
    };
    return (
        <div>
            <section class="section section--details">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="section__title section__title--head">{details?.collectionCensoredName}</h1>
                        </div>
                        <div class="col-12 col-xl-6">
                            <div class="item item--details">
                                <div class="row">
                                    {/* <!-- card cover --> */}
                                    <div class="col-12 col-sm-5 col-md-5 col-lg-4 col-xl-6 col-xxl-5">
                                        <div class="item__cover">
                                            <img src={details?.artworkUrl100} alt="" />
                                            <span class="item__rate item__rate--green">{details?.collectionPrice}</span>
                                            {/* <button class="item__favorite item__favorite--static" type="button"><i class="ti ti-bookmark"></i></button> */}
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-7 col-lg-8 col-xl-6 col-xxl-7">
                                        <div class="item__content">
                                            <ul class="item__meta">
                                                <li><span>Director:</span> <a href="#">{details?.artistName}</a></li>
                                                {/* <li><span>Cast:</span> <a href="actor.html">Brian Cranston</a> <a href="actor.html">Jesse Plemons</a> <a href="actor.html">Matt Jones</a> <a href="actor.html">Jonathan Banks</a> <a href="actor.html">Charles Baker</a> <a href="actor.html">Tess Harper</a></li> */}
                                                <li><span>Genre:</span> <a href="#">{details?.primaryGenreName}</a></li>
                                                <li><span>Premiere::</span> {details?.releaseDate}</li>
                                            </ul>

                                            <div class="item__description scrollable-content">
                                                <p>{details?.longDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="video-container">
                                {details?.previewUrl ? (
                                    <video
                                        controls
                                        crossOrigin="anonymous"
                                        playsInline
                                        poster={details?.previewUrl}
                                        id="player"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevents infinite loop
                                            e.target.parentNode.innerHTML = `<div class="fallback-message">Video not available</div>`;
                                        }}
                                    >
                                        <source src={details?.previewUrl} type="video/mp4" size="576" />
                                        <source src={details?.previewUrl} type="video/mp4" size="720" />
                                        <source src={details?.previewUrl} type="video/mp4" size="1080" />
                                        <track
                                            kind="captions"
                                            label="Français"
                                            srcLang="fr"
                                            src={details?.previewUrl}
                                        />
                                    </video>
                                ) : (
                                    <div className="fallback-message">
                                        <p>Video not available</p>
                                        <p>Stay tuned for more updates!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section class="content">
                <div class="content__head content__head--mt">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                {/* <!-- content title --> */}

                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        {/* <!-- sidebar --> */}
                        <div class="col-12 col-lg-4">
                            <div class="row">
                                {/* <!-- section title --> */}
                                <div class="col-12">
                                    <h2 class="section__title section__title--sidebar">You may also like...</h2>
                                </div>
                                {filteredMovies?.map((ele, ind) => {
                                    return (
                                        <div class="col-3 col-sm-4 col-lg-3">
                                            <div class="item">
                                                <div class="item__cover">
                                                    <img src={ele?.artworkUrl100} alt="" />
                                                    <a href="details.html" class="item__play">
                                                        <i class="ti ti-player-play-filled"></i>
                                                    </a>
                                                    <span class="item__rate item__rate--green">{ele?.collectionPrice}</span>
                                                    <button class="item__favorite" type="button"><i class="ti ti-bookmark"></i></button>
                                                </div>
                                                <div class="item__content">
                                                    <h3 class="item__title"><a onClick={() => handleNavigation(ele.trackId,ele)}>{ele?.trackCensoredName}</a></h3>
                                                    <span class="item__category">
                                                        <a href="#">{ele?.primaryGenreName}</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* <div class="col-6 col-sm-4 col-lg-6"> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default MovieDetails