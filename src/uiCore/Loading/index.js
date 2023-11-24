import classNames from 'classnames/bind';
import styles from './loading.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Loading(params) {
    const { title } = params;

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{title || 'Loading'}</h1>
            <div className={cx('loader')}></div>
        </div>
    );
}
Loading.propTypes = {
    title: PropTypes.string,
};

export default Loading;
