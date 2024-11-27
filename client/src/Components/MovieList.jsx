import React, { useEffect, useState } from 'react'
import { fetchDataById, fetchMovies, postData } from '../apiClient';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie library

const MovieList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to manage initial loading
    const [isUser, setIsUser] = useState(false); // State to manage initial loading
    const [userData, setUserData] = useState({}); // State to manage initial loading
    let navigate = useNavigate()
    let authToken = JSON.parse(localStorage.getItem('authToken'));
    let userId = JSON.parse(localStorage.getItem('user'));
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const ID = sessionStorage.getItem('ID');    
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchMovies();
                console.log('result', result?.results)
                setData(result.results);
                // authToken = Cookies.get('authToken');
            } catch (error) {
                console.error('Error fetching data', error);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
        fetchUser();
    }, []);
    const handleFavoriteAction = async (trackId, action, userId) => {
        console.log(isUser, trackId, action, authToken)
        console.log('trackId', trackId)
        console.log('action', action)
        if (isUser) {
            try {
                // Call the API
                const response = await postData('api/favorite-movies', { trackId, action, userId });
                if (response.success) {
                    alert('Favorite updated successfully!');
                } else {
                    alert(response.message || 'Failed to update favorite');
                }
            } catch (error) {
                console.error('Error updating favorite:', error);
                alert('Something went wrong. Please try again.');
            }
        } else {
            // Show alert if the user is not logged in
            alert('Please login to add favorites!');
        }
    };

    const fetchUser = async () => {
        try {
            console.log('userID  in fetchUSer', userId)
            const result = await fetchDataById('api/user', userId);
            console.log('result  in fetchUSer', result)
            setUserData(result);
            if (result) {
                setIsUser(true)
            }
            // authToken = Cookies.get('authToken');
        } catch (error) {
            console.error('Error fetching data', error);
        }
        finally {
            setLoading(false);
        }
    };
    
    const handleNavigation = (id,data) => {
        sessionStorage.setItem('ID', id);
        navigate(`/details`, { state: { data } });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                {/* <ClipLoader color="#3498db" size={50} /> Customize the loader color and size */}
                Loading...
            </div>
        );
    }
    // if (isLoading) {
    //     return (
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             {/* <div className="spinner">Loading...</div> Customize with your preferred loader */}
    //             Loading...
    //         </div>
    //     );
    // }
    return (
        <>
            <section class="section section--first">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section__wrap">
                                <h1 class="section__title section__title--head">Home</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {data ?
                <div class="section section--catalog">
                    <div class="container">
                        <div className="toggle-buttons">
                            <button
                                className={`btn ${isGridView ? 'active' : ''}`}
                                onClick={() => setIsGridView(true)}
                            >
                                Grid View
                            </button>
                            <button
                                className={`btn ${!isGridView ? 'active' : ''}`}
                                onClick={() => setIsGridView(false)}
                            >
                                List View
                            </button>
                        </div>
                        <div className={`row ${isGridView ? '' : 'list-view'}`}>
                            {paginatedData?.map((ele, ind) => (
                                <div
                                    className={`${isGridView
                                        ? 'col-6 col-sm-4 col-lg-3 col-xl-2'
                                        : 'col-12'
                                        }`}
                                    key={ind}
                                >
                                    <div className={`item ${isGridView ? '' : 'list-item'}`}>
                                        <div className="item__cover responsive-square">
                                            <img
                                                src={ele?.artworkUrl100}
                                                className="w-full max-w-[216px] h-auto"
                                                alt=""
                                            />
                                            <a href="#" className="item__play">
                                                <i className="ti ti-player-play-filled"></i>
                                            </a>
                                            <span className="item__rate item__rate--green">
                                                {ele?.collectionPrice}
                                            </span>
                                            <button
                                                className="item__favorite"
                                                type="button"
                                                onClick={() =>
                                                    handleFavoriteAction(
                                                        ele?.trackId,
                                                        'add',
                                                        userId
                                                    )
                                                }
                                            >
                                                <i className="ti ti-bookmark"></i>
                                            </button>
                                        </div>
                                        <div className="item__content">
                                            <h3 className="item__title">
                                                <a onClick={() => handleNavigation(ele.trackId,ele)}>
                                                    {ele?.trackCensoredName}
                                                </a>
                                            </h3>
                                            <span className="item__category">
                                                <a href="#">{ele?.primaryGenreName}</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            <button
                                className="btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {[...Array(totalPages).keys()].map((page) => (
                                <button
                                    key={page}
                                    className={`btn ${currentPage === page + 1 ? "active" : ""
                                        }`}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </button>
                            ))}
                            <button
                                className="btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}

export default MovieList