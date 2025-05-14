
// This is a placeholder for actual authentication functionality
// In a real app, this would connect to a backend service

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

// Backend API URL - change this when deploying
const API_URL = 'http://localhost:5000/api';

export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('webseclearn_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Auth validation error:', error);
    return false;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('webseclearn_token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_URL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get current user');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('webseclearn_token', data.token);
    
    return data.user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem('webseclearn_token', data.token);
    
    return data.user;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
};

export const logout = (): void => {
  localStorage.removeItem('webseclearn_token');
};
