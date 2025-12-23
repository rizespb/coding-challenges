# Задача: Реализация компонента пагинации с динамической загрузкой данных

## Описание
Создать компонент Pagination, который:
- загружает данные с внешнего API постранично (по 10 записей)
- есть обработка состояний загрузки и ошибки
- есть переключение между страницами
- отображает количество найденных записей
- использует fetch или axios для взаимодействия с сервером
- ленивая подгрузка на скролле*

**Код возможного решения**
```jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для загрузки данных с сервера
  const fetchData = useCallback(async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/data?page=${page}&limit=10`);
      if (!response.data.success) throw new Error(response.data.message);
      
      setData(response.data.items);
      setTotalCount(response.data.totalCount);
      setTotalPages(Math.ceil(totalCount / 10));
    } catch (err) {
      setError(err.message || 'Ошибка при получении данных');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Первоначальная загрузка данных
  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  return (
    <div className="pagination-container">
      {/* Контейнер для отображения данных */}
      <ul className="data-list">
        {data.map((item, index) => (
          <li key={index}>{/* Отображение элемента */}</li>
        ))}
      </ul>

      {/* Блок с информацией о страницах */}
      <div className="pagination-info">
        <span>Страница {currentPage} из {totalPages}</span>
        <span>Всего найдено: {totalCount} записей</span>
      </div>

      {/* Навигационные кнопки */}
      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Назад</button>
        <input
          type="number"
          value={currentPage}
          min="1"
          max={totalPages}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        />
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Вперед</button>
      </div>

      {/* Сообщение об ошибке */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
```
