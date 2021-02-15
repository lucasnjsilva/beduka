export const isAuthenticated = () => localStorage.getItem('token') ? true : false;

const token = localStorage.getItem('token');

export const config = {
  headers: { Authorization: `Bearer ${token}` }
}

