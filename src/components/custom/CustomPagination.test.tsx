import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { MemoryRouter } from "react-router";

import { CustomPagination } from "./CustomPagination";
import type { PropsWithChildren } from "react";


// Mock de los botones para reducir el código en el testeo
vi.mock('../ui', ()=>({
	Button: ({children, ...props}: PropsWithChildren)=> (
		<button {...props}>{children}</button>
	)
}))


const renderWithRouter = (component: React.ReactElement, initialEntries = ['/'])=>
	render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>)



describe('CustomPagination.test', () => {
	test('Debería renderizar el componente con los valores por defecto', () => {
		const totalPages = 5;
		let page = 0;

		renderWithRouter(<CustomPagination totalPages={totalPages} />)

		// screen.debug()

		expect(screen.getByText('Anterior')).toBeDefined()
		expect(screen.getByText('Siguiente')).toBeDefined()

		while (page < totalPages) {
			page++;
			expect(screen.getByText(`${page}`)).toBeDefined()
		}
	})


	test('Debería deshabilitar el botón Anterior cuando la página es la primera', () => {
		renderWithRouter(<CustomPagination totalPages={5} page={1} />)

		const button = screen.getByText('Anterior')
		// screen.debug()
		expect(button.getAttributeNames()).toContain('disabled')
	})


	test('Debería deshabilitar el botón Siguiente cuando la página es la última', () => {
		renderWithRouter(<CustomPagination totalPages={5} page={5} />)

		const button = screen.getByText('Siguiente')
		// screen.debug()
		expect(button.getAttributeNames()).toContain('disabled')
	})


	test('Debería deshabilitar el botón 3 cuando la página es la 3', () => {
		const page = 3;

		renderWithRouter(<CustomPagination totalPages={5} page={3} />)

		const buttonPrev = screen.getByText(`${page-1}`)
		const button = screen.getByText(`${page}`)
		const buttonNext = screen.getByText(`${page+1}`)
		// screen.debug()
		expect(button.getAttributeNames()).toContain('disabled')
		expect(button.getAttribute('variant')).toBe('default')
		expect(buttonPrev.getAttribute('variant')).toBe('outline')
		expect(buttonNext.getAttribute('variant')).toBe('outline')
	})


	test('Debería cambiar la página cuando se clica en un botón de paginación', () => {
		const page = 3;

		renderWithRouter(<CustomPagination totalPages={5} />, [`/?page=${page}`])

		const button = screen.getByText(`${page}`) as HTMLButtonElement
		const buttonPrev = screen.getByText(`${page-1}`) as HTMLButtonElement

		console.log(buttonPrev.outerHTML);

		// Estado inicial
		expect(button.getAttributeNames()).toContain('disabled')
		expect(button.getAttribute('variant')).toBe('default')
		expect(buttonPrev.getAttribute('variant')).toBe('outline')

		// Clic en el botón para cambiar de página
		fireEvent.click(buttonPrev)

		console.log(buttonPrev.outerHTML);

		// screen.debug()

		// Estado tras el clic
		expect(button.getAttribute('variant')).toBe('outline')
		expect(buttonPrev.getAttributeNames()).toContain('disabled')
		expect(buttonPrev.getAttribute('variant')).toBe('default')
	})
})