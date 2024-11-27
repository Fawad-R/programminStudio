import axios from 'axios';

// Generic GET request for all data
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const fetchMovies = async () => {
    try {
        const response = await axios.get("https://itunes.apple.com/search?term=star&country=au&media=movie&all");
        console.log('response',response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// GET request for specific data by ID
export const fetchDataById = async (endpoint, id) => {
    try {
        const response = await axios.get(`/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data by ID (${id}):`, error);
        throw error;
    }
};

// Generic POST request to add new data
export const postData = async (endpoint, data) => {
    try {
        console.log(`${endpoint}`)
        console.log(`${data}`)
        const response = await axios.post(`/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Generic PUT request to update data by ID
export const updateData = async (endpoint, id, data) => {
    try {
        // console.log('data',data)
        for (let [key, value] of data.entries()) {
            console.log(`apiCLIENT ${key}:, ${value}`);
        }
        const response = await axios.put(`/${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating data by ID (${id}):`, error);
        throw error;
    }
};

// Generic DELETE request to remove data by ID
export const deleteData = async (endpoint, id) => {
    try {
        const response = await axios.delete(`/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting data by ID (/${id}):`, error);
        throw error;
    }
};