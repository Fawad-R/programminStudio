import React, { useState } from 'react';
import { postData } from '../apiClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    let navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate inputs and simulate form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const { name, email, password } = formData;

        // Basic validation
        if (!name || !email || !password) {
            setError('All fields are required!');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long!');
            return;
        }

        try {
            // Simulated API call (replace with your actual API)
            const response = await postData('api/register',formData);
            console.log('response',response)
            if (!response) {
                alert('Failed to register. Please try again.');
                throw new Error('Failed to register. Please try again.');
            }
            // const result = await response.json();
            setSuccessMessage('Registration successful! Please log in.');
            alert('Registration successful!');
            navigate('/login')
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            alert(err);
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="sign section--bg" data-bg="img/bg/section__bg.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            <form className="sign__form" onSubmit={handleSubmit}>
                                <a href="/" className="sign__logo">
                                    <h1>Register</h1>
                                </a>

                                {error && <p className="error-message">{error}</p>}
                                {successMessage && <p className="success-message">{successMessage}</p>}

                                <div className="sign__group">
                                    <input
                                        type="text"
                                        className="sign__input"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

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
                                    Sign up
                                </button>

                                <span className="sign__text">
                                    Already have an account? <a href="/login">Sign in!</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
