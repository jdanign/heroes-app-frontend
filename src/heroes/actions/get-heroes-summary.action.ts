import { heroApi } from "../api";
import type { HeroesSummaryResponse } from "../types";


export const getSummaryAction = async () =>{
	const { data } = await heroApi.get<HeroesSummaryResponse>('/summary');

	return data;
}