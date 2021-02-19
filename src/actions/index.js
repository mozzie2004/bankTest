const banksLoaded = (banks)=>{
    return {
        type: 'BANKS-LOADED',
        payload: banks
    }
}

const banksRequested = ()=>{
    return {
        type: 'BANKS-REQUESTED'
    }
}

const banksError = ()=>{
    return {
        type: 'BANKS-ERROR'
    }
}

const removeBank = (id) => {
    return {
        type: 'REMOVE-BANK',
        id
    }
}

export {
    banksLoaded,
    banksRequested,
    banksError,
    removeBank
}