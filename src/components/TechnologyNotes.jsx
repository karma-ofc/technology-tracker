// TechnologyNotes.jsx
function TechnologyNotes({ notes, onNotesChange, techId }) {
  const handleNotesClick = (e) => {
    e.stopPropagation();
  };

  const handleHintClick = (e) => {
    e.stopPropagation();
    // Фокус на textarea при клике на подсказку
    const textarea = e.currentTarget.previousElementSibling;
    if (textarea) textarea.focus();
  };

  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        onClick={handleNotesClick}
      />
      <div className="notes-hint" onClick={handleHintClick}>
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` :
        'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;