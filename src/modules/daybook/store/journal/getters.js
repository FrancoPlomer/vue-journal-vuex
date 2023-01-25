export const getEntriesByTerm = ( state ) => ( term = '' ) => {
    if( term.length ){
        return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
    } else{
        return state.entries;
    }
}

export const getEntryById = ( state ) => ( id ) => {
    if( id ){
        return state.entries.find( entry => entry.id === id )
    } else{
        return state.entries[0];
    }
}