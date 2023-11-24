import classNames from 'classnames/bind';
import styles from './buttonOnTop.module.scss';
import icons from '@uiCore/icons';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function ButtonOnTop(params) {
    const { classElementScroll } = params;
    const Icon = icons.next;

    useEffect(() => {
        const containerized = window.document.querySelector(`.${classElementScroll}`);
        const boxWrapper = window.document.getElementsByClassName(styles.wrapper)[0];
        containerized && containerized?.addEventListener('scroll', scrollFunction);

        function scrollFunction() {
            // console.log(containerized.scrollTop);
            if (containerized.scrollTop > 100) {
                boxWrapper.classList.add(styles.show);
            } else {
                boxWrapper.classList.remove(styles.show);
            }
        }
        // When the user clicks on the button, scroll to the top of the document
        boxWrapper.addEventListener('click', backToTop);

        function backToTop() {
            containerized.scrollTo({ top: 0, behavior: 'smooth' });
            // containerized.animate({ scrollTop: 0 }, '1000');
        }

        return () => {
            containerized && containerized?.removeEventListener('scroll', scrollFunction);
        };
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('box__icon')}>
                <Icon className={cx('icon-top')} />
            </div>
        </div>
    );
}

ButtonOnTop.propTypes = {
    classElementScroll: PropTypes.string.isRequired,
};

export default ButtonOnTop;
