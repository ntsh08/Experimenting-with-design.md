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

const PRIORITY_BADGE_COLOR = {
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
      <main className="app__column">
        <h1 className="app__title">Tasks</h1>

        <div className="app__add-row">
          <TextInput
            className="app__add-input"
            placeholder="Add a task…"
            aria-label="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />
          <select
            className="app__priority-select"
            aria-label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
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
              icon="📝"
              title="Nothing here yet"
              description="Add your first task above to get started."
            />
          ) : (
            <EmptyState
              icon="🔍"
              title={
                filter === 'Completed' ? 'No completed tasks' : 'No active tasks'
              }
              description={
                filter === 'Completed'
                  ? 'Tasks you complete will show up here.'
                  : 'Everything is done — nice work.'
              }
            />
          )
        ) : (
          <ul className="app__list">
            {visibleTasks.map((task) => (
              <li key={task.id}>
                <Card variant="flat" className="app__task-row">
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    label={
                      <span
                        className={`app__task-title${
                          task.completed ? ' app__task-title--completed' : ''
                        }`}
                      >
                        {task.title}
                      </span>
                    }
                  />
                  <span className="app__task-meta">
                    <Badge color={PRIORITY_BADGE_COLOR[task.priority]}>
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
      </main>

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
            role="dialog"
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
