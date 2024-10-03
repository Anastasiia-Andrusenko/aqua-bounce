import css from './Loader.module.css';
import { SyncLoader } from 'react-spinners';

const LoaderOverlay = () => {
  return (
    <div className={css.container}>
      <SyncLoader color="#00ff5e" className={css.loader} />
    </div>
  );
};

export default LoaderOverlay;
