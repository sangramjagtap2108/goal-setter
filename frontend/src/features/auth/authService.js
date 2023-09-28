// for http requests
import axios from 'axios'

// server - http://localhost:5000/api/users
// http://localhost:5000 is added in proxy var in package.json of frontend
const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // axios returns data inside data variable
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    // axios returns data inside data variable
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService;