// ---------------------- 1 ----------------------
// Проведите ревью. Что не так?
//
// -----------------------------------------------

const App = ({ isLoading }) => {
  if (isLoading) {
    return <div>Loading</div>;
  }

  useEffect(() => {
    console.log();
  }, []);

  return <div>Hello</div>;
};

////////////////////////////////////////////////////////////////////
//
// ---------------------- 2 ----------------------
// В какой последовательности отработают console.log
// -----------------------------------------------
import { useState, useLayoutEffect, useEffect } from 'react';

const App = () => {
  const [num, setNum] = useState(0);

  function clickHandler() {
    setNum((prev) => prev + 1);
  }

  console.log('App render');

  useLayoutEffect(() => {
    console.log('useLayoutEffect');

    return () => {
      console.log('cleanup useLayoutEffect');
    };
  }, [num]);

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('cleanup useEffect');
    };
  }, [num]);

  return (
    <>
      <button onClick={clickHandler}>render</button>
      <div style={{ fontSize: '45px', textAlign: 'center' }}>{num}</div>
    </>
  );
};

////////////////////////////////////////////////////////////////////
//
// ---------------------- 3 ----------------------
// Какие значения окажутся в свойствах store1 и store2
// -----------------------------------------------
import { useEffect } from 'react';

const stores = {
  store1: '',
  store2: 0,
};

function Parent() {
  stores.store1 = 'A';

  useEffect(() => {
    stores.store2 = 1;
  }, []);

  return <Child />;
}

function Child() {
  stores.store1 = 'B';

  useEffect(() => {
    stores.store2 = 2;
  }, []);

  return null;
}

export default () => <Parent />;

////////////////////////////////////////////////////////////////////
//
// ---------------------- 4 ----------------------
// Вы проводите код-ревью. Есть ли неоптимальности в этом коде? Как исправить
// -----------------------------------------------

const SomeElement = ({ hasData }) => {
  if (hasData) {
    return (
      <div>
        <DataElement />
        <SomeImportantElement />
      </div>
    );
  }

  return (
    <div>
      <SomeImportantElement />
    </div>
  );
};

////////////////////////////////////////////////////////////////////
//
// ---------------------- 5 ----------------------
// Что мы увидим на экране, когда начнем вводить текст в input? Почему?
// Какие есть способы исправить ситуацию без удаления уже существующего кода?
// -----------------------------------------------

export const App = () => {
  const [value, setValue] = useState('');
  const displayValue = useRef('');

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    displayValue.current = newValue.toUpperCase();
  };

  return (
    <>
      <input type="text" onChange={handleChange} value={value.current} key={value.current} />

      <Child displayValue={displayValue} />
    </>
  );
};

const Child = memo(({ displayValue }) => (
  <div style={{ fontSize: '45px', textAlign: 'center' }}>{displayValue.current}</div>
));

////////////////////////////////////////////////////////////////////
//
// ---------------------- 6 ----------------------
// Как сделать так, чтобы дочерний элемент перерисовывался только на четных значениях count
// -----------------------------------------------
const ParentElement = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevProps) => ++prevProps);

  return (
    <>
      Parent: {count} <br />
      <SubElement clicker={increment} count={count} />
    </>
  );
};

const SubElement = ({ clicker, count }) => {
  return (
    <>
      Sub: {count} <br />
      <button onClick={clicker}>Increment</button>
    </>
  );
};

// Хороший вариант решения:

const SubElement = React.memo(
  ({ clicker, count }) => {
    return (
      <>
        Sub: {count} <br />
        <button onClick={clicker}>Increment</button>
      </>
    );
  },
  (prev, next) => {
    return next.conut % 2 !== 0;
  }
);

////////////////////////////////////////////////////////////////////
//
// ---------------------- 7 ----------------------
// Задача на ключи
// Что и в какой последовательности будет выведено в консоль
// -----------------------------------------------

import { useState, useEffect, useLayoutEffect } from 'react';

const Item = ({ item }) => {
  useEffect(() => {
    console.log(`useEffect: item ${item}`);

    return () => {
      console.log(`cleanup: item ${item}`);
    };
  }, []);

  return <div>{item}</div>;
};

const App = () => {
  const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);

  const deleteItem4 = () =>
    setItems((prevItems) => {
      return prevItems.filter((_, index) => index !== 4);
    });

  return (
    <div>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}

      <br />
      <br />
      <br />

      <button onClick={deleteItem4}>Delete item 4</button>
    </div>
  );
};

////////////////////////////////////////////////////////////////////
//
// ---------------------- 8 ----------------------
// Задача на ключи
// Что будет выведено в консоль, когда мы нажмем удалить Boris?
// -----------------------------------------------

import React, { useState, useEffect, useRef, memo, useCallback, useLayoutEffect } from 'react';

const User = ({ user, deleteUser }) => {
  useEffect(() => {
    return () => console.log(user, 'removed');
  }, []);

  return (
    <>
      {user} <button onClick={() => deleteUser(user)}>удалить</button>
      <br />
    </>
  );
};

const SomeElement = ({ usersList }) => {
  const [users, setUsers] = useState(usersList);

  const deleteUser = (user) => {
    setUsers((prev) => prev.filter((u) => u !== user));
  };

  return (
    <>
      {users.map((u, id) => (
        <User key={id} user={u} deleteUser={deleteUser} />
      ))}
    </>
  );
};

const usersList = ['Alex', 'Max', 'Boris', 'Oleg'];
//
//
//
//
//
//
//
//

const handleClick = () => {
  console.log();
};

const handleClick1 = handleClick;

handleClick === handleClick1; // false

const MyComponent = () => {
  const handleClick = useCallback(() => {
    console.log();
  }, [isReady]);

  const result = useMemo(() => {
    return hardCalc();
  }, [isReady1, isReady2, isReady3]);

  return <Child onClick={handleClick} />;
};
