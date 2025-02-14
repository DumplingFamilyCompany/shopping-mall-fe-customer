import { useMemo, useState } from 'react';
import styles from './toggleButton.module.css';
import { ToggleContext, useToggleContext } from './toggleButton.context';

const ToggleButton = ({
  children,
  onChange,
}: {
  children: React.ReactNode;
  onChange: (newValue: string) => void;
}) => {
  const [value, setValue] = useState<string>('');

  const handleToggle = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <ToggleContext.Provider value={{ value, onChange: handleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

const Button = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const { value: currentValue, onChange } = useToggleContext();

  const isActive = useMemo(() => {
    return value === currentValue;
  }, [value, currentValue]);

  return (
    <button
      className={isActive ? styles.active : ''}
      onClick={() => {
        onChange(value);
      }}
    >
      {children}
    </button>
  );
};

ToggleButton.ButtonGroup = ButtonGroup;
ToggleButton.Button = Button;

export default ToggleButton;
