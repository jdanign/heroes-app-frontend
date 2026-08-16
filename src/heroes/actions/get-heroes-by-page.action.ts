import { BASE_URL, heroApi } from "../api"
import type { Hero, HeroesResponse } from "../types";


export const getHeroesByPageAction = async (): Promise<HeroesResponse> =>{
	const { data } = await heroApi.get('/');

	// Sustituye la propiedad image añadiéndole la ruta completa
	const heroes = data.heroes.map((hero: Hero) =>({
		...hero,
		image: `${BASE_URL}/images/${hero.image}`
	}))


	return {
		...data,
		heroes,
	};
}