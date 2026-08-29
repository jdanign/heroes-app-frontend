import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, test, vi } from "vitest"

import { SearchControls } from "./SearchControls"
import { MemoryRouter } from "react-router"


if (typeof window.ResizeObserver === 'undefined'){
	class ResizeObserver{
		observe(){}
		unobserve(){}
		disconnect(){}
	}

	window.ResizeObserver = ResizeObserver;
}


const renderWithRouter = (initialEntries: string[] = ['/'])=>{
	return render(
		<MemoryRouter initialEntries={initialEntries}>
			<SearchControls />
		</MemoryRouter>
	)
}


describe('SearchControls', () => {
	afterEach(()=>{
		vi.clearAllMocks()
	})


	test('Debería renderizar el componente con los valores por defecto', () => {
		const {container} = renderWithRouter()

		// screen.debug()

		expect(container).toMatchSnapshot()
	})


	test('Debería establecer el valor del INPUT cuando el SEARCHPARAM name exista', () => {
		const name = 'Batman';

		renderWithRouter([`/?name=${name}`])

		const input =  screen.getByPlaceholderText('Busca héroes, villanos, poderes, equipos...')

		// screen.debug(input)

		expect(input.getAttribute('value')).toBe(name)
	})


	test('Debería cambiar los PARAMS cuando el INPUT cambia y se presiona ENTER', () => {
		const name = 'Batman';
		const newValue = 'Superman';

		renderWithRouter([`/?name=${name}`])

		const input =  screen.getByPlaceholderText('Busca héroes, villanos, poderes, equipos...')
		
		expect(input.getAttribute('value')).toBe(name)
		
		fireEvent.change(input, {
			target: {value: newValue},
		})
		
		fireEvent.keyUp(input, {
			key: 'Enter',
		})
		
		// screen.debug(input)

		expect(input.getAttribute('value')).toBe(newValue)
	})


	test('Debería cambiar el PARAM STRENGTH cuando el SLIDER cambie', () => {
		const name = 'Batman';
		const filters = true;

		renderWithRouter([`/?name=${name}${filters ? '&filters=true' : ''}`])

		const slider = screen.getByTestId('slider-strength').querySelector('input') as Element

		expect(slider?.getAttribute('aria-valuenow')).toBe('0');
		
		fireEvent.keyDown(slider, {key: 'ArrowRight'})
		expect(slider?.getAttribute('aria-valuenow')).toBe('1');
		
		// screen.debug(slider)
	})


	test('Debería estar ABIERTO el ACCORDION cuando el PARAM filters es igual a TRUE', () => {
		const name = 'Batman';
		const filters = true;

		renderWithRouter([`/?name=${name}${filters ? '&filters=true' : ''}`])

		const accordion = screen.getByTestId('accordion-filter')
		const accordionToggle = accordion.querySelector('div')

		// screen.debug(accordion)

		expect(accordionToggle?.hasAttribute('data-open')).toBe(true);
		expect(accordionToggle?.hasAttribute('data-closed')).toBe(false);
	})


	test('Debería estar CERRADO el ACCORDION cuando el PARAM filters es igual a FALSE', () => {
		const name = 'Batman';
		const filters = false;

		renderWithRouter([`/?name=${name}${filters ? '&filters=true' : ''}`])

		const accordion = screen.getByTestId('accordion-filter')
		const accordionToggle = accordion.querySelector('div') as Element

		// screen.debug(accordionToggle)

		expect(accordionToggle?.hasAttribute('data-closed')).toBe(true);
		expect(accordionToggle?.hasAttribute('data-open')).toBe(false);
	})
})