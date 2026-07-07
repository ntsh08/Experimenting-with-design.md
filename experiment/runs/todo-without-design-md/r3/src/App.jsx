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
  { value: 'low', label: 'Low', badge: 'green' },
  { value: 'medium', label: 'Medium', badge: 'amber' },
  { value: 'high', label: 'High', badge: 'red' },
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const EMPTY_COPY = {
  all: {
    title: 'No tasks yet',
    description: 'Add your first task above to get started.',
  },
  active: {
    title: 'No active tasks',
    description: 'Everything is done. Nice work!',
  },
  completed: {
    title: 'No completed tasks',
    description: 'Tasks you complete will show up here.',
  },
};

function priorityBadge(priority) {
  return PRIORITIES.find((p) => p.value === priority) ?? PRIORITIES[1];
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [draft, setDraft] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [confirmingId, setConfirmingId] = useState(null);
  const [nextId, setNextId] = useState(1);

  const addTask = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: nextId, text, priority, completed: false }]);
    setNextId((id) => id + 1);
    setDraft('');
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
    setConfirmingId(null);
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tasks</h1>
        <p className="app__subtitle">
          {tasks.length === 0
            ? 'Nothing on your plate.'
            : `${activeCount} of ${tasks.length} task${tasks.length === 1 ? '' : 's'} remaining`}
        </p>
      </header>

      <form className="add-form" onSubmit={addTask}>
        <TextInput
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="What needs doing?"
          aria-label="New task"
          className="add-form__input"
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          aria-label="Priority"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <Button variant="primary" type="submit" disabled={!draft.trim()}>
          Add
        </Button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            size="sm"
            variant={filter === f.value ? 'secondary' : 'ghost'}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <Card variant="flat" className="empty-card">
          <EmptyState
            icon="🗒️"
            title={EMPTY_COPY[filter].title}
            description={EMPTY_COPY[filter].description}
          />
        </Card>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <Card variant="flat" className="task-card">
                {confirmingId === task.id ? (
                  <div className="task-card__confirm">
                    <span className="task-card__confirm-text">
                      Delete “{task.text}”?
                    </span>
                    <div className="task-card__confirm-actions">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setConfirmingId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="task-card__row">
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark "${task.text}" ${task.completed ? 'incomplete' : 'complete'}`}
                    />
                    <span
                      className={`task-card__text${task.completed ? ' task-card__text--done' : ''}`}
                    >
                      {task.text}
                    </span>
                    <Badge color={priorityBadge(task.priority).badge}>
                      {priorityBadge(task.priority).label}
                    </Badge>
                    <IconButton
                      tone="danger"
                      aria-label={`Delete "${task.text}"`}
                      onClick={() => setConfirmingId(task.id)}
                    >
                      ✕
                    </IconButton>
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
