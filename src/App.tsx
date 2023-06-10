import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Todo from './components/Todo/Todo';
import { loginAPI, logoutAPI } from './api/auth';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { loggedIn } = await loginAPI.checkLoginStatus();
        if (loggedIn) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await loginAPI.login(username, password);
      setLoggedIn(true);
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAPI.logout();
      setLoggedIn(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={loggedIn ? <Todo handleLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
