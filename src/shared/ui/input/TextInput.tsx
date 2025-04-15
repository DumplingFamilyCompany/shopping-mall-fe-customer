import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import styles from './textInput.module.scss';

const TextInput = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const Label = ({
  children,
  // width,
  required,
  description,
}: {
  children: React.ReactNode;
  // width?: string;
  required?: boolean;
  description?: string;
}) => {
  return (
    <div className={styles.labelContainer}>
      <Typography className={styles.label} fontSize="20px" fontWeight="bold">
        {children}
        {required && (
          <Typography as="span" marginLeft="4px">
            *
          </Typography>
        )}
      </Typography>
      <div className={styles.spacer} />
      {description && (
        <div className={styles.description}>
          <Typography fontSize="18px" marginLeft="4px">
            {description}
          </Typography>
        </div>
      )}
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
  onlyNumbers,
  onChange,
}: {
  placeholder?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  value?: string;
  onlyNumbers?: boolean;
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
        inputMode={onlyNumbers ? 'numeric' : undefined}
        pattern={onlyNumbers ? '[0-9]*' : undefined}
        onInput={(e) => {
          if (!onlyNumbers) return;

          const onlyNums = e.currentTarget.value.replace(/[^0-9]/g, '');
          e.currentTarget.value = onlyNums;
          onChange?.(onlyNums);
        }}
        disabled={disabled}
      />
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
