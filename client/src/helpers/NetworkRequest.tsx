import axios from 'axios';

const BASE_URL = 'https://localhost:7065/api';

interface RequestParams {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
}

export  const networkRequest = async ({ endpoint, method, data, params }: RequestParams) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
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
        
        throw new Error('An unexpected error occurred');
    }
};
