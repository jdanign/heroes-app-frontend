import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions";

import type { Limit, Pages } from "../types";


export const useHeroPagination = (page: Pages, limit: Limit)=>{
	return useQuery({
		// Espacio en memoria donde guardar el resultado de la petición
		queryKey: ['heroes', { page, limit }],
		// Función que se dispara (llamada a la API)
		queryFn: () => getHeroesByPageAction(page, limit),
		// Tiempo que se almacena la petición en caché en segundos
		staleTime: 1000 * 60,
	});
}