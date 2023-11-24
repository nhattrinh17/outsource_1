import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './formCheckBox.module.scss';

const cx = classNames.bind(styles);

function FormGroupCheckBox(props) {
    const { label, name, valueInit, type, getValue } = props;

    const [value, setValue] = useState(valueInit || false);

    return (
        <div className={cx('wrapper')}>
            <label className={cx('lable')}>{label}</label>
            {type === 'checkbox' ? (
                <input
                    type={type}
                    name={name}
                    checked={value}
                    onChange={(e) => {
                        setValue(e.target.checked);
                    }}
                    className={cx('input__checkbox')}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        if (getValue) {
                            setValue(e.target.value);
                        } else {
                            setValue(e.target.checked);
                        }
                    }}
                    className={cx('input__checkbox')}
                />
            )}
        </div>
    );
}

FormGroupCheckBox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    valueInit: PropTypes.any,
    type: PropTypes.string,
    getValue: PropTypes.bool,
};

export default FormGroupCheckBox;
