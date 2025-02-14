import Icon from '../icon/Icon';
import styles from './tag.module.scss';

const Tag = ({
  label,
  id = '',
  onRemove,
}: {
  label: string;
  id?: string;
  onRemove?: (id: string) => void;
}) => {
  return (
    <div className={styles.container}>
      {label}
      <button onClick={() => onRemove?.(id)}>
        <Icon name="close" />
      </button>
    </div>
  );
};

export default Tag;
