import { useState, useEffect } from 'react';
import { useNotification } from './NotificationProvider';
import './DeadlineForm.css';

function DeadlineForm({ technology, onSave, onCancel }) {
  const [deadline, setDeadline] = useState(technology.deadline || '');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const showNotification = useNotification();

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  // Валидация в реальном времени
  useEffect(() => {
    const newErrors = {};

    if (deadline) {
      const selectedDate = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline = 'Срок не может быть в прошлом';
      }
    }

    setErrors(newErrors);
  }, [deadline]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      showNotification('Предупреждение: введена некорректная дата. Исправьте ошибки перед сохранением.', 'warning');
      return;
    }

    onSave(technology.id, deadline);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const hasError = (field) => touched[field] && errors[field];

  return (
    <div className="deadline-form-overlay">
      <div className="deadline-form-container" role="dialog" aria-labelledby="deadline-form-title" aria-modal="true">
        <h2 id="deadline-form-title">Установка срока изучения</h2>
        <p className="technology-info">
          <strong>{technology.title}</strong><br />
          {technology.description}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="deadline-input" className="form-label">
              Срок изучения:
            </label>
            <input
              id="deadline-input"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              onBlur={() => handleBlur('deadline')}
              className={`form-input ${hasError('deadline') ? 'error' : ''}`}
              min={getMinDate()}
              aria-describedby={hasError('deadline') ? 'deadline-error' : undefined}
              aria-invalid={hasError('deadline')}
              aria-required="false"
            />
            {hasError('deadline') && (
              <span id="deadline-error" className="error-message" role="alert" aria-live="polite">
                {errors.deadline}
              </span>
            )}
            <small className="form-hint">
              Выберите дату завершения изучения технологии
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              aria-label="Отменить изменения"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              aria-label="Сохранить срок изучения"
            >
              Сохранить
            </button>
          </div>
        </form>

        {/* Навигация с клавиатуры */}
        <div className="sr-only" aria-live="polite" id="keyboard-help">
          Используйте Tab для навигации, Enter для подтверждения, Escape для отмены
        </div>
      </div>
    </div>
  );
}

export default DeadlineForm;