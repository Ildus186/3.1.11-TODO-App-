import PropTypes from 'prop-types';
import './TasksFilter.css';

function TasksFilter({ filter, choiceFilter }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'all' ? 'selected' : ''} onClick={() => choiceFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => choiceFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => choiceFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'all',
  choiceFilter: () => {}
};

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  choiceFilter: PropTypes.func
};

export default TasksFilter;
