import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './flashMessage.module.scss';
import icons from '../icons/index';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function FlashMessage(params) {
    let { id, type, desc, icon, title, backgroundColor, handleDeleteFlashMessage } = params;

    useEffect(() => {
        setTimeout(() => handleDeleteFlashMessage(id), 5000);
        // eslint-disable-next-line
    }, []);

    if (!backgroundColor) {
        switch (type) {
            case 'warning':
                backgroundColor = backgroundColor || '#ffc107';
                title = title || 'Cảnh báo';
                icon = 'warning';
                break;
            case 'successful':
                backgroundColor = backgroundColor || '#0dcaf0';
                title = title || 'Thông báo';
                icon = 'check';
                break;
            case 'failed':
                backgroundColor = backgroundColor || '#dc3545';
                title = title || 'Thất bại';
                icon = 'exclamation';
                break;
            default:
                break;
        }
    }

    const Icon = icons[icon];

    return (
        <div className={cx('wrapper')} style={{ backgroundColor: `${backgroundColor}` }}>
            <div className={cx('box__close')}>
                <icons.close
                    className={cx('box__close--icon')}
                    color="currentColor"
                    onClick={() => handleDeleteFlashMessage(id)}
                />
            </div>
            <div className={cx('content')}>
                <h3 className={cx('content__heading')}>{title}</h3>
                <p className={cx('content__desc')}>{desc}</p>
            </div>
            <div className={cx('box__left')}>
                <Icon className={cx('box__left--icon')} color="currentColor" />
            </div>
        </div>
    );
}

FlashMessage.propTypes = {
    id: PropTypes.any,
    icon: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    handleDeleteFlashMessage: PropTypes.func,
};

export default FlashMessage;
