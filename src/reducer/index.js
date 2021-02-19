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

        case 'REMOVE-BANK':
            const index = state.banks.findIndex(item=>item.id === action.id)
        return {
            ...state,
            banks: [...state.banks.slice(0, index), ...state.banks.slice(index+1)]
        }

        default:
        return {
            ...state
        }
    }
}

export default reducer;