// src/components/TechnologyCard.jsx
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes } = technology;
  const handleClick = () => {
    onStatusChange(id);
  };

  return (
    <div className={`technology-card ${status}`} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        Статус: {status === 'completed' ? '✅ Изучено' :
                status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
      </div>
      <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
    </div>
  );
}

export default TechnologyCard;