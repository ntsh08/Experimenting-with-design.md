import './Badge.css';

export function Badge({ color = 'gray', children }) {
  return <span className={`badge badge--${color}`}>{children}</span>;
}
