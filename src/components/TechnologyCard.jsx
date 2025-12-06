// src/components/TechnologyCard.jsx
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onRemove, onDeadlineChange, isSelected, onSelectionChange }) {
  const { id, title, description, status, notes, deadline } = technology;
  const handleClick = () => {
    onStatusChange(id);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Предотвращаем вызов handleClick
    if (window.confirm(`Удалить технологию "${title}"?`)) {
      onRemove(id);
    }
  };

  const handleDeadlineClick = (e) => {
    e.stopPropagation();
    onDeadlineChange(technology);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectionChange(technology.id, e.target.checked);
  };

  return (
    <div className={`technology-card ${status}`} onClick={handleClick}>
      <div className="card-controls">
        <label className="selection-checkbox" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={handleCheckboxChange}
            aria-label={`Выбрать ${title}`}
          />
          <span className="checkmark"></span>
        </label>
        <button className="deadline-button" onClick={handleDeadlineClick} title="Установить срок изучения">
          📅
        </button>
        <button className="remove-button" onClick={handleRemove} title="Удалить технологию">
          🗑️
        </button>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        Статус: {status === 'completed' ? '✅ Изучено' :
                status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
      </div>
      {deadline && (
        <div className="deadline-indicator">
          Срок: {new Date(deadline).toLocaleDateString('ru-RU')}
        </div>
      )}
      <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
    </div>
  );
}

export default TechnologyCard;