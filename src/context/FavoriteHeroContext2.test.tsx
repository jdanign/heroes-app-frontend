import { use } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "@/heroes/types";


const mockHero = {
	id: '1',
	name: 'batman',
} as Hero

const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	clear: vi.fn(),
}

// Sobrescribe el objeto de localStorage
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
})


// Componente de prueba para poder evaluar el contexto
const TestComponent = ()=>{
	const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

	return (
		<div>
			<div data-testid="favorite-count">{favoriteCount}</div>
			<div data-testid="favorite-list">
				{favorites.map(hero => (
					<div key={hero.id} data-testid={`hero-${hero.id}`}>
						{hero.name}
					</div>
				))}
			</div>

			<button data-testid="toggle-favorite"
				onClick={() => toggleFavorite(mockHero)}
			>
				Toggle Favorite
			</button>

			<div data-testid="is-favorite">
				{isFavorite(mockHero).toString()}
			</div>
		</div>
	)
}

const renderContextTest = ()=>{
	return render(
		<FavoriteHeroProvider>
			<TestComponent />
		</FavoriteHeroProvider>
	)
}


describe('FavoriteHeroContext.test', () => {
	beforeEach(()=>{
		vi.clearAllMocks()
	})


	test('Debería inicializar con los valores por defecto', () => {
		renderContextTest()

		// screen.debug()

		expect(screen.getByTestId('favorite-count').textContent).toBe('0')
		expect(screen.getByTestId('favorite-list').children.length).toBe(0)
	})


	test('Debería añadir un héroe a favoritos cuando se llama a toggleFavorite con un nuevo héroe', () => {
		renderContextTest()

		const button = screen.getByTestId('toggle-favorite')

		fireEvent.click(button)

		// screen.debug()

		expect(screen.getByTestId('favorite-count').textContent).toBe('1')
		expect(screen.getByTestId('is-favorite').textContent).toBe('true')
		expect(screen.getByTestId(`hero-${mockHero.id}`).textContent).toBe(mockHero.name)
		// expect(localStorage.getItem('favorites')).toBe(JSON.stringify([mockHero]))
		expect(localStorageMock.setItem).toHaveBeenCalled()
		expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([mockHero]))
	})


	test('Debería eliminar un héroe de favoritos cuando se llama a toggleFavorite', () => {
		// localStorage.setItem('favorites', JSON.stringify([mockHero]))
		localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]))

		renderContextTest()

		expect(screen.getByTestId('favorite-count').textContent).toBe('1')
		expect(screen.getByTestId('is-favorite').textContent).toBe('true')
		expect(screen.getByTestId(`hero-${mockHero.id}`).textContent).toBe(mockHero.name)

		const button = screen.getByTestId('toggle-favorite')

		fireEvent.click(button)

		// screen.debug()

		expect(screen.getByTestId('favorite-count').textContent).toBe('0')
		expect(screen.getByTestId('is-favorite').textContent).toBe('false')
		expect(screen.queryByTestId(`hero-${mockHero.id}`)).toBe(null)
		// expect(localStorage.getItem('favorites')).toBe(JSON.stringify([]))
		expect(localStorageMock.setItem).toHaveBeenCalled()
		expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([]))
	})
})