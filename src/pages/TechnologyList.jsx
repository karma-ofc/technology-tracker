import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../components/QuickActions';
import FilterButtons from '../components/FilterButtons';
import RoadmapImporter from '../components/RoadmapImporter';
import TechnologySearch from '../components/TechnologySearch';
import Modal from '../components/Modal';
import DeadlineForm from '../components/DeadlineForm';
import BulkEditModal from '../components/BulkEditModal';
import useTechnologies from '../hooks/useTechnologies';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import { useNotification } from '../components/NotificationProvider';

function TechnologyList() {
  const { technologies, setTechnologies, updateStatus, setStatus, updateNotes, updateDeadline, removeTechnology, addTechnology, addMultipleTechnologies, progress } = useTechnologies();
  const showNotification = useNotification();

  const [filter, setFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSearchResults, setApiSearchResults] = useState([]);
  const [showDeadlineForm, setShowDeadlineForm] = useState(false);
  const [deadlineTech, setDeadlineTech] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState(new Set());
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [hasShownAllCompletedInfo, setHasShownAllCompletedInfo] = useState(false);

  const markAllCompleted = () => {
    setTechnologies(prevTech =>
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAll = () => {
    setTechnologies(prevTech =>
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const randomNext = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
      setSelectedTech(randomTech);
      setShowModal(true);
      setStatus(randomTech.id, 'in-progress');
    } else {
      alert('Все технологии уже изучены или в процессе изучения!');
    }
  };

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Фильтруем результаты API поиска по фильтру статуса
  const filteredApiResults = apiSearchResults.filter(tech => filter === 'all' || tech.status === filter);

  // Комбинируем локальные технологии и результаты API поиска
  const allTechnologies = [...filteredTechnologies, ...filteredApiResults];

  // Проверка на завершение всех технологий
  useEffect(() => {
    const allCompleted = technologies.length > 0 && technologies.every(tech => tech.status === 'completed');
    if (allCompleted && !hasShownAllCompletedInfo) {
      showNotification('🎉 Поздравляем! Вы изучили все технологии!', 'info');
      setHasShownAllCompletedInfo(true);
    } else if (!allCompleted) {
      setHasShownAllCompletedInfo(false);
    }
  }, [technologies, hasShownAllCompletedInfo, showNotification]);

  const closeModal = () => setShowModal(false);

  const openDeadlineForm = (tech) => {
    setDeadlineTech(tech);
    setShowDeadlineForm(true);
  };

  const closeDeadlineForm = () => {
    setShowDeadlineForm(false);
    setDeadlineTech(null);
  };

  const handleSaveDeadline = (techId, deadline) => {
    updateDeadline(techId, deadline);
    closeDeadlineForm();
  };

  const handleSelectionChange = (techId, isSelected) => {
    setSelectedTechnologies(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(techId);
      } else {
        newSet.delete(techId);
      }
      return newSet;
    });
  };

  const handleBulkStatusChange = (newStatus) => {
    const count = selectedTechnologies.size;
    setTechnologies(prev =>
      prev.map(tech =>
        selectedTechnologies.has(tech.id) ? { ...tech, status: newStatus } : tech
      )
    );
    setSelectedTechnologies(new Set());
    setShowBulkEdit(false);
    showNotification(`Статусы ${count} технологий обновлены`, 'success');
  };

  const selectAll = () => {
    const allIds = allTechnologies.map(tech => tech.id);
    setSelectedTechnologies(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedTechnologies(new Set());
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Проверяем структуру данных
        if (!data.technologies || !Array.isArray(data.technologies)) {
          throw new Error('Неверная структура файла: отсутствует массив technologies');
        }

        // Валидируем каждую технологию
        const validTechnologies = data.technologies.filter(tech => {
          return tech.id && tech.title && tech.description &&
                 ['not-started', 'in-progress', 'completed'].includes(tech.status) &&
                 tech.category;
        });

        if (validTechnologies.length === 0) {
          throw new Error('Файл не содержит валидных технологий');
        }

        // Добавляем импортированные технологии
        addMultipleTechnologies(validTechnologies);

        if (validTechnologies.length === data.technologies.length) {
          showNotification(`✅ Успешно импортировано ${validTechnologies.length} технологий`, 'success');
        } else {
          showNotification(`❌ Некоторые технологии невалидны. Импортировано ${validTechnologies.length} из ${data.technologies.length}`, 'error');
        }

        // Очищаем input
        event.target.value = '';

      } catch (error) {
        console.error('Import error:', error);
        showNotification(`❌ Ошибка импорта: ${error.message}`, 'error');
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <RoadmapImporter onAddTechnology={addTechnology} onAddMultipleTechnologies={addMultipleTechnologies} />

      <TechnologySearch onSearch={setApiSearchResults} />

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNext}
        technologies={technologies}
        onBulkEdit={() => setShowBulkEdit(true)}
        selectedCount={selectedTechnologies.size}
        onImport={handleImport}
      />
      <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {allTechnologies.length}</span>
      </div>
      <div className="technologies-list">
        {filteredApiResults.length > 0 && (
          <h2>Результаты поиска в API:</h2>
        )}
        {allTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
            onRemove={removeTechnology}
            onDeadlineChange={openDeadlineForm}
            isSelected={selectedTechnologies.has(tech.id)}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="🎲 Выбранная технология для изучения"
      >
        {selectedTech && (
          <div>
            <h3>{selectedTech.title}</h3>
            <p>{selectedTech.description}</p>
            <p><strong>Категория:</strong> {selectedTech.category}</p>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link
                to={`/technology/${selectedTech.id}`}
                className="btn btn-primary"
                onClick={closeModal}
              >
                Перейти к изучению
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {showDeadlineForm && deadlineTech && (
        <DeadlineForm
          technology={deadlineTech}
          onSave={handleSaveDeadline}
          onCancel={closeDeadlineForm}
        />
      )}

      <BulkEditModal
        isOpen={showBulkEdit}
        onClose={() => setShowBulkEdit(false)}
        selectedCount={selectedTechnologies.size}
        onBulkStatusChange={handleBulkStatusChange}
      />
    </div>
  );
}

export default TechnologyList;