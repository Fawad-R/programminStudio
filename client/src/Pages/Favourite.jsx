import React, { useEffect, useState } from 'react'
import Header from '../Components/header'
import Catalogue from '../Components/Catalogue'
import { fetchDataById, fetchMovies } from '../apiClient';
const Favourite = () => {
    const [data, setData] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    let userId = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchMovies();
                console.log('result', result?.results)
                setData(result.results);
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
    const fetchUser = async () => {
        try {
            const result = await fetchDataById('api/user', userId);
            setUserData(result);
            if (result) {
                setIsUser(true)
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </div>
        );
    }
    return (
        <>
            <Header />
            {data && userData &&
            <Catalogue movies={data} user={userData} />}
        </>
    )
}

export default Favourite