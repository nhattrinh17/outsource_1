import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './pagination.module.scss';
import icons from '../icons';

const cx = classNames.bind(styles);

function getNumberPageDisplay(page, countPage) {
    const arrPage = [];
    if (page - 1 > 0) {
        arrPage.push(page - 1);
    }
    arrPage.push(page);
    if (page + 1 <= countPage) {
        arrPage.push(page + 1);
    }
    return arrPage;
}

function Pagination(params) {
    const { count, limit, page, setPage } = params;
    const countPage = Math.floor(count / limit) ? Math.floor(count / limit) : 1;
    const arrPage = getNumberPageDisplay(page, countPage);

    const IconNext = icons.next;
    const IconPrevious = icons.previous;

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('pagination__box')}>
                <li
                    className={
                        page === 1 ? cx('pagination__item--change', 'not__selected') : cx('pagination__item--change')
                    }
                    onClick={() => {
                        if (page > 1) {
                            setPage((pre) => pre - 1);
                        }
                    }}
                >
                    <IconPrevious className={cx('pagination__icon')} />
                </li>
                {page - 1 > 1 ? <li className={cx('pagination__dot')}>. . .</li> : <></>}
                {arrPage.map((itemPage, index) => (
                    <li
                        className={itemPage === page ? cx('pagination__item', 'active') : cx('pagination__item')}
                        key={index}
                        onClick={() => setPage(itemPage)}
                    >
                        {itemPage}
                    </li>
                ))}
                {page + 1 < countPage ? <li className={cx('pagination__dot')}>. . .</li> : <></>}
                <li
                    className={
                        page === countPage
                            ? cx('pagination__item--change', 'not__selected')
                            : cx('pagination__item--change')
                    }
                    onClick={() => {
                        if (page !== countPage) {
                            setPage((pre) => pre + 1);
                        }
                    }}
                >
                    <IconNext className={cx('pagination__icon')} />
                </li>
            </ul>
        </div>
    );
}

Pagination.propTypes = {
    count: PropTypes.number, //Tổng số phần tử
    limit: PropTypes.number, //Số phần tử 1 trang
    page: PropTypes.number,
    setPage: PropTypes.func,
};

export default Pagination;
