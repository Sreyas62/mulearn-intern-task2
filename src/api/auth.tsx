const BASE_URL = 'https://mulearn-internship-task-production.up.railway.app/api'; // Replace with the actual API base URL

export const loginAPI = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }
  },
  checkLoginStatus: async () => {
    const response = await fetch(`${BASE_URL}/check-login-status/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error checking login status');
    }
  },
};

export const signupAPI = {
  signup: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.username[0]);
    }
  },
};

export const logoutAPI = {
  logout: async () => {
    const response = await fetch(`${BASE_URL}/logout/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error logging out');
    }
  },
};
