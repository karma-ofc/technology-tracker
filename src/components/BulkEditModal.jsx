import { useState } from 'react';
import Modal from './Modal';
import './BulkEditModal.css';

function BulkEditModal({ isOpen, onClose, selectedCount, onBulkStatusChange }) {
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleConfirm = () => {
    if (selectedStatus) {
      onBulkStatusChange(selectedStatus);
      setSelectedStatus('');
    }
  };

  const handleClose = () => {
    setSelectedStatus('');
    onClose();
  };

  const statusOptions = [
    { value: 'not-started', label: '⏳ Не начато', description: 'Технология не изучена' },
    { value: 'in-progress', label: '🔄 В процессе', description: 'Технология изучается' },
    { value: 'completed', label: '✅ Изучено', description: 'Технология полностью изучена' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Массовое редактирование (${selectedCount} технологий)`}
    >
      <div className="bulk-edit-content">
        <p className="bulk-edit-description">
          Выберите новый статус для всех выбранных технологий:
        </p>

        <div className="status-options" role="radiogroup" aria-label="Выберите статус">
          {statusOptions.map(option => (
            <label key={option.value} className="status-option">
              <input
                type="radio"
                name="bulk-status"
                value={option.value}
                checked={selectedStatus === option.value}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-describedby={`desc-${option.value}`}
              />
              <div className="status-content">
                <span className="status-label">{option.label}</span>
                <span id={`desc-${option.value}`} className="status-description">
                  {option.description}
                </span>
              </div>
            </label>
          ))}
        </div>

        <div className="bulk-edit-actions">
          <button
            onClick={handleClose}
            className="btn btn-secondary"
            aria-label="Отменить массовое редактирование"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedStatus}
            className="btn btn-primary"
            aria-label={`Применить статус ко всем ${selectedCount} технологиям`}
          >
            Применить к {selectedCount} технологиям
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BulkEditModal;