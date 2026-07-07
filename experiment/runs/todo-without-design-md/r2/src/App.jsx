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

function badgeColorFor(priority) {
  const entry = PRIORITIES.find((p) => p.value === priority);
  return entry ? entry.badgeColor : 'gray';
}

function priorityLabelFor(priority) {
  const entry = PRIORITIES.find((p) => p.value === priority);
  return entry ? entry.label : priority;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [confirmingId, setConfirmingId] = useState(null);
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    const title = text.trim();
    if (!title) return;
    setTasks((prev) => [...prev, { id: nextId, title, priority, completed: false }]);
    setNextId((id) => id + 1);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setConfirmingId(null);
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tasks</h1>
        <p className="app__subtitle">
          {tasks.length === 0
            ? 'Nothing on your plate yet.'
            : `${activeCount} of ${tasks.length} task${tasks.length === 1 ? '' : 's'} remaining`}
        </p>
      </header>

      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <TextInput
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Task title"
          className="add-form__input"
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label} priority
            </option>
          ))}
        </select>
        <Button variant="primary" size="md" type="submit" disabled={!text.trim()}>
          Add
        </Button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'secondary' : 'ghost'}
            size="sm"
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
            icon={<span aria-hidden="true">🗒️</span>}
            title={
              tasks.length === 0
                ? 'No tasks yet'
                : filter === 'active'
                  ? 'No active tasks'
                  : 'No completed tasks'
            }
            description={
              tasks.length === 0
                ? 'Add your first task using the field above.'
                : filter === 'active'
                  ? 'Everything is done. Nice work!'
                  : 'Complete a task and it will show up here.'
            }
          />
        </Card>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <Card
                variant="elevated"
                className={`task${task.completed ? ' task--completed' : ''}`}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  label={task.title}
                  aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <div className="task__meta">
                  <Badge color={badgeColorFor(task.priority)}>
                    {priorityLabelFor(task.priority)}
                  </Badge>
                  {confirmingId === task.id ? (
                    <div className="task__confirm">
                      <span className="task__confirm-text">Delete?</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setConfirmingId(null)}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <IconButton
                      tone="danger"
                      aria-label={`Delete "${task.title}"`}
                      title="Delete task"
                      onClick={() => setConfirmingId(task.id)}
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
                        <path d="M2.5 4h11M6.5 4V2.5h3V4M5 4l.6 9.5h4.8L11 4M6.7 6.5v4.5M9.3 6.5v4.5" />
                      </svg>
                    </IconButton>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
