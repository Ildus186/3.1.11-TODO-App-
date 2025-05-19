import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [minuteTimer, setMinuteTimer] = useState('');
  const [secondTimer, setSecondTimer] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinuteChange = (e) => {
    const { value } = e.target;
    let newValue = value.replace(/\s/g, '');
    newValue = newValue.replace(/^0/, '');
    const parsedValue = parseInt(newValue, 10);
    if (Number.isNaN(parsedValue)) {
      newValue = '';
    }
    setMinuteTimer(newValue);
  };

  const onSecondChange = (e) => {
    const { value } = e.target;
    let newValue = value.replace(/\s/g, '');
    newValue = newValue.replace(/^0/, '');
    const parsedValue = parseInt(newValue, 10);
    if (Number.isNaN(parsedValue)) {
      newValue = '';
    } else if (parsedValue > 59) {
      newValue = 59;
    }
    setSecondTimer(newValue);
  };

  const validateForm = () => {
    const hasLabel = label.trim() !== '';
    const hasTime = minuteTimer !== '' || secondTimer !== '';
    const isValid = hasLabel && hasTime;
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd(label, minuteTimer, secondTimer);
      setLabel('');
      setMinuteTimer('');
      setSecondTimer('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          value={label}
          onChange={onLabelChange}
          className="new-todo"
          placeholder="Task"
          autoFocus
        />
        <input
          value={minuteTimer}
          onChange={onMinuteChange}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          value={secondTimer}
          onChange={onSecondChange}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
        <button type="submit" />
      </form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  onAdd: () => {}
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func
};

export default NewTaskForm;
