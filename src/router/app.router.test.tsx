import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { appRrouter } from "./app.router";


vi.mock('@/heroes/layout/HeroesLayout', () => ({
	HeroesLayout: () => <div data-testid="heroes-layout">
		<Outlet />
	</div>,
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
	HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
	HeroPage: () => {
		const {id = ''} = useParams()

		return (<div data-testid="hero-page">HeroPage - {id}</div>)
	},
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
	default: () => <div data-testid="search-page"></div>,
	SearchPage: () => <div data-testid="search-page"></div>,
}));


describe('app.router.test', () => {
	const main = {
		path: '/',
		componentId: 'home-page'
	};


	test('Debería estar configurado correctamente', () => {
		expect(appRrouter.routes).toMatchSnapshot();
	})


	test('Debería renderizarse el HomePage en la ruta principal', () => {
		const router = createMemoryRouter(appRrouter.routes, {
			initialEntries: [main.path] // Ruta que se renderizará en las pruebas
		})
		
		render(<RouterProvider router={router} />)

		// screen.debug()

		expect(screen.getByTestId(main.componentId)).toBeDefined()
	})


	test('Debería renderizarse el HeroPage en la ruta /heroes/:id', () => {
		const router = createMemoryRouter(appRrouter.routes, {
			initialEntries: ['/heroes/superman']
		})
		
		render(<RouterProvider router={router} />)

		// screen.debug()

		expect(screen.getByTestId('hero-page').innerHTML).toContain('superman')
	})


	test('Debería renderizarse el SearchPage en la ruta /search', async () => {
		const router = createMemoryRouter(appRrouter.routes, {
			initialEntries: ['/search']
		})
		
		render(<RouterProvider router={router} />)

		expect(await screen.findByTestId('search-page')).toBeDefined()
		
		// screen.debug()
	})

	
	test('Debería redirigir a la ruta principal en rutas desconocidas', async () => {
		const router = createMemoryRouter(appRrouter.routes, {
			initialEntries: ['/pagina-desconocida']
		})
		
		render(<RouterProvider router={router} />)
		
		// screen.debug()

		expect(screen.getByTestId(main.componentId)).toBeDefined()
	})
});