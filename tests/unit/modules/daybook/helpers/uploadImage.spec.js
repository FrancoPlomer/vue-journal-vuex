
import 'setimmediate';

import cloudinary from 'cloudinary'

import uploadImage from "@/modules/daybook/helpers/uploadImage";

import axios from "axios";

cloudinary.config({
    cloud_name: 'dxtnf9yrm',
    api_key: '482664795898341',
    api_secret: 'L8UcDyySb1blk-2OzT2g7suIgtg'
})
describe('uploadImage', () => {
    //La referencia done en el parametro de la funcion es para indicar a la prueba cuando termino
    test('debe de cargar un archivo y retornar el url', async ( ) => {
        
        const  { data } = await axios.get('https://res.cloudinary.com/dxtnf9yrm/image/upload/v1672788968/mmobxxjzkekulsodcusp.png', {
            responseType: 'arraybuffer',
        })
        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe( 'string' )
        // Tomamos el ID para borrar la imagen que subimos, cosa de no acumular la misma imagen en las pruebas
        //split sirve para crear un arreglo separado por cada una de las partes que hay en la url entre /
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '')
        const deleted = await cloudinary.v2.api.delete_resources( imageId )
        expect(Object.values(deleted['deleted'])[0]).toBe('not_found')
    })
})