import './TextInput.css';

export function TextInput({ error = false, className = '', ...props }) {
  return (
    <input
      type="text"
      className={`text-input${error ? ' text-input--error' : ''} ${className}`.trim()}
      {...props}
    />
  );
}
