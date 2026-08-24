import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { HeroesSummaryResponse } from "../types";
import { useHeroSummary } from "./useHeroSummary";
import { getSummaryAction } from "../actions";


// Mock de getSummary
vi.mock('../actions', ()=>({
	getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);


const tanStackCustomProvider = ()=>{
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			}
		}
	})

	return ({children}: PropsWithChildren)=>(
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}


describe('useHeroSummary', () => {
	test('Debería devolver el estado inicial', () => {
		const {result} = renderHook(()=> useHeroSummary(), {
			wrapper: tanStackCustomProvider(),
		})

		// console.log(result.current);

		// expect(result.current.isLoading).toBeTruthy()
		expect(result.current.isLoading).toBe(true)
		// expect(result.current.isError).toBeFalsy()
		expect(result.current.isError).toBe(false)
		// expect(result.current.data).toBeUndefined()
		expect(result.current.data).toBe(undefined)
	})


	test('Debería devolver success con data cuando la API da una respuesta correcta', async () => {
		// Objeto que es necesario que devuelva el mock para pasar la prueba
		const mockSummaryData = {
			totalHeroes: expect.any(Number),
			strongestHero: {
				id: expect.any(String),
				name: expect.any(String),
			},
			smartestHero: {
				id: expect.any(String),
				name: expect.any(String),
			},
			heroCount: expect.any(Number),
			villainCount: expect.any(Number),
		} as HeroesSummaryResponse


		mockGetSummaryAction.mockResolvedValue(mockSummaryData)

		const { result } = renderHook(() => useHeroSummary(), {
			wrapper: tanStackCustomProvider(),
		})

		// Espera a que haya un cambio en result
		await waitFor(()=>{
			expect(result.current.isSuccess).toBe(true)
			//console.log(result.current);
		})

		expect(result.current.isLoading).toBe(false)
		expect(result.current.isError).toBe(false)
		expect(mockGetSummaryAction).toHaveBeenCalled()
		/* expect(result.current.data).toStrictEqual({
			totalHeroes: 25,
			strongestHero: {
				id: '1',
				name: 'Clark Kent',
				slug: 'clark-kent',
				alias: 'Superman',
				powers: expect.any(Array),
				description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
				strength: 10,
				intelligence: 8,
				speed: 9,
				durability: 10,
				team: 'Liga de la Justicia',
				image: '1.jpeg',
				firstAppearance: '1938',
				status: 'Active',
				category: 'Hero',
				universe: 'DC'
			},
			smartestHero: {
				id: '2',
				name: 'Bruce Wayne',
				slug: 'bruce-wayne',
				alias: 'Batman',
				powers: expect.any(Array),
				description: 'El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.',
				strength: 6,
				intelligence: 10,
				speed: 6,
				durability: 7,
				team: 'Liga de la Justicia',
				image: '2.jpeg',
				firstAppearance: '1939',
				status: 'Active',
				category: 'Hero',
				universe: 'DC'
			},
			heroCount: 18,
			villainCount: 7
		}) */
	})


	test('Debería devolver el estado de error cuando la llamada a la API falla', async () => {
		const errorMessage = 'Failed to fetch summary';
		const mockError = new Error(errorMessage);

		mockGetSummaryAction.mockRejectedValue(mockError)

		const { result } = renderHook(() => useHeroSummary(), {
			wrapper: tanStackCustomProvider(),
		})

		// Espera a que haya un cambio en result
		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		// console.log(result);

		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBeDefined()
		expect(result.current.error?.message).toBe(errorMessage)
		expect(mockGetSummaryAction).toHaveBeenCalled()
	})
})