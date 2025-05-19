import PropTypes from 'prop-types';
import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({ uncompleted, clearCompleted, filter, choiceFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{uncompleted} items left</span>
      <TasksFilter filter={filter} choiceFilter={choiceFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  uncompleted: '23',
  clearCompleted: () => {}
};

Footer.propTypes = {
  uncompleted: PropTypes.string,
  clearCompleted: PropTypes.func
};

export default Footer;
