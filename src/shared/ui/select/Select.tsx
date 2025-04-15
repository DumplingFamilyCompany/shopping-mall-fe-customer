import { useRef, useState } from 'react';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import Button from '../button/Button';
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
  width,
  onChange,
  onClose,
}: {
  children: React.ReactNode;
  value?: SelectedValue;
  hasLabel?: boolean;
  width?: string;
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
        width,
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
  const { width, selectedValue, handleTrigger } = useSelectContext();

  return (
    <div className={styles.trigger} onClick={handleTrigger} style={{ width }}>
      <p className={selectedValue?.value ? styles.selected : ''}>
        {selectedValue?.label || placeholder}
      </p>
      <Icon name="arrowBack" width="11px" />
      {children}
    </div>
  );
};

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const { isOpened, width } = useSelectContext();

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
      <Button width="78px" height="40px" fontSize="16px">
        검색
      </Button>
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
