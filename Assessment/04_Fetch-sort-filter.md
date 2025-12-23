# Задача: Интерактивный список с возможностью сортировки и фильтрации 

## Описание
Создать компонент списка, с возможностью сортировки и фильтрации:
- загружает данные с внешнего API(например: записи с полям имя, возраст, дата добавления)
- есть обработка состояний загрузки и ошибки
- сортировка по любому из полей
- фильтрация по мере набора текста
- использует fetch или axios для взаимодействия с сервером

**Код возможного решения**
```jsx
const InteractiveList = () => {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [filterText, setFilterText] = useState('');

  // Загрузка данных с сервера
  useEffect(() => {
    fetch().then(setData);
    //... необходимая обраоботка 
  }, []);

  // Применение сортировки и фильтрации
  const sortedFilteredData = useSortAndFilter(data, sortField, filterText);

  return (
    <>
      <SortFilterControls
        onSortChange={setSortField}
        onFilterChange={setFilterText}
      />
      <ul className="list">
        {sortedFilteredData.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};


// Функция сравнения для сортировки
const compareByField = (field) => (a, b) =>
  a[field].localeCompare(b[field]);

export const useSortAndFilter = (data, sortField, filterText) => {
  return useMemo(() => {
    let filteredData = data.filter(
      item =>
        `${item.name} ${item.email}`
          .toLowerCase()
          .includes(filterText.toLowerCase())
    );

    if (sortField) {
      filteredData.sort(compareByField(sortField));
    }

    return filteredData;
  }, [data, sortField, filterText]);
};


const SortFilterControls = ({ onSortChange, onFilterChange }) => {
  const [sortOptions, setSortOptions] = useState(['name', 'age']);
  const [selectedSortOption, setSelectedSortOption] = useState('name');

  useEffect(() => {
    onSortChange(selectedSortOption);
  }, [onSortChange, selectedSortOption]);

  const handleSortChange = event => {
    setSelectedSortOption(event.target.value);
  };

  const handleFilterChange = event => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="controls">
      <label htmlFor="sort">Сортировать по:</label>
      <select
        id="sort"
        value={selectedSortOption}
        onChange={handleSortChange}
      >
        {sortOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor="filter">Найти:</label>
      <input
        id="filter"
        type="text"
        placeholder="Введите текст для поиска..."
        onChange={handleFilterChange}
      />
    </div>
  );
};
```
