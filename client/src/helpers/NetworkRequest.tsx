import axios from 'axios';

const BASE_URL = 'http://localhost:5023/api';

interface RequestParams {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
} 

const networkRequest = async ({ endpoint, method, data, params }: RequestParams) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const token = localStorage.getItem('token'); 

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}), 
        };

        const response = await axios({
            url,
            method,
            headers,
            data,
            params,
        });

        return response.data;
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        throw new Error('An unexpected error occurred');
    }
};
