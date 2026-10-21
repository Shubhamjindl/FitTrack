import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const parseJsonResponse = async (response) => {
  let data = null;
  const contentType = response.headers.get('content-type');

  try {
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (text && text.trim()) {
        data = JSON.parse(text);
      }
    }
  } catch (err) {
    // Ignore JSON parse errors here, as we handle !response.ok below
  }

  if (!response.ok) {
    const defaultMsg =
      response.status === 502 || response.status === 504 || response.status === 500
        ? 'Cannot connect to server. Please check if the backend server is running on port 5000.'
        : `Server request failed with status ${response.status}`;
    throw new Error(data?.message || defaultMsg);
  }

  if (!data) {
    throw new Error('Empty response received from server.');
  }

  return data;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fittrack_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('fittrack_token'));
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await parseJsonResponse(response);
          setUser(data.user);
          localStorage.setItem('fittrack_user', JSON.stringify(data.user));
        } else {
          // Token is invalid or expired
          logout();
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseJsonResponse(response);

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('fittrack_token', data.token);
    localStorage.setItem('fittrack_user', JSON.stringify(data.user));
    return data;
  };

  const register = async (name, email, password) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await parseJsonResponse(response);

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('fittrack_token', data.token);
    localStorage.setItem('fittrack_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('fittrack_token');
    localStorage.removeItem('fittrack_user');
  };

  const updateProfile = async (name) => {
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await parseJsonResponse(response);

    setUser(data.user);
    localStorage.setItem('fittrack_user', JSON.stringify(data.user));
    return data;
  };

  const changePassword = async (currentPassword, newPassword) => {
    const response = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await parseJsonResponse(response);
    return data;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

