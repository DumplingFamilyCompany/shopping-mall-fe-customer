import Icon from '../icon/Icon';
import styles from './textInput.module.scss';

const TextInput = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const Label = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div className={styles.label} style={{ width }}>
      {children}
    </div>
  );
};

const Field = ({
  placeholder,
  hasLeftIcon,
  hasRightIcon,
  disabled,
  width,
  height,
  value = '',
  onChange,
}: {
  placeholder?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  value?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={styles.container} style={{ width, height }}>
      <input
        className={`${styles.field} ${
          hasLeftIcon ? styles.leftIcon : hasRightIcon ? styles.rightIcon : ''
        }`}
        style={{ width, height }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {(hasLeftIcon || hasRightIcon) && (
        <Icon
          name="add"
          className={styles.icon}
          style={hasLeftIcon ? { left: 0 } : { right: 0 }}
          fill="#64758B"
        />
      )}
    </div>
  );
};

const Textarea = ({
  placeholder,
  hasLeftIcon,
  hasRightIcon,
  width,
  rows = 3,
  value,
  onChange,
}: {
  placeholder?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  width?: string;
  rows?: number;
  value?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={styles.container} style={{ width }}>
      <textarea
        rows={rows}
        className={`${styles.field} ${
          hasLeftIcon ? styles.leftIcon : hasRightIcon ? styles.rightIcon : ''
        }`}
        style={{ width }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {(hasLeftIcon || hasRightIcon) && (
        <Icon
          name="add"
          className={styles.icon}
          style={hasLeftIcon ? { left: 0 } : { right: 0 }}
        />
      )}
    </div>
  );
};

const Error = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

TextInput.Label = Label;
TextInput.Field = Field;
TextInput.Textarea = Textarea;
TextInput.Error = Error;

export default TextInput;
