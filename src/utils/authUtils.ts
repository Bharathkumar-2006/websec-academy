
// This is a placeholder for actual authentication functionality
// In a real app, this would connect to a backend service

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export const isAuthenticated = (): boolean => {
  // In a real app, check if the user has a valid token or session
  return localStorage.getItem('webseclearn_user') !== null;
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('webseclearn_user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  // In a real app, this would make an API call to authenticate
  // For demo purposes, we'll just simulate a successful login
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockUser: User = {
    id: '123456',
    name: 'Demo User',
    email: email,
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  };
  
  localStorage.setItem('webseclearn_user', JSON.stringify(mockUser));
  
  return mockUser;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  // In a real app, this would make an API call to register a new user
  // For demo purposes, we'll just simulate a successful registration
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockUser: User = {
    id: '123456',
    name: name,
    email: email,
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
  };
  
  localStorage.setItem('webseclearn_user', JSON.stringify(mockUser));
  
  return mockUser;
};

export const logout = (): void => {
  localStorage.removeItem('webseclearn_user');
};
