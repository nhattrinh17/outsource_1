import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
    const {
        minHeight,
        minWidth,
        maxWidth,
        maxHeight,
        backgroundColor,
        handleClick = () => {},
        type,
        borderColor,
        color,
        content,
        fontSize,
        preventDefault,
    } = props;

    return (
        <div className={cx('wrapper')}>
            <button
                type={type}
                className={cx('button')}
                style={{
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                    minHeight: minHeight,
                    maxHeight: maxHeight,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    color: color,
                    fontSize: fontSize,
                }}
                onClick={(e) => {
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    handleClick();
                }}
            >
                {content}
            </button>
        </div>
    );
}

Button.propTypes = {
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
    backgroundColor: PropTypes.string,
    handleClick: PropTypes.func,
    borderColor: PropTypes.string,
    type: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
    preventDefault: PropTypes.bool,
};

export default Button;
