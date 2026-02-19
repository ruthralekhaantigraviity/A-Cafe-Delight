import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTables = () => api.get('/tables');
export const bookTable = (data) => api.post('/book-table', data);

export const getMenu = () => api.get('/menu');
export const addMenuItem = (data) => api.post('/menu', data); // Admin
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`); // Admin

export const addOrder = (data) => api.post('/add-order', data);
export const generateBill = (bookingId) => api.post('/generate-bill', { bookingId });
export const getSales = () => api.get('/sales'); // Admin

export default api;
