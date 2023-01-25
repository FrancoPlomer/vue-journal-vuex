import journalApi from "@/api/journalApi";

export const loadEntries = async ( {commit} ) => {

    const { data } = await journalApi.get('/entries.json');

    if( !data ){
        commit('setEntries', [])
        return
    }
    const entries = [];
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    commit( 'setEntries', entries )
}   

export const updateEntry = async ( {commit}, entry ) => {

    const { data } = await journalApi.put(`/entries/${entry.id}.json`,{
        'date': entry.date,
        'text': entry.text,
        'picture': entry.picture
    })
    commit( 'updateEntry', {
        ... data,
        id: entry.id
    })
}   

export const createEntry = async ( {commit}, newEntry ) => {
    const { date, picture, text } = newEntry;
    const dataToSave = { date, picture, text };
    const { data } = await journalApi.post('/entries.json', dataToSave)
    dataToSave.id = data.name;
    
    commit('addEntry', dataToSave )

    return data.name;
}   

export const deleteEntry = async ( {commit}, id ) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id )
}