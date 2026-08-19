import { heroApi, imageRealPath } from "../api"
import type { Hero, HeroSlug } from "../types";


export const getHeroAction = async (
	idSlug: HeroSlug
): Promise<Hero> =>{
	// Petición HTTP
	const { data } = await heroApi.get<Hero>('/' + idSlug);

	return {
		...data,
		image: imageRealPath(data.image),
	};
}