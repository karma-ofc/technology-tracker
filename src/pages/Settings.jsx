import { Link } from 'react-router-dom';
import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function Settings() {
  const { technologies, setTechnologies } = useTechnologies();
  const { technologies: apiTechnologies, loading: apiLoading, error: apiError, refetch: apiRefetch } = useTechnologiesApi();
  const [exportFormat, setExportFormat] = useState('json');

  // Начальные данные для восстановления
  const initialTechnologies = [
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 2,
      title: 'Node.js Basics',
      description: 'Основы серверного JavaScript',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 3,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX и правил написания разметки',
      status: 'in-progress',
      notes: '',
      category: 'frontend'
    },
    {
      id: 4,
      title: 'State Management',
      description: 'Работа с состоянием компонентов через useState',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 5,
      title: 'Event Handling',
      description: 'Обработка событий в React компонентах',
      status: 'in-progress',
      notes: '',
      category: 'frontend'
    },
    {
      id: 6,
      title: 'React Router',
      description: 'Навигация между страницами в React приложениях',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 7,
      title: 'Express.js',
      description: 'Фреймворк для создания веб-приложений на Node.js',
      status: 'not-started',
      notes: '',
      category: 'backend'
    },
    {
      id: 8,
      title: 'MongoDB',
      description: 'NoSQL база данных для современных приложений',
      status: 'not-started',
      notes: '',
      category: 'database'
    },
    {
      id: 9,
      title: 'Git Version Control',
      description: 'Система контроля версий для командной разработки',
      status: 'completed',
      notes: 'Основные команды изучены',
      category: 'tools'
    },
    {
      id: 10,
      title: 'CSS Flexbox',
      description: 'Современная система верстки веб-страниц',
      status: 'not-started',
      notes: '',
      category: 'frontend'
    },
    {
      id: 11,
      title: 'TypeScript',
      description: 'Типизированное надмножество JavaScript',
      status: 'not-started',
      notes: '',
      category: 'language'
    },
    {
      id: 12,
      title: 'REST API',
      description: 'Проектирование и разработка RESTful веб-сервисов',
      status: 'not-started',
      notes: '',
      category: 'backend'
    }
  ];

  const handleExport = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `technologies-export-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            setTechnologies(importedData);
            alert('Данные успешно импортированы!');
          } else {
            alert('Неверный формат файла');
          }
        } catch (error) {
          alert('Ошибка при импорте файла: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить все технологии? Это действие нельзя отменить.')) {
      setTechnologies([]);
    }
  };

  const handleRestoreInitial = () => {
    if (window.confirm('Восстановить начальные данные? Текущие данные будут заменены.')) {
      setTechnologies(initialTechnologies);
    }
  };

  const handleLoadFromApi = () => {
    if (window.confirm('Загрузить данные из API? Текущие данные будут заменены.')) {
      setTechnologies(apiTechnologies);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к технологиям
        </Link>
        <h1>Настройки</h1>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>Экспорт данных</h3>
          <p>Экспортируйте все ваши технологии в JSON файл для резервного копирования.</p>
          <button onClick={handleExport} className="btn btn-primary">
            Экспортировать данные
          </button>
        </div>

        <div className="settings-section">
          <h3>Импорт данных</h3>
          <p>Импортируйте технологии из ранее экспортированного JSON файла.</p>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="file-input"
          />
        </div>

        <div className="settings-section">
          <h3>Загрузка данных из API</h3>
          <p>Загрузить базовый набор технологий из внешнего API.</p>
          <button
            onClick={handleLoadFromApi}
            disabled={apiLoading}
            className="btn btn-primary"
          >
            {apiLoading ? 'Загрузка...' : '📡 Загрузить из API'}
          </button>
          {apiError && <p className="error-text">{apiError}</p>}
        </div>

        <div className="settings-section danger">
          <h3>Опасная зона</h3>
          <p>Эти действия нельзя отменить. Будьте осторожны!</p>
          <div className="danger-actions">
            <button onClick={handleRestoreInitial} className="btn btn-secondary">
              🔄 Восстановить начальные данные
            </button>
            <button onClick={handleClearAll} className="btn btn-danger">
              🗑️ Удалить все технологии
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Информация о приложении</h3>
          <div className="app-info">
            <p><strong>Версия:</strong> 1.0.0</p>
            <p><strong>Технологий отслеживается:</strong> {technologies.length}</p>
            <p><strong>Локальное хранилище:</strong> {typeof Storage !== 'undefined' ? 'Доступно' : 'Недоступно'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;