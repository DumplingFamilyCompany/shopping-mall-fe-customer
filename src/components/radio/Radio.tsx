import styles from './radio.module.scss';

const RadioGroup = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};

const Indicator = ({
  name,
  id,
  value,
  checked = false,
  disabled = false,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <input
      type="radio"
      className={styles.input}
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={() => onChange?.(value)}
    />
  );
};

const Label = ({
  children,
  inputId,
}: {
  children: React.ReactNode;
  inputId: string;
}) => {
  return (
    <label htmlFor={inputId} className={styles.label}>
      {children}
    </label>
  );
};

export default { RadioGroup, Indicator, Label };
