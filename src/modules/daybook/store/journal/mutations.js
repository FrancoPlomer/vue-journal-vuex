export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = ( state, newEntry ) => {
    state.isLoading = true;
    state.entries[ state.entries.indexOf( state.entries.find( value => value.id === newEntry.id ) ) ] = newEntry;
    state.isLoading = false;
}

export const addEntry = ( state, entry ) => {
    state.entries = [ entry , ...state.entries ]
}

export const deleteEntry = ( state, id ) => {
    state.entries = state.entries.filter( st => st.id !== id )
}