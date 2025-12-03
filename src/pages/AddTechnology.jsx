import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    addTechnology(formData);
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>Добавить новую технологию</h1>
      </div>

      <form onSubmit={handleSubmit} className="add-tech-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React Hooks"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите, что вы будете изучать..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">База данных</option>
            <option value="devops">DevOps</option>
            <option value="mobile">Мобильная разработка</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
          <Link to="/technologies" className="btn btn-secondary">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;