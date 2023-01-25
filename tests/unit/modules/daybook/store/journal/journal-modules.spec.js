
import journalModule from "@/modules/daybook/store/journal"
import { journalState } from "../../../../mocks-data/test-journal-state"
import { createStore } from "vuex"

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            //Aqui lo hacemos de la sig manera por si queremos modificar el estado inicial
            ...journalModule,
            state: { ...initialState }
        }
    }
})

describe('journal', () => {
    
    test('Estado inicial', async ( ) => {
        const store = createVuexStore( journalState )

        const { isLoading, entries } = store.state.journal;

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
    })

    //Mutations
    test('mutation: setEntries', async ( ) => {
        
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })

        store.commit( 'journal/setEntries', journalState.entries )

        expect( store.state.journal.entries.length ).toBe(3)
        expect( store.state.journal.isLoading ).toBeFalsy()
    })

    test('mutation: updateEntry', async ( ) => {
        const store = createVuexStore( journalState )
        const updatedEntry = {
            "id": '-NKZzuLfeNWGvS9CwZqP',
            "date": 1672436749469,
            "picture": "https://res.cloudinary.com/dxtnf9yrm/image/upload/v1672788978/vwyj1pi8b5pwtrqm3ck3.png",
            "text": "hola desde pruebas"
        }
        store.commit( 'journal/updateEntry', updatedEntry )
        const filteredStore = store.state.journal.entries.find( st => st.id === updatedEntry.id )
        expect( JSON.stringify(filteredStore) ).toEqual( JSON.stringify(updatedEntry) )
    })

    test('mutation: addEntry deleteEntry', async ( ) => {
        const store = createVuexStore( journalState )

        const newEntry = {
            id: '-NKZzuLfeNWGvS9CwZqP',
            date: new Date().getTime(),
            picture: "https://res.cloudinary.com/dxtnf9yrm/image/upload/v1672788978/vwyj1pi8b5pwtrqm3ck3.png",
            text:'agregando una nueva entry desde pruebas',
        }

        store.commit( 'journal/addEntry', newEntry )
        expect( store.state.journal.entries.length ).toBe(4)
        expect(store.state.journal.entries.find( st => st.id === newEntry.id )).toEqual( newEntry );
        store.commit( 'journal/deleteEntry', newEntry.id )
        expect(store.state.journal.entries.find( st => st.id === newEntry.id )).toBeFalsy();
    })

})