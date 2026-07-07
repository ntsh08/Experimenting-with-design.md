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

const PRIORITY_COLORS = {
  low: 'gray',
  medium: 'amber',
  high: 'red',
};

const FILTERS = ['All', 'Active', 'Completed'];

let nextId = 1;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('All');
  const [pendingDelete, setPendingDelete] = useState(null);

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: nextId++, title: trimmed, priority, completed: false },
      ...prev,
    ]);
    setTitle('');
    setPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((task) => task.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1 className="app__title">Tasks</h1>

      <div className="app__add-row">
        <TextInput
          placeholder="Add a task…"
          aria-label="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
          className="app__add-input"
        />
        <select
          className="app__priority-select"
          aria-label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <Button variant="primary" size="md" onClick={addTask}>
          Add
        </Button>
      </div>

      <div className="app__filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((name) => (
          <Button
            key={name}
            variant={filter === name ? 'secondary' : 'ghost'}
            size="md"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        tasks.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="Type a task above and press Add to get started."
          />
        ) : (
          <EmptyState
            title={`No ${filter.toLowerCase()} tasks`}
            description="Try a different filter."
          />
        )
      ) : (
        <ul className="app__list">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <Card
                variant="flat"
                className={`task${task.completed ? ' task--completed' : ''}`}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  label={task.title}
                />
                <span className="task__meta">
                  <Badge color={PRIORITY_COLORS[task.priority]}>
                    {task.priority}
                  </Badge>
                  <IconButton
                    tone="neutral"
                    aria-label="Delete task"
                    onClick={() => setPendingDelete(task)}
                  >
                    ✕
                  </IconButton>
                </span>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {pendingDelete != null && (
        <div
          className="app__scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPendingDelete(null);
          }}
        >
          <Card
            variant="elevated"
            className="app__dialog"
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm deletion"
          >
            <p className="app__dialog-text">
              Delete “{pendingDelete.title}”?
            </p>
            <div className="app__dialog-actions">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </Button>
              <Button variant="danger" size="md" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
