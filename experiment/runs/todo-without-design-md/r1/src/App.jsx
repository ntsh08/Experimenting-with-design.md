import { useState } from 'react';
import {
  Button,
  Checkbox,
  TextInput,
  Card,
  Badge,
  IconButton,
  EmptyState,
} from './components/index.js';
import './App.css';

const PRIORITIES = [
  { value: 'low', label: 'Low', badgeColor: 'green' },
  { value: 'medium', label: 'Medium', badgeColor: 'amber' },
  { value: 'high', label: 'High', badgeColor: 'red' },
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const EMPTY_STATE_COPY = {
  all: {
    icon: '📝',
    title: 'No tasks yet',
    description: 'Add your first task above to get started.',
  },
  active: {
    icon: '🎉',
    title: 'No active tasks',
    description: 'Everything is done. Nice work!',
  },
  completed: {
    icon: '✅',
    title: 'No completed tasks',
    description: 'Tasks you complete will show up here.',
  },
};

let nextId = 1;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const addTask = (event) => {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      { id: nextId++, title, priority, completed: false },
    ]);
    setText('');
    setPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setPendingDeleteId(null);
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const emptyCopy = EMPTY_STATE_COPY[filter];

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tasks</h1>
        <p className="app__subtitle">
          {tasks.length === 0
            ? 'Nothing on your list yet'
            : `${activeCount} task${activeCount === 1 ? '' : 's'} remaining`}
        </p>
      </header>

      <Card variant="elevated" className="app__composer">
        <form className="composer" onSubmit={addTask}>
          <TextInput
            className="composer__input"
            placeholder="What needs to be done?"
            aria-label="Task title"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <select
            className="composer__priority"
            aria-label="Priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {PRIORITIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button type="submit" disabled={!text.trim()}>
            Add task
          </Button>
        </form>
      </Card>

      <div className="app__filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((option) => (
          <Button
            key={option.value}
            size="sm"
            variant={filter === option.value ? 'secondary' : 'ghost'}
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <Card className="app__empty">
          <EmptyState
            icon={emptyCopy.icon}
            title={emptyCopy.title}
            description={emptyCopy.description}
          />
        </Card>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => {
            const priorityMeta = PRIORITIES.find(
              (option) => option.value === task.priority
            );
            const isConfirmingDelete = pendingDeleteId === task.id;

            return (
              <li key={task.id}>
                <Card
                  className={`task${task.completed ? ' task--completed' : ''}`}
                >
                  {isConfirmingDelete ? (
                    <div className="task__confirm">
                      <span className="task__confirm-text">
                        Delete “{task.title}”?
                      </span>
                      <div className="task__confirm-actions">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setPendingDeleteId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="task__row">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        aria-label={`Mark "${task.title}" as ${
                          task.completed ? 'incomplete' : 'complete'
                        }`}
                      />
                      <span className="task__title">{task.title}</span>
                      <Badge color={priorityMeta.badgeColor}>
                        {priorityMeta.label}
                      </Badge>
                      <IconButton
                        tone="danger"
                        aria-label={`Delete "${task.title}"`}
                        onClick={() => setPendingDeleteId(task.id)}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M2.5 4h11M6.5 4V2.75A.75.75 0 0 1 7.25 2h1.5a.75.75 0 0 1 .75.75V4M5 4l.5 9.25a1 1 0 0 0 1 .75h3a1 1 0 0 0 1-.75L11 4M6.75 7v4M9.25 7v4" />
                        </svg>
                      </IconButton>
                    </div>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
