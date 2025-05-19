import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';

import './Task.css';

function Task({
  other: { description, created, completed, remainingSeconds, isTimerRunning },
  id,
  onDeleted,
  onToggleCompleted,
  startTimer,
  stopTimer,
  toggleEditing,
  editing,
  handleKeyDown
}) {
  const [inputValue, setInputValue] = useState(description);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const taskRef = useRef(null);
  const isEditing = editing[id] === true;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEditing && taskRef.current && !taskRef.current.contains(event.target)) {
        toggleEditing(id);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, toggleEditing, id]);

  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

  const timeAgo = formatDistanceToNow(created, { includeSeconds: true, addSuffix: true });

  return (
    <li className={completed ? 'completed' : isEditing ? 'editing' : ''} ref={taskRef}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggleCompleted}
        />
        <label>
          <span className="title" onDoubleClick={toggleEditing}>
            {description}
          </span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={startTimer}
              disabled={isTimerRunning || remainingSeconds <= 0}
            />
            <button
              className="icon icon-pause"
              onClick={stopTimer}
              disabled={!isTimerRunning || remainingSeconds <= 0}
            />
            {minutes}:{seconds}
          </span>
          <span className="description">created {timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEditing} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        value={inputValue}
        onKeyDown={(event) => handleKeyDown(event, id)}
        onChange={handleChange}
      />
    </li>
  );
}

Task.defaultProps = {
  description: 'text',
  created: new Date(),
  onDeleted: () => {},
  onToggleCompleted: () => {},
  completed: true
};

Task.propTypes = {
  description: PropTypes.node,
  created: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool
};

export default Task;
