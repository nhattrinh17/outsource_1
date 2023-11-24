import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './table.module.scss';
import { useEffect, useRef } from 'react';
import Button from '../Button';
import icons from '../icons/index';

const cx = classNames.bind(styles);

function Table(props) {
    const {
        Loading,
        data = [],
        columnEdit,
        columnAddLanguage,
        columnDelete,
        columnRestore,
        backgroundColor,
        textColor,
        backgroundColorHeader = '#00c0f4',
        handleEdit,
        handleDelete,
        handleAddLanguage,
        handleRestore,
        pageSort,
        handleSort,
        textColorHeader = '#fff',
        handleDragAndDrop = () => {},
        columnNotShow = [],
    } = props;

    const Trash = icons.trash;
    const Edit = icons.edit;
    const Plush = icons.plush;

    const allDataShow = JSON.parse(JSON.stringify(data));
    allDataShow.forEach((item) => {
        columnNotShow.forEach((col) => {
            delete item[col];
        });
    });

    let columnNames;
    if (allDataShow.length) {
        columnNames = Object.keys(allDataShow[0]);
    }

    const items = useRef();

    useEffect(() => {
        if (pageSort) {
            items.current = document.querySelectorAll('.table__drop');
            handleDragAndDrop(items.current);
        }
    });

    return (
        <div className={cx('wrapper')}>
            {pageSort ? (
                <div className={cx('save__sort')}>
                    <Button
                        content="Lưu"
                        backgroundColor="#fff"
                        color="#000"
                        borderColor="#00c0f4"
                        handleClick={() => handleSort(items.current)}
                    />
                </div>
            ) : (
                <></>
            )}
            <div className="table-responsive-xxl">
                <table
                    style={{
                        backgroundColor: `${backgroundColor}`,
                        color: `${textColor}`,
                    }}
                    className={cx('table__custom', 'table', 'table-striped')}
                >
                    <thead
                        className={cx('thead-light')}
                        style={{ backgroundColor: `${backgroundColorHeader}`, color: `${textColorHeader}` }}
                    >
                        <tr className={cx('table__information')}>
                            {columnNames?.map((columnName, index) => (
                                <th key={index} className={cx('thead__column')}>
                                    {columnName !== 'id' ? columnName : '#'}
                                </th>
                            ))}
                            {columnEdit ? <th className={cx('thead__column')}>Sửa</th> : <></>}
                            {columnAddLanguage ? <th className={cx('thead__column')}>Ngôn ngữ</th> : <></>}
                            {columnDelete ? <th className={cx('thead__column')}>Xóa</th> : <></>}
                            {columnRestore ? <th className={cx('thead__column')}>Khôi phục</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {allDataShow?.map((item, index) => (
                            <tr
                                className={cx('table__row', 'table__drop')}
                                data-sort={`${item.id}-${index + 1}`}
                                key={index}
                                draggable={pageSort ? true : false}
                            >
                                {columnNames?.map((col, index2) =>
                                    index2 === 0 ? (
                                        <th key={index2} className={cx('table__value')}>
                                            {pageSort && (
                                                <i className={cx('fa-solid fa-sort', 'table__icon--sort')}></i>
                                            )}
                                            {/* {item[col]} */}
                                            {index + 1}
                                        </th>
                                    ) : col === 'status' ? (
                                        <td key={index2} className={cx('table__value', 'td__status')}>
                                            <span className={item[col] ? cx('active') : cx('not__active')}>
                                                {item[col] ? `Active` : `Not Active `}
                                            </span>
                                        </td>
                                    ) : col === 'image' ? (
                                        <td key={index2} className={cx('table__value', 'box__image')}>
                                            {item[col]?.split(',').map((image, index3) => (
                                                <img src={image} key={index3} alt="img show" className={cx('image')} />
                                            ))}
                                        </td>
                                    ) : (
                                        <td
                                            key={index2}
                                            className={
                                                col === 'deleted_at'
                                                    ? cx('table__value', 'table__value--delete')
                                                    : cx('table__value')
                                            }
                                        >
                                            {item[col] || 'Không có dữ liệu'}
                                        </td>
                                    ),
                                )}
                                {columnEdit ? (
                                    <td
                                        className={cx('table__value')}
                                        style={{ cursor: 'pointer', lineHeight: '100%' }}
                                        onClick={() => handleEdit(item[columnNames[0]])}
                                    >
                                        <Edit className={cx('table_row--icon')} />
                                    </td>
                                ) : (
                                    <></>
                                )}
                                {columnAddLanguage ? (
                                    <td
                                        className={cx('table__value')}
                                        style={{ cursor: 'pointer', lineHeight: '100%' }}
                                        onClick={() => handleAddLanguage(item[columnNames[0]])}
                                    >
                                        <Plush className={cx('table_row--icon')} />
                                    </td>
                                ) : (
                                    <></>
                                )}
                                {columnDelete ? (
                                    <td
                                        className={cx('table__value')}
                                        style={{ cursor: 'pointer', lineHeight: '100%' }}
                                        onClick={() => {
                                            handleDelete(item[columnNames[0]]);
                                        }}
                                    >
                                        <Trash className={cx('table_row--icon')} />
                                    </td>
                                ) : (
                                    <></>
                                )}
                                {columnRestore ? (
                                    <td
                                        className={cx('table__value')}
                                        style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            lineHeight: '100%',
                                        }}
                                        onClick={handleRestore}
                                    >
                                        Khôi phục
                                    </td>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {Loading}
        </div>
    );
}

Table.propTypes = {
    data: PropTypes.array,
    columnEdit: PropTypes.bool,
    columnDelete: PropTypes.bool,
    columnAddLanguage: PropTypes.bool,
    columnRestore: PropTypes.bool,
    backgroundColor: PropTypes.string,
    backgroundColorHeader: PropTypes.string,
    textColorHeader: PropTypes.string,
    textColor: PropTypes.string,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    handleAddLanguage: PropTypes.func,
    handleRestore: PropTypes.func,
    pageSort: PropTypes.bool,
    handleSort: PropTypes.func,
    handleDragAndDrop: PropTypes.func,
    columnNotShow: PropTypes.array,
    Loading: PropTypes.any,
};

export default Table;
