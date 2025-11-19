import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 3,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX и правил написания разметки',
    status: 'in-progress',
    notes: '',
    category: 'frontend'
  },
  {
    id: 4,
    title: 'State Management',
    description: 'Работа с состоянием компонентов через useState',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 5,
    title: 'Event Handling',
    description: 'Обработка событий в React компонентах',
    status: 'in-progress',
    notes: '',
    category: 'frontend'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies',
initialTechnologies);

  // Функция для обновления статуса технологии (циклирование)
  const updateStatus = (techId) => {
    setTechnologies(prev =>
      prev.map(tech => {
        if (tech.id === techId) {
          const newStatus = tech.status === 'not-started' ? 'in-progress' :
                           tech.status === 'in-progress' ? 'completed' : 'not-started';
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  // Функция для установки статуса напрямую
  const setStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status ===
'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    setStatus,
    updateNotes,
    progress: calculateProgress()
  };
}

export default useTechnologies;