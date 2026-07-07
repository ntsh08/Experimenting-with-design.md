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

const FILTERS = ['all', 'active', 'completed'];

const FILTER_LABELS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

let nextId = 1;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [pendingDelete, setPendingDelete] = useState(null);

  const addTask = (event) => {
    event.preventDefault();
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
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <main className="app__column">
        <h1 className="app__title">Tasks</h1>

        <form className="app__add-row" onSubmit={addTask}>
          <TextInput
            className="app__add-input"
            placeholder="Add a task…"
            aria-label="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <select
            className="app__priority-select"
            aria-label="Priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button type="submit" variant="primary" size="md">
            Add
          </Button>
        </form>

        <div className="app__filters" role="group" aria-label="Filter tasks">
          {FILTERS.map((value) => (
            <Button
              key={value}
              variant={filter === value ? 'secondary' : 'ghost'}
              size="md"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {FILTER_LABELS[value]}
            </Button>
          ))}
        </div>

        {visibleTasks.length === 0 ? (
          tasks.length === 0 ? (
            <EmptyState
              icon="🗒️"
              title="Nothing here yet"
              description="Add your first task above to get started."
            />
          ) : (
            <EmptyState
              icon="🔍"
              title={filter === 'active' ? 'No active tasks' : 'No completed tasks'}
              description={
                filter === 'active'
                  ? 'Everything is done. Nicely handled.'
                  : 'Tasks you complete will show up here.'
              }
            />
          )
        ) : (
          <ul className="app__list">
            {visibleTasks.map((task) => (
              <li key={task.id}>
                <Card
                  variant="flat"
                  className={`task-row${task.completed ? ' task-row--done' : ''}`}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    label={task.title}
                  />
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
                </Card>
              </li>
            ))}
          </ul>
        )}
      </main>

      {pendingDelete != null && (
        <div
          className="dialog-scrim"
          onClick={(event) => {
            if (event.target === event.currentTarget) setPendingDelete(null);
          }}
        >
          <Card
            variant="elevated"
            className="dialog"
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm deletion"
          >
            <p className="dialog__question">
              Delete “{pendingDelete.title}”? This can’t be undone.
            </p>
            <div className="dialog__actions">
              <Button variant="ghost" onClick={() => setPendingDelete(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} autoFocus>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
