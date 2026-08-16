import { heroApi } from "../api"

export const getHeroesByPage = async () =>{
	const {data} = await heroApi.get('/');

	return data;
}