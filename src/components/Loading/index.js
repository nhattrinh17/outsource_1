import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Loading</h1>
            <div className={cx('loader')}></div>
        </div>
    );
}

export default Loading;
