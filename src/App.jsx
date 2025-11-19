// src/App.jsx
import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов React и их жизненного цикла',
      status: 'completed'
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX и правил написания разметки',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов через useState',
      status: 'not-started'
    },
    {
      id: 4,
      title: 'Props System',
      description: 'Передача данных между компонентами через props',
      status: 'not-started'
    },
    {
      id: 5,
      title: 'Event Handling',
      description: 'Обработка событий в React компонентах',
      status: 'in-progress'
    }
  ]);

  const updateStatus = (id) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === id
          ? {
              ...tech,
              status:
                tech.status === 'not-started'
                  ? 'in-progress'
                  : tech.status === 'in-progress'
                  ? 'completed'
                  : 'not-started'
            }
          : tech
      )
    );
  };

  const [filter, setFilter] = useState('all');

  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      setTechnologies(prevTech =>
        prevTech.map(tech =>
          tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
        )
      );
    }
  };

  const filteredTechnologies = filter === 'all' ? technologies : technologies.filter(tech => tech.status === filter);

  const closeModal = () => setShowModal(false);

  return (
    <div className="App">
      <h1>🚀 Трекер изучения технологий</h1>
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNext}
      />
      <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
      <div className="technologies-list">
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusChange={updateStatus}
          />
        ))}
      </div>
      {showModal && selectedTech && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Выбранная технология</h2>
            <h3>{selectedTech.title}</h3>
            <p>{selectedTech.description}</p>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;