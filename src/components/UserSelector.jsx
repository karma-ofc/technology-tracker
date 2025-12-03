import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function UserSelector({ users }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Закрываем dropdown при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="user-selector" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="user-selector-toggle"
      >
        👥 Пользователи {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div className="user-selector-dropdown">
          <div className="user-selector-header">
            <h4>Выберите пользователя</h4>
            <button onClick={closeDropdown} className="close-btn">×</button>
          </div>
          <div className="user-selector-list">
            {users.map(user => (
              <Link
                key={user.id}
                to={`/user/${user.id}`}
                onClick={closeDropdown}
                className="user-selector-item"
              >
                <span className="user-name">{user.name}</span>
                <span className="user-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSelector;