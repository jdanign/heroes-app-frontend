import { heroApi } from "../api"
import type { Hero } from "../types";


export interface SearchOptions {
	name?: string | null;
	team?: string | null;
	category?: string | null;
	universe?: string | null;
	status?: string | null;
	strength?: string | null;
}


export const searchHeroAction = async (options: SearchOptions): Promise<Hero[]> =>{
	const { name, team, category, universe, status, strength } = options;

	if (name?.trim().length || team?.trim().length || category?.trim().length || universe?.trim().length || status?.trim().length || strength?.trim().length){
		// Petición HTTP
		const { data } = await heroApi.get<Hero[]>('/search', {
			params: {
				name,
				// El primer offset tiene que ser igual a 0 para la página 1, página 2 el offset es DEFAULT_LIMIT...
				team, 
				category,
				universe,
				status,
				strength,
			}
		});
	
	
		// Sustituye la propiedad image añadiéndole la ruta completa
		return data.map((hero: Hero) =>({
			...hero,
		}));
	}
	else 
		return [];

}