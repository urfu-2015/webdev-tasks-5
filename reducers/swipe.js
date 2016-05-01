import {VERTICAL_STARTED, VERTICAL_MOVED, VERTICAL_STOPPED, HORIZONTAL_STARTED, HORIZONTAL_MOVED, HORIZONTAL_STOPPED, TAPPED} from '../constants/ActionTypes'

const initialState = {
    verticalSwipe: {
        state: false,
        target: null,
        offset: 0
    },
    horizontalSwipe: {
        state: false,
        target: null,
        offset: 0
    },
    tap: {
        target: null
    }
};

export default function swipe(state = initialState, action) {
    switch (action.type) {
        case VERTICAL_STARTED:
            return {
                verticalSwipe: {
                    state: true,
                    target: action.verticalSwipe.target,
                    offset: 0
                },
                horizontalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                tap: {
                    target: null
                }
            };

        case VERTICAL_MOVED:
            return {
                verticalSwipe: {
                    state: true,
                    target: action.verticalSwipe.target,
                    offset: action.verticalSwipe.offset
                },
                horizontalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                tap: {
                    target: null
                }
            };

        case VERTICAL_STOPPED:
            return {
                verticalSwipe: {
                    state: false,
                    target: action.verticalSwipe.target,
                    offset: action.verticalSwipe.offset
                },
                horizontalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                tap: {
                    target: null
                }
            };

        case HORIZONTAL_STARTED:
            return {
                verticalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                horizontalSwipe: {
                    state: true,
                    target: action.horizontalSwipe.target,
                    offset: 0
                },
                tap: {
                    target: null
                }
            };

        case HORIZONTAL_MOVED:
            return {
                verticalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                horizontalSwipe: {
                    state: true,
                    target: action.horizontalSwipe.target,
                    offset: action.horizontalSwipe.offset
                },
                tap: {
                    target: null
                }
            };

        case HORIZONTAL_STOPPED:
            return {
                verticalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                horizontalSwipe: {
                    state: false,
                    target: action.horizontalSwipe.target,
                    offset: action.horizontalSwipe.offset
                },
                tap: {
                    target: null
                }
            };

        case TAPPED:
            return {
                verticalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                horizontalSwipe: {
                    state: false,
                    target: null,
                    offset: 0
                },
                tap: {
                    target: action.tap.target
                }
            };

        default:
            return state
    }
}


