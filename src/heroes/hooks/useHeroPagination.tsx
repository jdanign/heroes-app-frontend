import { useQuery } from "@tanstack/react-query";
import { DEFAULT_TAB, getHeroesByPageAction, type ValidTab } from "../actions";

import type { Limit, Pages } from "../types";


export const useHeroPagination = (page: Pages, limit: Limit, category: ValidTab = DEFAULT_TAB)=>{
	return useQuery({
		// Espacio en memoria donde guardar el resultado de la petición
		queryKey: ['heroes', { page, limit, tab: category }],
		// Función que se dispara (llamada a la API)
		queryFn: () => getHeroesByPageAction(page, limit, category),
		// Tiempo que se almacena la petición en caché en segundos
		staleTime: 1000 * 60,
	});
}