import daybookRouter from "@/modules/daybook/router"

describe('pruebas en el router journal', () => {
    test('el router debe de tener esta configuracion', async () => {
        const promiseRouter = []
        // expect( daybookRouter ).toMatchObject({
        //     name: 'daybook',
        //     //El expect.any(Function) se debe a que como no podemos importar elementos para esta prueba indicamos que espera una funcion
        //     component: expect.any( Function ),
        //     children: [
        //         {
        //             path: '',
        //             name: 'no-entry',
        //             component: expect.any( Function ),
        //         },
        //         {
        //             path: ':id',
        //             name: 'entry',
        //             component: expect.any( Function ),
        //             props: ( route ) => {
        //                 const id = route.params.id;
        //                 return {
        //                     id
        //                 }
        //             }
        //         }
        //     ]
        // })
        daybookRouter.children.forEach( child => promiseRouter.push( child.component() ) )

        const routes = (await Promise.all( promiseRouter )).map( r => r.default.name )

        expect( routes ).toContain('entry-view')
        expect( routes ).toContain('NoEntrySelected')
    })

    test('Debe de retornar el id de la ruta', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }
        const entryRoute = daybookRouter.children.find( day => day.name === 'entry-view' )
        console.log(entryRoute);
        expect( entryRoute.props( route ) ).toEqual({id: 'ABC-123'})
    })
})