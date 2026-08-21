import { useQuery } from "@tanstack/react-query";
import { searchHeroAction, type SearchOptions } from "../actions";


export const useHeroSearch = (params: SearchOptions)=>{
	return useQuery({
		queryKey: ['search', params],
		queryFn: () => searchHeroAction(params),
		staleTime: 1000 * 60
	});
}