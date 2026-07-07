import './EmptyState.css';

export function EmptyState({ icon, title, description, children }) {
  return (
    <div className="empty-state">
      {icon != null && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {description != null && (
        <p className="empty-state__description">{description}</p>
      )}
      {children != null && <div className="empty-state__action">{children}</div>}
    </div>
  );
}
