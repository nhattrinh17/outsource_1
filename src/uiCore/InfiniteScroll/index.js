import classNames from 'classnames/bind';
import styles from './infiniteScroll.module.scss';
import LoadingMore from '@uiCore/LoadingMore';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function InfiniteScroll({ children, fetchMore, hasMore, className }) {
    const pageEndRef = useRef(null);
    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // kiểm tra element có nằm trong viewport không?
                    fetchMore();
                }
            });

            if (pageEndRef.current) {
                observer.observe(pageEndRef.current);
            }

            return () => {
                if (pageEndRef.current) {
                    // eslint-disable-next-line
                    observer.unobserve(pageEndRef.current);
                }
            };
        }
        // eslint-disable-next-line
    }, [hasMore]);
    return (
        <div className={className || ''}>
            {children}

            {hasMore ? (
                <div ref={pageEndRef}>
                    <LoadingMore />
                </div>
            ) : (
                <div className={cx('end__data')}>--- Hết dữ liệu ---</div>
            )}
        </div>
    );
}

InfiniteScroll.propTypes = {
    children: PropTypes.any,
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,
    className: PropTypes.string,
};

export default InfiniteScroll;
