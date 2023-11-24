import classNames from 'classnames/bind';
import styles from './footer.module.scss';

const cx = classNames.bind(styles);
console.log('🚀 ~ file: index.js:5 ~ cx:', cx('wrapper'));

export function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('grid wide')}>
        <div className={cx('row')}>
          <div className={cx('col c-4')}>
            <p>VÍ TIỀN</p>
          </div>
          <div className={cx('col c-4')}>
            <p>VÍ TIỀN</p>
          </div>
          <div className={cx('col c-4')}>
            <p>VÍ TIỀN</p>
          </div>
        </div>
      </div>
    </div>
  );
}
