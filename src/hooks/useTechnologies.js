import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
{
  id: 1,
  title: 'React Components',
  description: 'Изучение базовых компонентов',
  status: 'not-started',
  notes: '',
  category: 'frontend',
  deadline: ''
},
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
    deadline: ''
  },
  {
    id: 3,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX и правил написания разметки',
    status: 'in-progress',
    notes: '',
    category: 'frontend',
    deadline: ''
  },
  {
    id: 4,
    title: 'State Management',
    description: 'Работа с состоянием компонентов через useState',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    deadline: ''
  },
  {
    id: 5,
    title: 'Event Handling',
    description: 'Обработка событий в React компонентах',
    status: 'in-progress',
    notes: '',
    category: 'frontend',
    deadline: ''
  },
  {
    id: 6,
    title: 'React Router',
    description: 'Навигация между страницами в React приложениях',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    deadline: ''
  },
  {
    id: 7,
    title: 'Express.js',
    description: 'Фреймворк для создания веб-приложений на Node.js',
    status: 'not-started',
    notes: '',
    category: 'backend',
    deadline: ''
  },
  {
    id: 8,
    title: 'MongoDB',
    description: 'NoSQL база данных для современных приложений',
    status: 'not-started',
    notes: '',
    category: 'database',
    deadline: ''
  },
  {
    id: 9,
    title: 'Git Version Control',
    description: 'Система контроля версий для командной разработки',
    status: 'completed',
    notes: 'Основные команды изучены',
    category: 'tools',
    deadline: ''
  },
  {
    id: 10,
    title: 'CSS Flexbox',
    description: 'Современная система верстки веб-страниц',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    deadline: ''
  },
  {
    id: 11,
    title: 'TypeScript',
    description: 'Типизированное надмножество JavaScript',
    status: 'not-started',
    notes: '',
    category: 'language',
    deadline: ''
  },
  {
    id: 12,
    title: 'REST API',
    description: 'Проектирование и разработка RESTful веб-сервисов',
    status: 'not-started',
    notes: '',
    category: 'backend',
    deadline: ''
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

  // Функция для обновления срока изучения
  const updateDeadline = (techId, newDeadline) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, deadline: newDeadline } : tech
      )
    );
  };

  // Функция для добавления новой технологии
  const addTechnology = (newTech) => {
    const tech = {
      id: newTech.id || Date.now(),
      ...newTech,
      status: 'not-started',
      notes: '',
      deadline: newTech.deadline || ''
    };
    setTechnologies(prev => [...prev, tech]);
    return tech;
  };

  // Функция для добавления нескольких технологий
  const addMultipleTechnologies = (newTechs) => {
    const baseId = Date.now();
    const techsWithIds = newTechs.map((tech, index) => ({
      ...tech,
      id: baseId + index,
      status: tech.status || 'not-started',
      notes: tech.notes || '',
      deadline: tech.deadline || ''
    }));
    setTechnologies(prev => [...prev, ...techsWithIds]);
    return techsWithIds;
  };

  // Функция для удаления технологии
  const removeTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
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
    setTechnologies,
    updateStatus,
    setStatus,
    updateNotes,
    updateDeadline,
    addTechnology,
    addMultipleTechnologies,
    removeTechnology,
    progress: calculateProgress()
  };
}

export default useTechnologies;