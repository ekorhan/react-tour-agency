import { useSelector } from 'react-redux';
import axios from 'axios';
import { useCallback } from 'react';

const BASE_URL = "http://localhost:8080";

const useHttpGet = (path) => {
    const token = useSelector((state) => state.token); // state yapınıza göre ayarlayın

    const http2Get = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${path}`, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : undefined
                }
            });
            return response.data;
        } catch (error) {
            console.error('HTTP Get Error:', error);
            throw error;
        }
    }, [path, token]);

    return http2Get;
};

export default useHttpGet;