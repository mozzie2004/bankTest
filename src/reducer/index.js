let initialState = {
    banks: [],
    loading: true,
    error: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {

        case 'BANKS-LOADED':
        return {
            ...state,
            loading: false,
            error: false,
            banks: action.payload
        }

        case 'BANKS-REQUESTED':
        return {
            ...state,
            error: false,
            loading: true
        }

        case 'BANKS-ERROR':
        return {
            ...state,
            loading: false,
            error: true
        }

        default:
        return {
            ...state
        }
    }
}

export default reducer;