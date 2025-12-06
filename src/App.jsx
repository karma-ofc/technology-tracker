import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import { ThemeProviderWrapper } from './components/ThemeProvider';
import { NotificationProvider } from './components/NotificationProvider';

function App() {
  // Состояние для отслеживания авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Пример данных пользователей
  const users = [
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Иван' },
    { id: 3, name: 'Мария' }
  ];

  // Проверяем авторизацию при загрузке и при изменении
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <ThemeProviderWrapper>
      <NotificationProvider>
        <Router basename="/technology-tracker">
          <div className="App">
            <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} users={users} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/technologies" element={<TechnologyList />} />
                <Route path="/technology/:techId" element={<TechnologyDetail />} />
                <Route
                  path="/statistics"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Statistics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/add-technology" element={<AddTechnology />} />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                {/* Динамический маршрут для пользователей */}
                <Route
                  path="/user/:userId"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;