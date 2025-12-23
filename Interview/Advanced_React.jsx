// ---------------------- 1 ----------------------
// Что и в какой последовательности будет выведено в консоль?
// -----------------------------------------------
import { useState, useEffect, useLayoutEffect } from 'react';

const Child = ({ count }) => {
  useLayoutEffect(() => {
    console.log('Child LAYOUT_EFFECT');

    return () => {
      console.log('Child cleanup LAYOUT_EFFECT');
    };
  }, [count]);

  useEffect(() => {
    console.log('Child USE_EFFECT');

    return () => {
      console.log('Child cleanup USE_EFFECT');
    };
  }, [count]);

  return count;
};

const Parent = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log('Parent LAYOUT_EFFECT');

    return () => {
      console.log('Parent cleanup LAYOUT_EFFECT');
    };
  }, [count]);

  useEffect(() => {
    console.log('Parent USE_EFFECT');

    return () => {
      console.log('Parent cleanup USE_EFFECT');
    };
  }, [count]);

  return (
    <div>
      <Child count={count} />
      <br />
      <br />

      <button onClick={() => setCount((prev) => prev + 1)}>Increase count</button>
    </div>
  );
};

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && <Parent />}
      <br />
      <br />
      <br />

      <button onClick={() => setIsVisible(false)}>Destroy App</button>
    </div>
  );
};

export default App;

////////////////////////////////////////////////////////////////////
//
// ---------------------- 2 ----------------------
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
// ---------------------- 3 ----------------------
// Задача на ключи
// Что будет выведено в консоль, когда мы нажмем удалить Boris?
// -----------------------------------------------

import React, { useState, useEffect, useRef,  memo, useCallback, useLayoutEffect } from "react";

const User = ({ user, deleteUser }) => {

    useEffect(() => {
        return () => console.log(user, 'removed')
    }, [])

    return (
        <>{user} <button onClick={() => deleteUser(user)}>удалить</button><br /></>
    )
}

const SomeElement = ({ usersList }) => {
    const [users, setUsers] = useState(usersList)

    const deleteUser = (user) => {
        setUsers(prev => prev.filter(u => u !== user))
    }

    return (
        <>
            {users.map((u, id) => <User key={id} user={u} deleteUser={deleteUser} />)}
        </>
    )
}

const usersList = ['Alex', 'Max', 'Boris', 'Oleg'];


export default () => <SomeElement usersList={usersList} />
