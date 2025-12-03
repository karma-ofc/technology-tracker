import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../components/QuickActions';
import FilterButtons from '../components/FilterButtons';
import RoadmapImporter from '../components/RoadmapImporter';
import TechnologySearch from '../components/TechnologySearch';
import Modal from '../components/Modal';
import useTechnologies from '../hooks/useTechnologies';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function TechnologyList() {
  const { technologies, setTechnologies, updateStatus, setStatus, updateNotes, removeTechnology, addTechnology, addMultipleTechnologies, progress } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSearchResults, setApiSearchResults] = useState([]);

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

  // Комбинируем локальные технологии и результаты API поиска
  const allTechnologies = [...filteredTechnologies, ...apiSearchResults];


  const closeModal = () => setShowModal(false);

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
        {allTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
            onRemove={removeTechnology}
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
    </div>
  );
}

export default TechnologyList;