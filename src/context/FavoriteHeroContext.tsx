import { createContext, useEffect, useState, type PropsWithChildren } from "react";

import type { Hero } from "@/heroes/types";


const getFavoritesFromLocalStorage = ()=>{
	const favorites = localStorage.getItem('favorites');
	return favorites ? JSON.parse(favorites) : [];
}


interface FavoriteHeroContext{
	// State
	favorites: Hero[];
	favoriteCount: number;

	// Methods
	isFavorite: (hero: Hero)=> boolean;
	toggleFavorite: (hero: Hero)=> void;
}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);


export const FavoriteHeroProvider = ({children}: PropsWithChildren)=>{
	const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());


	const isFavorite = (hero: Hero)=>
		favorites.some(h => h.id === hero.id);


	const toggleFavorite = (hero: Hero)=>{
		const heroExist = favorites.find(h => h.id === hero.id);

		if (heroExist)
			setFavorites(favorites.filter(h => h.id !== hero.id))
		else
			setFavorites([...favorites, hero]);
	}


	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	
	}, [favorites])
	


	return (
		<FavoriteHeroContext value={{
			favoriteCount: favorites.length,
			favorites,
			isFavorite,
			toggleFavorite,
		}}>
			{children}
		</FavoriteHeroContext>
	)
}