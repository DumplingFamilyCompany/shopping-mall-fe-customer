import Icon from '../icon/Icon';
import styles from './titleTemplate.module.css';

const TitleTemplate = ({
  children,
  title,
  button,
  onClickHistoryBack,
}: {
  children: React.ReactNode;
  title: string;
  button?: React.ReactNode;
  onClickHistoryBack?: () => void;
}) => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.titleWithIconContainer}>
          {!!onClickHistoryBack && (
            <button onClick={onClickHistoryBack}>
              <Icon name="backArrow" width="24px" height="24px" />
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
        </div>
        {!!button && button}
      </div>
      {children}
    </div>
  );
};

export default TitleTemplate;
