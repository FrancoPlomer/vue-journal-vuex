import { shallowMount } from "@vue/test-utils";

import Fab from "@/modules/daybook/components/Fab.vue";

describe('Fab', () => {
    test('Debe hacer match con el snapshot', () => {
        const wrapper = shallowMount( Fab )
        expect( wrapper.html() ).toMatchSnapshot()
    })
    test('Debe mostrar icono por defecto', () => {
        const wrapper = shallowMount( Fab )
        const icon = wrapper.find('i')
        expect(icon.attributes().class).toBe('fa fa-2x fa-plus')
    })
    test('Debe mostrar icono por argumento: fa-circle', () => {        
        const iconProp = 'fa fa-2x fa-circle'
        const wrapper = shallowMount( Fab, {
            props: {
                icon: iconProp
            }
        })
        const icon = wrapper.find('i')
        expect(icon.attributes().class).toBe('fa fa-2x fa-circle')

    })
    test('Debe de emitir el evento on:click cuando se hace click', async() => {
        const wrapper = shallowMount( Fab )
        await wrapper.find('i').trigger('click')
        expect(wrapper.emitted('on:click')).toBeTruthy()
    })
})