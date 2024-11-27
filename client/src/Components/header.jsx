import React from 'react'
import Cookies from 'js-cookie'; // Import js-cookie library
import { postData } from '../apiClient';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const authToken = Cookies.get('authToken'); // Get token from cookies
    let navigate=useNavigate()
    console.log('authToken', authToken)
    // if (authToken) {
    //     navigate('/'); // Redirect to the home page or another protected route
    // } else {
    //     setIsLoading(false); // Set loading to false if user is not logged in
    // }
    const handleLogout = async (e) => {
        e.preventDefault();
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            try {
                // Call the logout API
                await postData('api/logout', {}, { withCredentials: true }); // Ensure the backend API supports logout
                // Navigate to the login or home page after successful logout
                navigate('/login');
            } catch (error) {
                console.error("Error logging out:", error);
                alert("Failed to log out. Please try again.");
            }
        }
    };
    return (
        <header class="header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="header__content">
                            <a href="index.html" class="header__logo">
                                <li class="header__nav-item">
                                    <a href="/" class="header__nav-link">Home</a>
                                </li>
                            </a>
                            <ul class="header__nav">
                                {authToken ?
                                    <>
                                        <li class="header__nav-item">
                                            <a href="/favourite-movies" class="header__nav-link">Favourites</a>
                                        </li>
                                        <li class="header__nav-item">
                                            <a onClick={handleLogout} class="header__nav-link">Logout</a>
                                        </li>
                                    </>
                                    :
                                    <li class="header__nav-item">
                                        <a href="/login" class="header__nav-link">Login</a>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>


    )
}

export default Header