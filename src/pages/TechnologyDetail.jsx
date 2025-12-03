import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyResources from '../components/TechnologyResources';
import Modal from '../components/Modal';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, removeTechnology } = useTechnologies();
  const [technology, setTechnology] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    setTechnology(tech);
  }, [techId, technologies]);

  const updateTechStatus = (newStatus) => {
    updateStatus(parseInt(techId), newStatus);
    setTechnology({ ...technology, status: newStatus });
  };

  const handleDelete = () => {
    removeTechnology(parseInt(techId));
    navigate('/technologies');
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateTechStatus('not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              Не начато
            </button>
            <button
              onClick={() => updateTechStatus('in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              В процессе
            </button>
            <button
              onClick={() => updateTechStatus('completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              Завершено
            </button>
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <p>{technology.notes}</p>
          </div>
        )}

        <div className="detail-section">
          <TechnologyResources technology={technology} />
        </div>

        <div className="detail-section">
          <h3>Действия</h3>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-danger"
          >
            🗑️ Удалить технологию
          </button>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Подтверждение удаления"
      >
        <p>Вы уверены, что хотите удалить технологию <strong>"{technology.title}"</strong>?</p>
        <p>Это действие нельзя отменить.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="btn btn-secondary"
          >
            Отмена
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Удалить
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TechnologyDetail;