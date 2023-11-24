import React, { PureComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { has } from 'underscore';
import Loading from './index';

/**
 * ### class for store
 */
class Store {
    refs = {};

    /**
     * ### add ref
     */
    add(ref, idCustom = false) {
        if (!idCustom) idCustom = this._genId();
        if (!has(this.refs, idCustom)) {
            this.refs[idCustom] = ref;
        }
        return [idCustom, this.del.bind(this, idCustom)];
    }

    /**
     * ### gen id
     */
    _genId() {
        const text_random = Math.random().toString(36).substr(2, 4);
        return new Date().getTime() + text_random; //gen id
    }

    /**
     * ### get
     */
    get(id) {
        if (!has(this.refs, id)) {
            return false;
        }
        return this.refs[id];
    }

    /**
     * ### del
     */
    del(id) {
        if (has(this.refs, id)) {
            delete this.refs[id];
            return true;
        }
        return false;
    }
}

let store = new Store();

export function CreateHandleLoading(idCustom = false, { ...props }) {
    const storeId = {
        id: false,
        clear: false,
    };

    function show() {
        if (this.id) {
            let ref = store.get(this.id);
            ref?.show();
        }
    }

    function hide() {
        if (this.id) {
            let ref = store.get(this.id);
            ref?.hide();
        }
    }

    function _setRef(ref) {
        if (!this.id && !this.clear) {
            let [id, clear] = store.add(ref, idCustom);
            this.id = id;
            this.clear = clear;
        }
    }

    useEffect(() => {
        return () => {
            let clear = storeId?.clear;
            clear && clear();
        };
    });

    return [<HandleLoading ref={_setRef.bind(storeId)} {...props} />, show.bind(storeId), hide.bind(storeId)];
}

export function showHandleLoading(id) {
    let ref = store.get(id);
    ref && ref?.show();
}

export function hideHandleLoading(id) {
    let ref = store.get(id);
    ref && ref?.hide();
}

export default class HandleLoading extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        };
    }

    static propTypes = {
        show: PropTypes.bool,
        title: PropTypes.string,
    };

    static defaultProps = {
        show: false,
        title: 'Đang xử lý',
    };

    show = () => {
        this.setState({
            show: true,
        });
    };

    hide = () => {
        this.setState({
            show: false,
        });
    };

    // state = {
    //     show: this.props.show,
    // };

    render() {
        let { show } = this.state;
        let { title } = this.props;
        if (!show) return null;
        return <Loading title={title} />;
    }
}
