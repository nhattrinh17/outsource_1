import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './formGroup.module.scss';
import icons from '../icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FormGroupVer2(data) {
    const {
        label,
        type,
        fontSize,
        value,
        setValue = () => {},
        icon,
        minWidth,
        maxWidth,
        minHeight,
        addOnchange,
        location,
        maxHeight,
        name,
        autoComplete,
        multiple,
        className,
        required,
    } = data;
    const [colorIcon, setColorIcon] = useState('#d9d9d9');

    let Icon = icons[icon];

    const handleForcus = () => {
        setColorIcon('var(--primary-color)');
        const elecemtLable = document.querySelector(`.lable__${name}`);
        elecemtLable.classList.add(styles['uicore__fromfroup--forcus']);
    };

    const handleBul = () => {
        if (!value && type !== 'datetime-local' && type !== 'file') {
            setColorIcon('#d9d9d9');
            const elecemtLable = document.querySelector(`.lable__${name}`);
            elecemtLable.classList.remove(styles['uicore__fromfroup--forcus']);
        }
    };

    return (
        <div
            className={cx('uicore__fromfroup--wrapper', `${className ? className : ''}`)}
            style={{
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight,
                float: location,
                fontSize: `${fontSize}`,
            }}
        >
            <label
                style={{ fontSize: fontSize }}
                className={
                    value || type === 'datetime-local' || type === 'file'
                        ? cx('uicore__fromfroup--lable', `lable__${name}`, 'uicore__fromfroup--forcus')
                        : cx('uicore__fromfroup--lable', `lable__${name}`)
                }
                htmlFor={`uicore__htmlFor--${name}`}
            >
                {label}
            </label>
            <div className={cx('uicore__fromfroup--box')}>
                {icon && <Icon color={colorIcon} className={cx('uicore__fromfroup--icon')} />}
                <input
                    autoComplete={autoComplete ? 'on' : 'off'}
                    id={`uicore__htmlFor--${name}`}
                    name={name}
                    type={type}
                    value={value}
                    required={required ? true : false}
                    multiple={multiple ? true : false}
                    onChange={(e) => {
                        if (typeof addOnchange === 'function') {
                            addOnchange(e);
                        }
                        setValue(e.target.value);
                    }}
                    className={cx('uicore__fromfroup--input')}
                    onFocus={() => handleForcus()}
                    onBlur={() => handleBul()}
                    style={{ fontSize: fontSize }}
                />
            </div>
        </div>
    );
}

FormGroupVer2.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    fontSize: PropTypes.string,
    addOnchange: PropTypes.func,
    autocomplete: PropTypes.bool,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
};

export default FormGroupVer2;
