import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Button } from '../button/Button';
import Icon from '../icon/Icon';
import TextInput from '../input/TextInput';
import {
  SelectContext,
  SelectedValue,
  useSelectContext,
} from './select.context';
import styles from './select.module.scss';

const Select = ({
  children,
  value,
  hasLabel = false,
  onChange,
  onClose,
}: {
  children: React.ReactNode;
  value?: SelectedValue;
  hasLabel?: boolean;
  onChange: (selected: SelectedValue) => void;
  onClose?: () => void;
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleSelect = (selected: SelectedValue) => {
    onChange(selected);
    setIsOpened(false);
  };

  const handleTrigger = () => {
    setIsOpened((prev) => !prev);
  };

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (isOpened) {
      handleTrigger();
      onClose?.();
    }
  });

  return (
    <SelectContext.Provider
      value={{
        selectedValue: value,
        isOpened,
        handleTrigger,
        onChange: handleSelect,
      }}
    >
      <div className={hasLabel ? styles.flexContainer : ''} ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <label>{children}</label>;
};

const Trigger = ({
  placeholder = '선택해주세요.',
  children,
}: {
  placeholder?: string;
  children: React.ReactNode;
}) => {
  const { selectedValue, handleTrigger } = useSelectContext();

  return (
    <div className={styles.trigger} onClick={handleTrigger}>
      {selectedValue?.label || placeholder}
      <Icon name="downArrow" width="18px" />
      {children}
    </div>
  );
};

const Dropdown = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  const { isOpened } = useSelectContext();

  if (!isOpened) return null;

  return (
    <div className={styles.dropdown} style={{ width }}>
      {children}
    </div>
  );
};

const SearchBar = ({
  value = '',
  placeholder = '',
  width = '260px',
  onChange,
}: {
  value?: string;
  placeholder?: string;
  width?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <div
      className={styles.searchContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <TextInput>
        <TextInput.Field
          width={width}
          placeholder={placeholder}
          value={value}
          onChange={(value) => onChange?.(value)}
          hasLeftIcon
        />
      </TextInput>
      <Button.Filled width="78px" height="40px" fontSize="16px">
        검색
      </Button.Filled>
    </div>
  );
};

const OptionList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.optionScrollContainer}>
      <ul>{children}</ul>
    </div>
  );
};

const Option = ({
  label,
  value,
  isActive,
}: {
  label: string;
  value: string;
  isActive?: boolean;
}) => {
  const { onChange } = useSelectContext();

  return (
    <li
      className={`${styles.option} ${isActive ? styles.active : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onChange({ label, value });
      }}
    >
      <span>{label}</span>
    </li>
  );
};

Select.Label = Label;
Select.Trigger = Trigger;
Select.Dropdown = Dropdown;
Select.SearchBar = SearchBar;
Select.OptionList = OptionList;
Select.Option = Option;

export default Select;
