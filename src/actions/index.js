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


export {
    banksLoaded,
    banksRequested,
    banksError
}