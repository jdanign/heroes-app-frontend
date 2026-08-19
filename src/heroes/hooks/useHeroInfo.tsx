import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions";

import type { HeroSlug } from "../types";


export const useHeroInfo = (idSlug: HeroSlug = '')=>{
	return useQuery({
		// Espacio en memoria donde guardar el resultado de la petición
		queryKey: ['hero', idSlug],
		// Función que se dispara (llamada a la API)
		queryFn: () => getHeroAction(idSlug),
		// Tiempo que se almacena la petición en caché en segundos
		staleTime: 1000 * 60,
		// Para que no haga los 3 reintentos por defecto si la petición devuelve un error
		retry: false,
	});
}