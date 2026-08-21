import { useSearchParams } from "react-router";
import { useHeroSearch } from "@/heroes/hooks";

import { CustomBreadcrumb, CustomJumbotron } from "@/components/custom"
import { SearchControls } from "./ui"
import { HeroGrid, HeroStats } from "@/heroes/components";


export const SearchPage = ()=>{
	const [searchParams] = useSearchParams();

	const { data: heroes } = useHeroSearch({
		name: searchParams.get('name') ?? undefined,
		team: searchParams.get('team') ?? undefined,
		category: searchParams.get('category') ?? undefined,
		universe: searchParams.get('universe') ?? undefined,
		status: searchParams.get('status') ?? undefined,
		strength: searchParams.get('strength') ?? undefined,
	});


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

			<HeroGrid heroes={heroes ?? []} />
		</>
	)
}