import { describe, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { HeroStats } from "./HeroStats"
import { useHeroSummary } from "../hooks"
import type { HeroesSummaryResponse } from "../types"
import { FavoriteHeroProvider } from "@/context"


vi.mock('../hooks')
const mockUseHeroSummary = vi.mocked(useHeroSummary)


const mockSummaryData: HeroesSummaryResponse = {
	totalHeroes: 25,
	strongestHero: {
		id: "1",
		name: "Clark Kent",
		slug: "clark-kent",
		alias: "Superman",
		powers: [
			"Súper fuerza",
			"Vuelo",
			"Visión de calor",
			"Visión de rayos X",
			"Invulnerabilidad",
			"Súper velocidad"
		],
		description: "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
		strength: 10,
		intelligence: 8,
		speed: 9,
		durability: 10,
		team: "Liga de la Justicia",
		image: "1.jpeg",
		firstAppearance: "1938",
		status: "Active",
		category: "Hero",
		universe: "DC"
	},
	smartestHero: {
		id: "2",
		name: "Bruce Wayne",
		slug: "bruce-wayne",
		alias: "Batman",
		powers: [
			"Artes marciales",
			"Habilidades de detective",
			"Tecnología avanzada",
			"Sigilo",
			"Genio táctico"
		],
		description: "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
		strength: 6,
		intelligence: 10,
		speed: 6,
		durability: 7,
		team: "Liga de la Justicia",
		image: "2.jpeg",
		firstAppearance: "1939",
		status: "Active",
		category: "Hero",
		universe: "DC"
	},
	heroCount: 18,
	villainCount: 7
};


/* Con el mock ya no es necesario el queryClient ni el QueryClientProvider
const queryClient = new QueryClient({
	defaultOptions:{
		queries:{
			retry: false,  // Si falla no hace reintentos
		}
	}
}) */

const renderHeroStats = (mockData?: Partial<HeroesSummaryResponse>) => {
	mockUseHeroSummary.mockReturnValue({
		data: mockData ?? undefined, // Sobrescribe la data que recibe el componente
	} as unknown as ReturnType<typeof useHeroSummary>)


	/* return render(
		<QueryClientProvider client={queryClient}>
			<HeroStats />
		</QueryClientProvider>
	) */
	return render(
		<FavoriteHeroProvider>
			<HeroStats />
		</FavoriteHeroProvider>
	)
}


describe('HeroStats.test', () => {
	test('Debería renderizar el componente con los valores por defecto', () => {
		const { container } = renderHeroStats()

		// screen.debug()

		expect(container).toMatchSnapshot()
	})


	test('Debería renderizar el componente con la información indicada', () => {
		const { container } = renderHeroStats(mockSummaryData)

		// screen.debug()

		expect(container).toMatchSnapshot()

		expect(screen.getByText('Total de personajes')).toBeDefined()
		expect(screen.getByText('Favoritos')).toBeDefined()
	})


	test('Debería cambiar el porcentaje de favoritos cuando un héroe es añadido a favoritos', ()=>{
		localStorage.setItem('favorites', JSON.stringify([mockSummaryData.strongestHero]))

		renderHeroStats(mockSummaryData)

		const favoritePercentageElement = screen.getByTestId('favorite-precentage')
		
		expect(favoritePercentageElement.innerHTML).toContain('4.00%')
		const favoriteCountElement = screen.getByTestId('favorite-count')
		expect(favoriteCountElement.innerHTML).toContain('1')
	})
})