import React, { useState,useEffect } from 'react';
import { postData } from '../apiClient';
import Cookies from 'js-cookie'; // Import js-cookie library
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true); // State to manage initial loading
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        // const authToken = Cookies.get('user'); // Get token from cookies
        const authToken = Cookies.get('authToken'); // Get token from cookies
        console.log('authToken',authToken)
        if (authToken) {
            navigate('/'); // Redirect to the home page or another protected route
        } else {
            setIsLoading(false); // Set loading to false if user is not logged in
        }
    }, [navigate]);

    // Validate inputs and simulate form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const { email, password } = formData;

        // Basic validation
        if (!email || !password) {
            setError('All fields are required!');
            return;
        }

        try {
            // Simulated API call (replace with your actual API)
            // const response = await postData('api/login', formData);
            const result = await postData('api/login' , { email, password });
            if (!result) {
				alert('Failed to login. Please try again.');
                throw new Error('Invalid email or password!');
            }
            console.log('result',result)
            console.log('result',result.token)
            alert('Sucessfully Logged In');
            // Cookies.set('authToken', result.token);
            setSuccessMessage('Login successful!');
            localStorage.setItem('authToken', JSON.stringify(result.token));
            localStorage.setItem('user', JSON.stringify(result._id));
            navigate('/');

            // const result = await response;
            setFormData({ email: '', password: '' });
            // Store the token (if provided) in localStorage or cookies
            // if (result.token) {
            //     // document.cookie = `token=${result.token}; path=/;`;
            // }
        } catch (err) {
			alert(err);
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner">Loading...</div> {/* Customize with your preferred loader */}
            </div>
        );
    }

    return (
        <div className="sign section--bg" data-bg="img/bg/section__bg.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            <form className="sign__form" onSubmit={handleSubmit}>
                                <a href="/" className="sign__logo">
                                    <h1>Login</h1>
                                </a>

                                {error && <p className="error-message">{error}</p>}
                                {successMessage && <p className="success-message">{successMessage}</p>}

                                <div className="sign__group">
                                    <input
                                        type="email"
                                        className="sign__input"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="sign__group">
                                    <input
                                        type="password"
                                        className="sign__input"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="sign__btn" type="submit">
                                    Sign in
                                </button>

                                <span className="sign__delimiter">or</span>

                                <span className="sign__text">
                                    Don't have an account? <a href="/register">Sign up!</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
