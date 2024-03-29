import { shallowMount } from "@vue/test-utils";

import HomeView from "@/views/HomeView.vue";

describe('Home', () => {
    test('Debe hacer match con el snapshot', () => {
        const wrapper = shallowMount( HomeView )
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('hacer click en un boton debe de redireccionar a no-entry', () => {

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount( HomeView, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
        wrapper.find('button').trigger('click')
        expect( mockRouter.push ).toHaveBeenCalledWith(
            {
                name: 'no-entry'
            }
        )
    })
})