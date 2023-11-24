import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

function getHeading(type) {
    switch (type) {
        case 'company':
            return 'công ty';
        case 'project':
            return 'dự án';
        case 'newstype':
            return 'danh mục tin tức';
        case 'news':
            return 'tin tức';
        case 'imagetype':
            return 'danh mục ảnh';
        case 'image':
            return 'ảnh';
        case 'permissiongrouptype':
            return 'định dạng phân quyền';
        case 'permissiongroup':
            return 'nhóm';
        case 'permissiongroupmember':
            return 'thành viên trong nhóm';
        case 'permissiongrouppermission':
            return 'quyền nhóm';
        case 'permissiontool':
            return 'tools';
        case 'permissiontoolcategory':
            return 'danh mục tools';
        default:
            return '';
    }
}

function Header(params) {
    const { heading, tools = [] } = params;
    const location = useLocation();
    let subHeading = '';
    const subTools = [];

    if (!tools.length && !heading) {
        const arrayLocation = location.pathname.split('/');
        const type = arrayLocation[2];
        const action = arrayLocation[3];
        if (!action) {
            subHeading += `Quản lý ${getHeading(type)}`;
            subTools.push({
                path: 'insert',
                name: 'Thêm ' + getHeading(type),
            });
            if (type === 'permissiontool' || type === 'permissiontoolcategory') {
                subTools.push({
                    path: 'sort',
                    name: 'Sắp xếp lại ' + getHeading(type),
                });
            }
        } else if (action === 'insert') {
            subHeading += `Thêm ${getHeading(type)}`;
        } else if (action === 'update') {
            subHeading += `Chỉnh sửa dữ liệu ${getHeading(type)}`;
        } else if (action === 'sort') {
            subHeading += `Sắp xếp ${getHeading(type)}`;
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>{heading || subHeading}</h2>
            <div className={cx('tools')}>
                {tools.length
                    ? tools.map((tool, index) => {
                          return (
                              <Link to={tool.path} key={index}>
                                  <Button
                                      classNames="eee"
                                      content={tool.name}
                                      backgroundColor="transparent"
                                      color="#000"
                                      borderColor="var(--primary-color)"
                                      fontSize="1.2rem"
                                      margin="0 12px 0 0"
                                      preventDefault={false}
                                  />
                              </Link>
                          );
                      })
                    : subTools.map((tool, index) => {
                          return (
                              <Link to={tool.path} key={index}>
                                  <Button
                                      content={tool.name}
                                      backgroundColor="transparent"
                                      color="#000"
                                      borderColor="var(--primary-color)"
                                      fontSize="1.2rem"
                                      preventDefault={false}
                                  />
                              </Link>
                          );
                      })}
            </div>
        </div>
    );
}

Header.propTypes = {
    heading: PropTypes.string,
    tools: PropTypes.array,
};

export default Header;
