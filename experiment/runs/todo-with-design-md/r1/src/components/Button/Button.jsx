import './Button.css';

export function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button type="button" className={`btn btn--${variant} btn--${size}`} {...props}>
      {children}
    </button>
  );
}
