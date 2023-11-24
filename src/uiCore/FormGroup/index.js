import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './formGroup.module.scss';
import icons from '../icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FormGroup(data) {
    const {
        label,
        type,
        fontSize,
        valueInit,
        icon,
        minWidth,
        maxWidth,
        minHeight,
        location,
        maxHeight,
        name,
        autoComplete,
        multiple,
        className,
        addOnchange,
    } = data;

    const [valueState, setValueState] = useState(valueInit || '');

    const [colorIcon, setColorIcon] = useState('#d9d9d9');
    let Icon = icons[icon];

    const handleFocus = () => {
        setColorIcon('var(--primary-color)');
        const elecemtLable = document.querySelector(`.lable__${name}`);
        elecemtLable.classList.add(styles['uicore__fromfroup--forcus']);
    };

    const handleBul = () => {
        if (!valueState && type !== 'datetime-local' && type !== 'file') {
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
            {icon && <Icon color={colorIcon} className={cx('uicore__fromfroup--icon')} />}
            <div className={cx('uicore__fromfroup--box')}>
                <label
                    style={{ fontSize: fontSize }}
                    className={
                        valueState || type === 'datetime-local' || type === 'file'
                            ? cx('uicore__fromfroup--lable', `lable__${name}`, 'uicore__fromfroup--forcus')
                            : cx('uicore__fromfroup--lable', `lable__${name}`)
                    }
                    htmlFor={`uicore__htmlFor--${name}`}
                >
                    {label}
                </label>
                <input
                    autoComplete={autoComplete ? 'on' : 'off'}
                    id={`uicore__htmlFor--${name}`}
                    name={name}
                    type={type}
                    value={valueState}
                    multiple={multiple ? true : false}
                    onChange={(e) => {
                        if (addOnchange) {
                            addOnchange(e);
                        }
                        setValueState(e.target.value);
                    }}
                    className={cx('uicore__fromfroup--input')}
                    onFocus={() => handleFocus()}
                    onBlur={() => handleBul()}
                    style={{ fontSize: fontSize }}
                />
            </div>
        </div>
    );
}

FormGroup.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    valueInit: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    fontSize: PropTypes.string,
    autocomplete: PropTypes.bool,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    addOnchange: PropTypes.func,
};

export default FormGroup;
