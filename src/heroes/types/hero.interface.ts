export type HeroId = string;
export type HeroSlug = string;

export interface Hero {
	id: HeroId;
	name: string;
	slug: HeroSlug;
	alias: string;
	powers: string[];
	description: string;
	strength: number;
	intelligence: number;
	speed: number;
	durability: number;
	team: string;
	image: string;
	firstAppearance: string;
	status: string;
	category: string;
	universe: string;
}