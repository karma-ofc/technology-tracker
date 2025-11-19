// src/components/ProgressHeader.jsx
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>📊 Прогресс изучения</h2>
      <div className="stats">
        <div className="stat">
          <span className="number">{total}</span>
          <span className="label">Всего технологий</span>
        </div>
        <div className="stat">
          <span className="number">{completed}</span>
          <span className="label">Изучено</span>
        </div>
        <div className="stat">
          <span className="number">{inProgress}</span>
          <span className="label">В процессе</span>
        </div>
        <div className="stat">
          <span className="number">{notStarted}</span>
          <span className="label">Не начато</span>
        </div>
        <div className="stat">
          <span className="number">{progress}%</span>
          <span className="label">Прогресс</span>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressHeader;