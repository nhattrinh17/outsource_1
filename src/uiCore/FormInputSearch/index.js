import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './formSearch.module.scss';
import icons from '../icons';
import { useState } from 'react';
import { Select } from '..';

const cx = classNames.bind(styles);

function FormInputSearch(data) {
    const {
        label,
        type,
        fontSize,
        valueInit,
        minWidth,
        maxWidth,
        minHeight,
        location,
        maxHeight,
        name,
        autoComplete,
        multiple,
        className,
        onSearch,
    } = data;

    const [valueSearch, setValueSearch] = useState(valueInit || '');
    const [dataResult, setDataResult] = useState([]);
    const IconSearch = icons.search;

    async function startSearch() {
        const res = await onSearch(valueSearch);
        setDataResult(res);
    }

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
                className={cx('uicore__fromfroup--lable')}
                htmlFor={`uicore__htmlFor--${name}`}
            >
                {label}
            </label>
            <div className={cx('uicore__fromfroup--box')}>
                <input
                    autoComplete={autoComplete ? 'on' : 'off'}
                    id={`uicore__htmlFor--${name}`}
                    type={type}
                    value={valueSearch}
                    multiple={multiple ? true : false}
                    onChange={(e) => {
                        setValueSearch(e.target.value);
                    }}
                    className={cx('uicore__fromfroup--input')}
                    style={{ fontSize: fontSize }}
                />
                <div onClick={async () => await startSearch()}>
                    <IconSearch className={cx('uicore__fromfroup--icon')} />
                </div>
            </div>
            {!!dataResult?.length && <Select arrayData={dataResult} name={name} valueInit={dataResult[0]?.id} />}
        </div>
    );
}

FormInputSearch.propTypes = {
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
    onSearch: PropTypes.func,
};

export default FormInputSearch;
