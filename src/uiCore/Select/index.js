import classNames from 'classnames/bind';
import styles from './select.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Select(params) {
    const {
        title,
        name,
        valueInit,
        handleChange = () => {},
        textAlign,
        arrayData = [],
        minHeight,
        minWidth,
        maxHeight,
        fontSize,
        maxWidth,
        selectStatus,
        backgroundColor,
        color,
        margin,
    } = params;

    const [valueState, setValueState] = useState(valueInit || '');
    let nameFiled;

    if (arrayData?.length) {
        nameFiled = Object.keys(arrayData[0]);
    }
    return (
        <div className={cx('wrapper')}>
            {title && <label className={cx('title')}>{title}</label>}
            <select
                className={cx('form-select form-select-sm', 'wrapper__select')}
                aria-label=".form-select-sm example"
                value={valueState}
                name={name}
                style={{
                    minHeight: minHeight,
                    minWidth: minWidth,
                    maxHeight: maxHeight,
                    maxWidth: maxWidth,
                    textAlign: textAlign,
                    fontSize: fontSize,
                    backgroundColor: backgroundColor,
                    color: color,
                    margin: margin,
                }}
                onChange={(e) => {
                    setValueState(e.target.value);
                    handleChange && handleChange(e.target.value);
                }}
            >
                {selectStatus ? (
                    <>
                        <option className={cx('select__option')} value="0">
                            Không hoạt động
                        </option>
                        <option className={cx('select__option')} value="1">
                            Hoạt động
                        </option>
                    </>
                ) : (
                    arrayData?.map((item, index) => (
                        <option key={index} className={cx('select__option')} value={item[nameFiled[0]] + ''}>
                            {item[nameFiled[1]]}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}

Select.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    arrayData: PropTypes.array,
    valueInit: PropTypes.any,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    handleChange: PropTypes.func,
    textAlign: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
    fontSize: PropTypes.string,
    selectStatus: PropTypes.bool,
    margin: PropTypes.string,
};

export default Select;
