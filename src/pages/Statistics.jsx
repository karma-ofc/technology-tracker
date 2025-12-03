import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function Statistics() {
  const { technologies, progress } = useTechnologies();

  // Подсчет технологий по статусам
  const statusCounts = {
    'not-started': technologies.filter(tech => tech.status === 'not-started').length,
    'in-progress': technologies.filter(tech => tech.status === 'in-progress').length,
    'completed': technologies.filter(tech => tech.status === 'completed').length
  };

  // Подсчет по категориям
  const categoryCounts = {};
  technologies.forEach(tech => {
    categoryCounts[tech.category] = (categoryCounts[tech.category] || 0) + 1;
  });

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к технологиям
        </Link>
        <h1>Статистика изучения</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Общий прогресс</h3>
          <div className="progress-circle">
            <div className="progress-value">{progress}%</div>
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#ddd"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#667eea"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
          </div>
        </div>

        <div className="stat-card">
          <h3>По статусам</h3>
          <div className="status-stats">
            <div className="status-item">
              <span className="status-label">Не начато:</span>
              <span className="status-count">{statusCounts['not-started']}</span>
            </div>
            <div className="status-item">
              <span className="status-label">В процессе:</span>
              <span className="status-count">{statusCounts['in-progress']}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Завершено:</span>
              <span className="status-count">{statusCounts['completed']}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>По категориям</h3>
          <div className="category-stats">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-label">{category}:</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3>Общая информация</h3>
          <div className="general-stats">
            <div className="stat-item">
              <span className="stat-label">Всего технологий:</span>
              <span className="stat-value">{technologies.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Завершено:</span>
              <span className="stat-value">{statusCounts['completed']}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">В изучении:</span>
              <span className="stat-value">{statusCounts['in-progress']}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;