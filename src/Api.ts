import axios from 'axios';
import { isLoggedIn } from './Utils/Login';


const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 
Add only the routes(pages) where API is being called from that respective page and no need to send an Authorization token.
*/

const AUTH_ROUTES: string[] = [
  '/login',
  '/singup'
];

const PUBLIC_ROUTES: string[] = [
  '/',
];

client.interceptors.request.use(
  (request: any) => {
    let authRoutes = AUTH_ROUTES.includes(request.url);
    let publicRoutes = PUBLIC_ROUTES.includes(request.url);
    if (!authRoutes && !publicRoutes) {
      const token = isLoggedIn();
      request.headers['Authorization'] = `${token}`;
    }
    return request;
  },
  (error: any) => {
    return Promise.resolve(error);
  },
);

client.interceptors.response.use(
  (response: any) => {
    if (response.error) {
      return Promise.resolve(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      sessionStorage.removeItem('userapp');
      window.location.href = '/';
    }
    return Promise.resolve(error?.response?.data);
  },
);

export default client;
