import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Button } from '@/components/button/Button';
import TextInput from '@/components/input/TextInput';
import Modal from '../Modal';
import { ModalTypes } from '../modal.types';
import styles from './searchModal.module.scss';

const SearchModal = ({
  type,
  title,
  children,
  handleCompleteButton,
}: {
  type: ModalTypes;
  title: string;
  children: React.ReactNode;
  handleCompleteButton: () => void;
}) => {
  return (
    <Modal type={type}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <Button.Filled width="200px" onClick={handleCompleteButton}>
          선택 완료
        </Button.Filled>
      </Modal.Footer>
    </Modal>
  );
};

const Search = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
}: {
  control: Control<TFieldValues>;
  name: TFieldName;
  placeholder: string;
}) => {
  return (
    <div className={styles.searchContainer}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput.Field
            width="100%"
            height="54px"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            hasLeftIcon
          />
        )}
      />
      <Button.Filled width="101px">검색</Button.Filled>
    </div>
  );
};

const Header = ({
  children,
  columnWidthArray = ['150px', 'auto'],
}: {
  children: React.ReactNode;
  columnWidthArray?: string[];
}) => {
  const columnGrid = columnWidthArray.join(' ');

  return (
    <div
      className={styles.listHeader}
      style={{ gridTemplateColumns: columnGrid }}
    >
      {children}
    </div>
  );
};

const ScrollContainer = ({
  children,
  isMultiSelect = false,
}: {
  children: React.ReactNode;
  isMultiSelect?: boolean;
}) => {
  return (
    <div
      className={`${styles.scrollContainer} ${isMultiSelect ? styles.multiScrollContainer : ''}`}
    >
      {children}
    </div>
  );
};

const Option = ({
  children,
  columnWidthArray = ['150px', '462px', 'auto'],
}: {
  children: React.ReactNode;
  columnWidthArray?: string[];
}) => {
  const columnGrid = columnWidthArray.join(' ');

  return (
    <div className={styles.list} style={{ gridTemplateColumns: columnGrid }}>
      {children}
    </div>
  );
};

const Tags = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.tagScrollContainer}>{children}</div>;
};

SearchModal.Search = Search;
SearchModal.Header = Header;
SearchModal.ScrollContainer = ScrollContainer;
SearchModal.Option = Option;
SearchModal.Tags = Tags;

export default SearchModal;
