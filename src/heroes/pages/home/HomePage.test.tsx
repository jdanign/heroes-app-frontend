import { afterEach, describe, expect, test, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { HomePage } from "./HomePage"
import { useHeroPagination, useHeroSummary } from "@/heroes/hooks"
import { FavoriteHeroProvider } from "@/context"


vi.mock('@/heroes/hooks')

const mockUseHeroPagination = vi.mocked(useHeroPagination).mockReturnValue({
	data: [],
	isLoading: false,
	isError: false,
	isSuccess: true,
} as unknown as ReturnType<typeof useHeroPagination>)

/* const mockUseHeroSummary = */ vi.mocked(useHeroSummary).mockReturnValue({
	data: null,
	isLoading: false,
	isError: false,
	isSuccess: true,
} as unknown as ReturnType<typeof useHeroSummary>)


const queryClient = new QueryClient()


const renderHomePage = (initialEntries:string[] = ['/'])=>{
	return render(
		<MemoryRouter initialEntries={initialEntries}>
			<FavoriteHeroProvider>
				<QueryClientProvider client={queryClient}>
					<HomePage/>
				</QueryClientProvider>
			</FavoriteHeroProvider>
		</MemoryRouter>
	)
}


describe('HomePage.test', () => {
	afterEach(()=>{
		vi.clearAllMocks()
	})

	test('Debería renderizar el componente con los valores por defecto', () => {
		const {container} = renderHomePage()

		screen.debug()

		expect(container).toMatchSnapshot()
	})


	test('Debería llamar a usePaginatedHero con los valores por defecto', () => {
		renderHomePage()

		expect(mockUseHeroPagination).toHaveBeenCalledWith(1, 6, 'all')
	})


	test('Debería llamar a usePaginatedHero con los valores según query params (villain)', () => {
		const page = 2;
		const limit = 10;
		const tab = 'villain';

		renderHomePage([`/?page=${page}&limit=${limit}&tab=${tab}`])

		expect(mockUseHeroPagination).toHaveBeenCalledWith(page, limit, tab)
	})

	
	test('Debería llamar a usePaginatedHero con los valores según query params (favorites)', () => {
		const page = 2;
		const limit = 10;
		const tab = 'favorites';

		renderHomePage([`/?page=${page}&limit=${limit}&tab=${tab}`])

		expect(mockUseHeroPagination).toHaveBeenCalledWith(page, limit, tab)
	})


	test('Debería llamar a usePaginatedHero con los valores según query params (favorites) y hacer clic el en tab villain', () => {
		renderHomePage(['/?page=2&limit=10&tab=favorites'])

		const [, , , villainsTab] = screen.getAllByRole('tab');

		// screen.debug(villainsTab)

		fireEvent.click(villainsTab)

		expect(mockUseHeroPagination).toHaveBeenCalledWith(1, 10, 'villain')
	})
})