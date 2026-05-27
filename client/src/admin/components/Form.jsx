import { useId } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs uppercase tracking-widest text-mute font-medium mb-1.5">
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-cream-dark bg-cream/40 px-3.5 py-2.5 text-ink placeholder:text-mute/60 focus:bg-white focus:border-ochre/60 transition-colors';

export function TextField({ label, value, onChange, placeholder, type = 'text' }) {
  const id = useFieldId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function NumberField({ label, value, onChange, min, max, step = 1 }) {
  const id = useFieldId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type="number"
        value={value ?? 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, rows = 3, placeholder }) {
  const id = useFieldId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <textarea
        id={id}
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options = [] }) {
  const id = useFieldId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({ label, value, onChange, description }) {
  const id = useFieldId();
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-cream-dark text-ochre focus:ring-ochre"
      />
      <span>
        <span className="block text-sm text-ink">{label}</span>
        {description && <span className="block text-xs text-mute mt-0.5">{description}</span>}
      </span>
    </label>
  );
}

/**
 * Editable list of items.
 * - items: array of values
 * - onChange: (newArray) => void
 * - newItem: () => itemShape  (called when "Add" is clicked)
 * - renderItem: (item, onChangeItem, index) => JSX
 * - label: header label
 * - addLabel: button label
 */
export function ListField({ items, onChange, newItem, renderItem, label, addLabel = 'Ajouter' }) {
  if (!Array.isArray(items)) items = [];
  const update = (idx, value) => {
    const next = items.slice();
    next[idx] = value;
    onChange(next);
  };
  const remove = (idx) => {
    const next = items.slice();
    next.splice(idx, 1);
    onChange(next);
  };
  const move = (idx, delta) => {
    const target = idx + delta;
    if (target < 0 || target >= items.length) return;
    const next = items.slice();
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };
  const add = () => onChange([...items, newItem()]);

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-cream/40 border border-cream-dark rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-xs text-mute">
                <GripVertical size={14} />
                <span>#{idx + 1}</span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
                  className="text-xs text-mute hover:text-ochre disabled:opacity-30 px-2 py-1">↑</button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}
                  className="text-xs text-mute hover:text-ochre disabled:opacity-30 px-2 py-1">↓</button>
                <button type="button" onClick={() => remove(idx)}
                  aria-label="Supprimer"
                  className="text-mute hover:text-ochre p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {renderItem(item, (v) => update(idx, v), idx)}
          </div>
        ))}
      </div>
      <button type="button" onClick={add}
        className="mt-3 inline-flex items-center gap-2 text-sm text-forest hover:text-ochre transition-colors">
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <fieldset className="border border-cream-dark rounded-2xl p-5 mt-5 first:mt-0">
      <legend className="px-2 text-xs uppercase tracking-widest text-ochre font-medium">{title}</legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function useFieldId() {
  return useId();
}
