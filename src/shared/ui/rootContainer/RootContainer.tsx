import Navigation from '../navigation/Navigation';
import styles from './rootContainer.module.scss';

const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default RootContainer;
