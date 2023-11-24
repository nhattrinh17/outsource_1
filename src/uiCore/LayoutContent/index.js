import InfiniteScroll from '../InfiniteScroll';
import Header from '../Header';
import ButtonOnTop from '../ButtonOnTop';
import PropTypes from 'prop-types';

function LayoutContent(params) {
    const { children, fetchMore, hasMore, isInfiniteScroll, classElementScroll, Loading, headingHeader } = params;
    return (
        <div>
            <Header heading={headingHeader} />
            {isInfiniteScroll ? (
                <>
                    <InfiniteScroll fetchMore={() => fetchMore()} hasMore={hasMore}>
                        <div className="container">{children}</div>
                    </InfiniteScroll>
                    <ButtonOnTop classElementScroll={classElementScroll} />
                </>
            ) : (
                <div className="container">{children}</div>
            )}
            {Loading}
        </div>
    );
}

LayoutContent.propTypes = {
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,
    isInfiniteScroll: PropTypes.bool,
    classElementScroll: PropTypes.string,
    Loading: PropTypes.any,
    headingHeader: PropTypes.string,
};

export default LayoutContent;
