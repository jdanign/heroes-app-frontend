import { use } from "react";

import { useNavigate } from "react-router";

import { FavoriteHeroContext } from "@/context";

import { Brain, Eye, Gauge, Heart, Shield, Zap } from "lucide-react"
import { Badge, Button, Card, CardContent, CardHeader, Progress } from "@/components/ui"

import type { Hero } from "../types";


interface Props {
	hero?: Hero;
}

const MAX_POWERS = 3;


export const HeroGridCard = ({ hero }: Props)=>{
	const navigate = useNavigate();

	const {isFavorite, toggleFavorite} = use(FavoriteHeroContext);


	if (hero){
		const { alias, category, description, durability, firstAppearance, image, intelligence, name, powers, slug, speed, status, strength, team, universe } = hero;


		const handleClick = ()=>{
			navigate(`/heroes/${slug}`);
		}


		return (
			<Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
				<div className="relative h-64 overflow-hidden">
					<img
						src={image ?? '/placeholder.svg?height=300&width=300'}
						alt={alias}
						className="object-cover transition-all duration-500 group-hover:scale-110"
						onClick={handleClick}
					/>

					{/* Status indicator */}
					<div className="absolute top-3 left-3 flex items-center gap-2">
						<div className={`w-3 h-3 rounded-full ${status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-red-500'} `} />
						<Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
							{status}
						</Badge>
					</div>

					{/* Universe badge */}
					<Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">
						{universe}
					</Badge>

					{/* Favorite button */}
					<Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
						onClick={()=>toggleFavorite(hero)}
					>
						<Heart className={`h-4 w-4 ${isFavorite(hero) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
					</Button>

					{/* View details button */}
					<Button
						size="sm"
						variant="ghost"
						className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<Eye className="h-4 w-4 text-gray-600" />
					</Button>
				</div>

				<CardHeader className="pb-3">
					<div className="flex justify-between items-start">
						<div className="space-y-1">
							<h3 className="font-bold text-lg leading-tight">{alias}</h3>
							<p className="text-sm text-gray-600">{name}</p>
						</div>
						<Badge className="text-xs bg-green-100 text-green-800 border-green-200">
							{category}
						</Badge>
					</div>
					<Badge variant="outline" className="w-fit text-xs">
						{team}
					</Badge>
				</CardHeader>

				<CardContent className="space-y-4">
					<p className="text-sm text-gray-600 line-clamp-2">
						{description}
					</p>

					{/* Stats */}
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<div className="flex items-center gap-1">
								<Zap className="h-3 w-3 text-orange-500" />
								<span className="text-xs font-medium">Fuerza</span>
							</div>
							<Progress value={strength * 10} className="h-2" activeColor="bg-orange-500" />
						</div>
						<div className="space-y-1">
							<div className="flex items-center gap-1">
								<Brain className="h-3 w-3 text-blue-500" />
								<span className="text-xs font-medium">Inteligencia</span>
							</div>
							<Progress value={intelligence * 10} className="h-2" activeColor="bg-blue-500" />
						</div>
						<div className="space-y-1">
							<div className="flex items-center gap-1">
								<Gauge className="h-3 w-3 text-green-500" />
								<span className="text-xs font-medium">Velocidad</span>
							</div>
							<Progress value={speed * 10} className="h-2" activeColor="bg-green-500" />
						</div>
						<div className="space-y-1">
							<div className="flex items-center gap-1">
								<Shield className="h-3 w-3 text-purple-500" />
								<span className="text-xs font-medium">Resistencia</span>
							</div>
							<Progress value={durability * 10} className="h-2" activeColor="bg-purple-500" />
						</div>
					</div>

					{/* Powers */}
					{powers.length && 
						<div className="space-y-2">
							<h4 className="font-medium text-sm">Poderes:</h4>
							<div className="flex flex-wrap gap-1">
								{hero.powers.slice(0, MAX_POWERS).map((power, i) =>(
									<Badge key={i} variant="outline" className="text-xs">
										{power}
									</Badge>
								))}
								{powers.length > MAX_POWERS &&
									<Badge variant="outline" className="text-xs bg-gray-100"
										title={hero.powers.slice(MAX_POWERS).join(', ')}
									>
										+{powers.length - MAX_POWERS} más
									</Badge>
								}
							</div>
						</div>
					}

					<div className="text-xs text-gray-500 pt-2 border-t">Primera aparición: {firstAppearance}</div>
				</CardContent>
			</Card>
		)
	}
	else
		return <></>
	
}