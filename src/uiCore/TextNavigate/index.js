import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './textNavigate.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TextNavigate(props) {
    const { content, color, to, position, top, bottom, left, right, fontSize, fontWeight } = props;

    return (
        <div
            className={cx('wrapper')}
            style={{
                textAlign: position,
                position: 'relative',
                top: top,
                left: left,
                right: right,
                bottom: bottom,
            }}
        >
            <Link className={cx('link')} to={to} style={{ color: color, fontSize: fontSize, fontWeight: fontWeight }}>
                {content}
            </Link>
        </div>
    );
}

TextNavigate.propTypes = {
    content: PropTypes.string,
    color: PropTypes.string,
    to: PropTypes.string,
    position: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string,
};

export default TextNavigate;
