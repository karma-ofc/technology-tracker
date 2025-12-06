import { Link, useLocation } from 'react-router-dom';
import UserSelector from './UserSelector';
import { useTheme } from './ThemeProvider';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout, users }) {
  const location = useLocation();
  const { themeMode, toggleTheme } = useTheme();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          🚀 Трекер технологий
        </Link>
      </div>

      <ul className="nav-menu">
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/technologies"
            className={location.pathname === '/technologies' ? 'active' : ''}
          >
            Все технологии
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link
                to="/statistics"
                className={location.pathname === '/statistics' ? 'active' : ''}
              >
                Статистика
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={location.pathname === '/settings' ? 'active' : ''}
              >
                Настройки
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to="/add-technology"
            className={location.pathname === '/add-technology' ? 'active' : ''}
          >
            Добавить технологию
          </Link>
        </li>
        <li>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Переключить тему"
            sx={{ ml: 1 }}
          >
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </li>

        {isLoggedIn && (
          <li>
            <UserSelector users={users} />
          </li>
        )}

        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Панель управления
              </Link>
            </li>
            <li className="user-info">
              <span>Привет, {username}!</span>
              <button onClick={onLogout} className="logout-btn">
                Выйти
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Войти
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;