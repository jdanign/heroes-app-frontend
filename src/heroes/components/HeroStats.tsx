import { Users, Heart, Zap, Trophy } from "lucide-react"
import { Badge } from "@/components/ui"
import { HeroStatCard } from "./"

import type { HeroesSummaryResponse } from "../types"


interface Props {
	summary: NoInfer<HeroesSummaryResponse> | undefined;
}


export const HeroStats = ({ summary }: Props)=>{
	if (summary){
		const { heroCount, villainCount, totalHeroes, strongestHero, smartestHero } = summary;

		return (
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				<HeroStatCard 
					title="Total de personajes" 
					icon={<Users className="h-4 w-4 text-muted-foreground" />} 
				>
					<div className="text-2xl font-bold">
						{totalHeroes}
					</div>
					<div className="flex gap-1 mt-2">
						<Badge variant="secondary" className="text-xs">
							{heroCount} Heroes
						</Badge>
						<Badge variant="destructive" className="text-xs">
							{villainCount} Villains
						</Badge>
					</div>
				</HeroStatCard>

				<HeroStatCard 
					title="Favoritos" 
					icon={<Heart className="h-4 w-4 text-muted-foreground" />} 
				>
					{/* TODO: Calcular este valor */}
					<div className="text-2xl font-bold text-red-600">3</div>
					<p className="text-xs text-muted-foreground">18.8% of total</p>
				</HeroStatCard>

				<HeroStatCard 
					title="Más fuerte" 
					icon={<Zap className="h-4 w-4 text-muted-foreground" />} 
				>
					<div className="text-lg font-bold">{strongestHero.alias}</div>
					<p className="text-xs text-muted-foreground">Strength: {strongestHero.strength}/10</p>
				</HeroStatCard>

				<HeroStatCard 
					title="Más inteligente" 
					icon={<Trophy className="h-4 w-4 text-muted-foreground" />} 
				>
					<div className="text-lg font-bold">{smartestHero.alias}</div>
					<p className="text-xs text-muted-foreground">Intelligence: { smartestHero.intelligence }/10</p>
				</HeroStatCard>
			</div>
		)
	}
}