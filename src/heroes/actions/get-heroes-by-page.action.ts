import { heroApi } from "../api"
import type { HeroesResponse, Limit, Pages } from "../types";


export const VALID_TABS: string[] = ['all', 'favorites', 'hero', 'villain'];
export type ValidTab = typeof VALID_TABS[number];
export const DEFAULT_TAB: string = 'all';
export const DEFAULT_PAGE: Pages = 1;
export const DEFAULT_LIMIT: Limit = 6;


export const getHeroesByPageAction = async (
	page: Pages, 
	limit: Limit = DEFAULT_LIMIT,
	category: ValidTab = DEFAULT_TAB
): Promise<HeroesResponse> =>{
	// Validación de parámetros 
	if (isNaN(page))
		page = DEFAULT_PAGE;

	if (isNaN(limit))
		limit = DEFAULT_LIMIT;


	// Petición HTTP
	const { data } = await heroApi.get('/', {
		params: {
			limit,
			// El primer offset tiene que ser igual a 0 para la página 1, página 2 el offset es DEFAULT_LIMIT...
			offset: (page - 1) * limit, 
			category
		}
	});

	return {
		...data,
	};
}