import axios from 'axios';

const TOKEN_KEY = 'TOKEN_USER';

function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

function getToken(){
    return localStorage.getItem(TOKEN_KEY);
}


function deleteToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

function initAxiosInterceptors() {
    axios.interceptors.request.use((config) => {
        const token = getToken();

        if (token) config.headers.authorization = token;

        return config;
    });

    axios.interceptors.response.use((response) => {
        return response;
    })
}

export {setToken , getToken , deleteToken , initAxiosInterceptors};