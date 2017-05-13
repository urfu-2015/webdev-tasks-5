import { createStore } from 'redux'
import noteState from '../reducers'

export default function configureStore(initState) {
    const store = createStore(noteState, initState);

    if (module.hot) {
        console.log('HOT');
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}
