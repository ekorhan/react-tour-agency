import { useSelector } from 'react-redux';
import axios from 'axios';
import { useCallback } from 'react';

const BASE_URL = "http://localhost:8080";

const useHttpPost = (path) => {
    const token = useSelector((state) => state.token);

    const http2Post = useCallback(async (requestData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${path}`, requestData, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : undefined
                }
            });
            return response.data;
        } catch (error) {
            console.error('HTTP Post Error:', error);
            throw error;
        }
    }, [path, token]);

    return http2Post;
};

export default useHttpPost;