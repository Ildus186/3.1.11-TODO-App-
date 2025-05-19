import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import Footer from './Components/Footer/Footer';
import NewTaskForm from './Components/NewTaskForm/NewTaskForm';
import TaskList from './Components/TaskList/TaskList';

function App() {
  const timerInterval = useRef({});
  const maxId = useRef(100);

  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState({});

  const toggleEditing = (id) => {
    setEditing((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Escape') {
      toggleEditing(id);
    }

    if (event.key === 'Enter') {
      const idx = todoData.findIndex((element) => element.id === id);

      const value = event.target.value.trim();
      if (!value) {
        toggleEditing(id);
        return;
      }

      setTodoData((prevState) => {
        const newArray = [...prevState];
        newArray[idx] = { ...newArray[idx], description: value };
        return newArray;
      });
      toggleEditing(id);
    }
  };

  const filterTodos = (array, choice) => {
    if (choice === 'active') {
      return array.filter((item) => !item.completed);
    }
    if (choice === 'completed') {
      return array.filter((item) => item.completed);
    }
    return array;
  };

  const choiceFilter = (choice) => {
    setFilter(choice);
  };

  function deleteItem(id) {
    stopTimer(id);
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const newArray = [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
      clearInterval(timerInterval.current[id]);
      delete timerInterval.current[id];
      return newArray;
    });
    setEditing((prevState) => {
      const newEditing = { ...prevState };
      delete newEditing[id];
      return newEditing;
    });
  }

  const clearCompleted = () => {
    setTodoData((prevState) => {
      const newArray = prevState.filter((el) => !el.completed);
      return newArray;
    });
  };

  const addItem = (description, minuteTimer, secondTimer) => {
    const newItem = createTodoItem(description, minuteTimer, secondTimer);
    setTodoData((prevState) => {
      const newArray = [...prevState, newItem];
      return newArray;
    });
  };

  function startTimer(id) {
    timerInterval.current[id] = setInterval(() => {
      setTodoData((prevState) =>
        prevState.map((item) => {
          if (item.id === id) {
            const newRemainingSeconds = item.remainingSeconds - 1;
            if (newRemainingSeconds <= 0) {
              clearInterval(timerInterval.current[id]);
              delete timerInterval.current[id];
              return { ...item, remainingSeconds: 0, isTimerRunning: false };
            }
            return { ...item, remainingSeconds: newRemainingSeconds, isTimerRunning: true };
          }
          return item;
        })
      );
    }, 1000);
  }

  function stopTimer(id) {
    clearInterval(timerInterval.current[id]);
    delete timerInterval.current[id];
    setTodoData((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isTimerRunning: false
          };
        }
        return item;
      })
    );
  }

  const onToggleCompleted = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const oldItem = prevState[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
      return newArray;
    });
  };

  function createTodoItem(description, minuteTimer, secondTimer) {
    const minutes = parseInt(minuteTimer, 10) || 0;
    const seconds = parseInt(secondTimer, 10) || 0;
    const totalSeconds = minutes * 60 + seconds;
    return {
      description,
      totalSeconds,
      remainingSeconds: totalSeconds,
      created: new Date(),
      completed: false,
      isTimerRunning: false,
      id: maxId.current++
    };
  }

  const visibleTodos = filterTodos(todoData, filter);

  const completedCount = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addItem} />
      <section className="main">
        <TaskList
          todos={visibleTodos}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          startTimer={startTimer}
          stopTimer={stopTimer}
          toggleEditing={toggleEditing}
          editing={editing}
          handleKeyDown={handleKeyDown}
        />
        <Footer
          uncompleted={completedCount}
          clearCompleted={clearCompleted}
          choiceFilter={choiceFilter}
          filter={filter}
        />
      </section>
    </section>
  );
}

export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
