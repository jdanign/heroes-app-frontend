import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, test, vi } from "vitest"

import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { SearchPage } from "./SearchPage"
import { useHeroSearch, useHeroSummary } from "@/heroes/hooks"
import type { Hero } from "@/heroes/types"


vi.mock('@/heroes/hooks')

const mockUseHeroSearch = vi.mocked(useHeroSearch).mockReturnValue({
	data: [],
	isLoading: false,
	isError: false,
	isSuccess: true,
} as unknown as ReturnType<typeof useHeroSearch>)

vi.mocked(useHeroSummary).mockReturnValue({
	data: null,
	isLoading: false,
	isError: false,
	isSuccess: true,
} as unknown as ReturnType<typeof useHeroSummary>)

// Tambien podría usarse definido de esta manera (está sin probar)
/* vi.mock('@/heroes/hooks', ()=>({
    useHeroSearch: ()=> ({
        data: [],
        isLoading: false,
        isError: false,
        isSuccess: true,
    } as unknown as ReturnType<typeof useHeroSearch>),
})) */


vi.mock('@/components/custom', ()=>({
	CustomJumbotron: ()=> <div data-testid="custom-jumbotron"></div>,
	CustomBreadcrumb: ()=> <div data-testid="custom-breadcrumb"></div>,
}))

vi.mock('./ui', ()=>({
	SearchControls: ()=> <div data-testid="search-controls"></div>,
}))


vi.mock('@/heroes/components/HeroGrid', ()=>({
	HeroGrid: ({heroes}: {heroes: Hero[]})=> (
		<div data-testid="hero-grid">
			{heroes.map(hero =>
				<div key={hero.id}>{hero.name}</div>
			)}
		</div>
	)
}))


const renderSearchPage = (initialEntries:string[] = ['/'])=>{
	return render(
		<MemoryRouter initialEntries={initialEntries}>
			<QueryClientProvider client={new QueryClient()}>
				<SearchPage/>
			</QueryClientProvider>
		</MemoryRouter>
	)
}


describe('SearchPage', () => {
	afterEach(()=>{
		vi.clearAllMocks()
	})


	test('Debería renderizar el componente con los valores por defecto', () => {
		const params = {
			category: undefined,
			name: undefined,
			status: undefined,
			strength: undefined,
			team: undefined,
			universe: undefined,
		};

		const {container} = renderSearchPage()

		// screen.debug()

		expect(mockUseHeroSearch).toHaveBeenCalledWith(params)

		expect(container).toMatchSnapshot()
	})


	test('Debería searchAction con el parámetro name', () => {
		const params = {
			category: undefined,
			name: 'superman',
			status: undefined,
			strength: undefined,
			team: undefined,
			universe: undefined,
		};

		renderSearchPage([`/search?name=${params.name}`])

		// screen.debug()

		expect(mockUseHeroSearch).toHaveBeenCalledWith(params)
	})


	test('Debería searchAction con el parámetro strength', () => {
		const params = {
			category: undefined,
			name: undefined,
			status: undefined,
			strength: '6',
			team: undefined,
			universe: undefined,
		};

		renderSearchPage([`/search?strength=${params.strength}`])

		// screen.debug()

		expect(mockUseHeroSearch).toHaveBeenCalledWith(params)
	})


	test('Debería searchAction con el parámetro name y strength', () => {
		const params = {
			category: undefined,
			name: 'batman',
			status: undefined,
			strength: '8',
			team: undefined,
			universe: undefined,
		};

		renderSearchPage([`/search?name=${params.name}&strength=${params.strength}`])

		// screen.debug()

		expect(mockUseHeroSearch).toHaveBeenCalledWith(params)
	})


	test('Debería renderizar HeroGrid con los resultados de búsqueda', () => {
		const mockHeroes = [
			{id: '1', name: 'Clark Kent'} as unknown as Hero,
			{id: '2', name: 'Bruce Wayne'} as unknown as Hero,
		];

		mockUseHeroSearch.mockReturnValue({
			data: mockHeroes,
			isLoading: false,
			isError: false,
			isSuccess: true,
		} as unknown as ReturnType<typeof useHeroSearch>);

		renderSearchPage()

		screen.debug(screen.getByTestId('hero-grid'))

		mockHeroes.map(hero =>{
			expect(screen.getByText(hero.name))
		})
	})
})