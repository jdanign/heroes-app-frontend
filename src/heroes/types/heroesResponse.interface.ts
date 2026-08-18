import type { Hero } from "./hero.interface";


export type Pages = number;
export type Limit = number;


export interface HeroesResponse {
	total:  number;
	pages: 	Pages;
	heroes: Hero[];
}