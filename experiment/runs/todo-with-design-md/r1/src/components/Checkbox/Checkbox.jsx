import './Checkbox.css';

export function Checkbox({ checked, onChange, label, ...props }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 12 12" className="checkbox__check">
          <path
            d="M2.5 6.5L5 9L9.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label != null && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
