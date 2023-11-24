import classNames from 'classnames/bind';
import styles from './loadingMore.module.scss';

const cx = classNames.bind(styles);

function LoadingMore() {
    return (
        <div className={cx('preloader')}>
            <div className={cx('loader')}></div>
        </div>
    );
}

export default LoadingMore;
