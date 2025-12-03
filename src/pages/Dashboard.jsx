import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function Dashboard() {
  const { technologies, progress } = useTechnologies();

  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressCount = technologies.filter(tech => tech.status === 'in-progress').length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Панель управления</h1>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Общий прогресс</h3>
          <div className="progress-display">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Статистика</h3>
          <div className="stats">
            <div className="stat-item">
              <span>Всего технологий:</span>
              <strong>{technologies.length}</strong>
            </div>
            <div className="stat-item">
              <span>Завершено:</span>
              <strong>{completedCount}</strong>
            </div>
            <div className="stat-item">
              <span>В процессе:</span>
              <strong>{inProgressCount}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Быстрые действия</h3>
          <div className="quick-actions">
            <Link to="/add-technology" className="btn btn-primary">
              + Добавить технологию
            </Link>
            <Link to="/statistics" className="btn btn-secondary">
              📊 Посмотреть статистику
            </Link>
            <Link to="/settings" className="btn btn-secondary">
              ⚙️ Настройки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;