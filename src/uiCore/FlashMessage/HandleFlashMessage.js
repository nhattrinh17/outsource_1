import React, { PureComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { has } from 'underscore';
import FlashMessage from './index';

/**
 * ### class for store
 */
class Store {
    refs = {};

    /**
     * ### add ref
     */
    add(ref) {
        if (!has(this.refs, 'flashMessage')) {
            this.refs['flashMessage'] = ref;
        }
        return [this.del.bind(this, 'flashMessage')];
    }

    /**
     * ### get
     */
    get() {
        if (!has(this.refs, 'flashMessage')) {
            return false;
        }
        return this.refs['flashMessage'];
    }

    /**
     * ### del
     */
    del() {
        if (has(this.refs, 'flashMessage')) {
            delete this.refs['flashMessage'];
            return true;
        }
        return false;
    }
}

let store = new Store();

export function CreateHandleFlashMessage(props) {
    const storeId = {
        id: false,
        clear: false,
    };

    function _setRef(ref) {
        if (!this.id && !this.clear) {
            let [id, clear] = store.add(ref);
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

    return <HandleWrapperFlashMessage ref={_setRef.bind(storeId)} {...props} />;
}

export function addFlashMessagesSucc(message) {
    let ref = store.get();
    const data = {
        type: 'successful',
        desc: message,
    };
    ref.addFlashMessage(data);
}

export function addFlashMessageFailed(message) {
    let ref = store.get();
    const data = {
        type: 'failed',
        desc: message,
    };
    ref.addFlashMessage(data);
}

export function addFlashMessagesWarning(message) {
    let ref = store.get();
    const data = {
        type: 'warning',
        desc: message,
    };
    ref.addFlashMessage(data);
}

export function deleteFlashMessageById(id) {
    let ref = store.get();
    ref.deleteMessageById(id);
}

export default class HandleWrapperFlashMessage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allFlashMessage: [],
        };
    }

    static propTypes = {
        allFlashMessage: PropTypes.array,
    };

    addFlashMessage = (data) => {
        data.id = new Date().getTime();
        this.setState({
            allFlashMessage: [...this.state.allFlashMessage, data],
        });
    };

    deleteMessageById = (id) => {
        const dataNews = this.state.allFlashMessage.filter((element) => element.id !== id);
        this.setState({
            allFlashMessage: dataNews,
        });
    };

    render() {
        const allData = this.state.allFlashMessage;
        if (allData?.length <= 0) return null;
        return (
            <div
                className="wrapper"
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    overflow: 'hidden',
                    maxHeight: '100vh',
                    overflowY: 'hidden',
                    padding: '120px 12px 0 0',
                    zIndex: '2',
                    transition: 'all linear 2s',
                }}
            >
                {allData?.map((item, index) => (
                    <div key={index}>
                        {
                            <FlashMessage
                                type={item.type}
                                desc={item.desc}
                                id={item.id}
                                handleDeleteFlashMessage={(id) => {
                                    this.deleteMessageById(id);
                                }}
                            />
                        }
                    </div>
                ))}
            </div>
        );
    }
}
