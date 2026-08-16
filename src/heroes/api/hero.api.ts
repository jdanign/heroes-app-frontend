import axios from 'axios';


// Importa la variable de entorno con el host del proyecto de backend
const BASE_URL = import.meta.env.VITE_API_URL;


// Instancia de axios
export const heroApi = axios.create({
	baseURL: `${BASE_URL}/api/heroes`,
});