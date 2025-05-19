import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

function TaskList({
  todos,
  onDeleted,
  onToggleCompleted,
  stopTimer,
  startTimer,
  toggleEditing,
  editing,
  handleKeyDown
}) {
  const elements = todos.map((item) => {
    const { id, ...other } = item;
    return (
      <Task
        key={id}
        id={id}
        other={other}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        stopTimer={() => stopTimer(id)}
        startTimer={() => startTimer(id)}
        toggleEditing={() => toggleEditing(id)}
        editing={editing}
        handleKeyDown={(event) => handleKeyDown(event, id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {}
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func
};

export default TaskList;
