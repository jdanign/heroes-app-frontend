import { CustomJumbotron } from "@/components/custom"
import { HeroStats } from "@/heroes/components/HeroStats"


export const SearchPage = ()=>{
	return (
		<>
			{/* Header */}
			<CustomJumbotron
				title="Búsqueda de Superhéroes" 
				description="Busca a tus superhéroes y villanos favoritos" 
			/>

			{/* Stats Dashboard */}
			<HeroStats />
		</>
	)
}