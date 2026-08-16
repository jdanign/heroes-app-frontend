import { CustomBreadcrumb, CustomJumbotron } from "@/components/custom"
import { HeroStats } from "@/heroes/components"
import { SearchControls } from "./ui/SearchControls"


export const SearchPage = ()=>{
	return (
		<>
			{/* Header */}
			<CustomJumbotron
				title="Búsqueda de Superhéroes" 
				description="Busca a tus superhéroes y villanos favoritos" 
			/>

			<CustomBreadcrumb 
				currentPage="Buscador de héroes" 
				/* breadcrumbs={[
					{label: 'Home1', to: '/'},
					{label: 'Home2', to: '/'},
					{label: 'Home3', to: '/'},
				]} */
			/>

			{/* Stats Dashboard */}
			<HeroStats />

			{/* Controls */}
			<SearchControls />
		</>
	)
}