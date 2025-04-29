import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:12000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
  getUsers: (params?: any) => api.get('/users', { params }),
  getUserById: (id: string) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post('/users', data),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};

// Product API
export const productAPI = {
  getProducts: (params?: any) => api.get('/products', { params }),
  getProductById: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  createReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data),
};

// Order API
export const orderAPI = {
  getOrders: (params?: any) => api.get('/orders', { params }),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  createOrder: (data: any) => api.post('/orders', data),
  updateOrderStatus: (id: string, data: any) => api.put(`/orders/${id}`, data),
};

// Course API
export const courseAPI = {
  getCourses: (params?: any) => api.get('/courses', { params }),
  getCourseById: (id: string) => api.get(`/courses/${id}`),
  createCourse: (data: any) => api.post('/courses', data),
  updateCourse: (id: string, data: any) => api.put(`/courses/${id}`, data),
  deleteCourse: (id: string) => api.delete(`/courses/${id}`),
  createLesson: (id: string, data: any) => api.post(`/courses/${id}/lessons`, data),
  updateLesson: (id: string, lessonId: string, data: any) =>
    api.put(`/courses/${id}/lessons/${lessonId}`, data),
  deleteLesson: (id: string, lessonId: string) =>
    api.delete(`/courses/${id}/lessons/${lessonId}`),
  enrollCourse: (id: string) => api.post(`/courses/${id}/enroll`),
};

// Invoice API
export const invoiceAPI = {
  getInvoices: (params?: any) => api.get('/invoices', { params }),
  getInvoiceById: (id: string) => api.get(`/invoices/${id}`),
  createInvoice: (data: any) => api.post('/invoices', data),
  updateInvoiceStatus: (id: string, data: any) => api.put(`/invoices/${id}/status`, data),
  deleteInvoice: (id: string) => api.delete(`/invoices/${id}`),
};

export default api;