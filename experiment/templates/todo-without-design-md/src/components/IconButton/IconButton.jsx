import './IconButton.css';

export function IconButton({ tone = 'neutral', children, ...props }) {
  return (
    <button type="button" className={`icon-btn icon-btn--${tone}`} {...props}>
      {children}
    </button>
  );
}
