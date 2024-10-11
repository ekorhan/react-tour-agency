import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export async function httpPost(url, request) {
    try {
        return await axios.post(`${BASE_URL}/${url}`, request);
    } catch (error) {
        alert("Unexpected exception occurred");
        console.error(error);
    }
}

export async function httpGet(url) {
    try {
        return await axios.get(`${BASE_URL}/${url}`);
    } catch (error) {
        alert("Unexpected exception occurred");
        console.error(error);
    }
}

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}