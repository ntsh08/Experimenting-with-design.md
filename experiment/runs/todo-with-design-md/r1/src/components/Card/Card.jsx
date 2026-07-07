import './Card.css';

export function Card({ variant = 'flat', className = '', children, ...props }) {
  return (
    <div className={`card card--${variant} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
