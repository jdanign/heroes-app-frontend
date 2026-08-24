import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useHeroPagination } from "./useHeroPagination";
import { getHeroesByPageAction } from "../actions";
import type { HeroesResponse } from "../types";


// Mock de getSummary
vi.mock('../actions/get-heroes-by-page.action', () => ({
	getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		}
	}
})


const tanStackCustomProvider = () => {
	return ({ children }: PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}


describe('useHeroPagination', () => {
	// Limpieza que realiza antes de cada test
	beforeEach(()=>{
		vi.clearAllMocks();
		queryClient.clear();
	});


	test('Debería devolver el estado inicial', () => {
		const { result } = renderHook(() => useHeroPagination(1,6), {
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
		const page = 1;
		const limit = 6;

		// Objeto que es necesario que devuelva el mock para pasar la prueba
		const mockHeroesData = {
			total: expect.any(Number),
			pages: expect.any(Number),
			heroes: expect.any(Array),
		} as HeroesResponse

		mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

		const { result } = renderHook(() => useHeroPagination(page, limit), {
			wrapper: tanStackCustomProvider(),
		})

		// Espera a que haya un cambio en result
		await waitFor(()=>{
			expect(result.current.isSuccess).toBe(true)
		})

		// console.log(result.current);

		expect(result.current.status).toBe('success')
		expect(mockGetHeroesByPageAction).toHaveBeenCalled()
		expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(page, limit, undefined)
	})


	test('Debería llamar a getHeroesByPageAction con argumentos', async () => {
		const page = 1;
		const limit = 6;
		const category = 'heroes';

		// Objeto que es necesario que devuelva el mock para pasar la prueba
		const mockHeroesData = {
			total: expect.any(Number),
			pages: expect.any(Number),
			heroes: expect.any(Array),
		} as HeroesResponse

		mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

		const { result } = renderHook(() => useHeroPagination(page, limit, category), {
			wrapper: tanStackCustomProvider(),
		})

		// Espera a que haya un cambio en result
		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		// console.log(result.current);

		expect(result.current.status).toBe('success')
		expect(mockGetHeroesByPageAction).toHaveBeenCalled()
		expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(page, limit, category)
	})
})