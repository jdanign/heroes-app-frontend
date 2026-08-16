import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CustomBreadcrumb, CustomJumbotron, CustomPagination } from "@/components/custom"
import { HeroStats, HeroGrid } from "@/heroes/components"

import { getHeroesByPageAction } from "@/heroes/actions"
import { useMemo } from "react"


export const HomePage = ()=> {
	const [searchParams, setSearchParams] = useSearchParams();

	const tabParam = searchParams.get('tab') ?? 'all';

	const activeTab = useMemo(()=> {
		const validTabs = ['all', 'favorites', 'heroes', 'villains'];
		return validTabs.includes(tabParam) ? tabParam : 'all';
	}, [tabParam])


	/* useEffect(() => {
		getHeroesByPageAction().then();
	}, []) */

	const { data: heroesResponse } = useQuery({
		// Espacio en memoria donde guardar el resultado de la petición
		queryKey: ['heroes'],
		// Función que se dispara (llamada a la API)
		queryFn: () => getHeroesByPageAction(),
		// Tiempo que se almacena la petición en caché en segundos
		staleTime: 1000 * 60,
	})

	


	return (
		<>
			{/* Header */}
			<CustomJumbotron 
				title="Universo de Superhéroes" 
				description="Descubre, explora y gestiona a tus superhéroes y villanos favoritos" 
			/>

			<CustomBreadcrumb currentPage="Super Héroes" />

			{/* Stats Dashboard */}
			<HeroStats />

			{/* Tabs */}
			<Tabs value={activeTab} className="mb-8"
				onValueChange={value => setSearchParams(prev =>{
					prev.set('tab', value);
					return prev;
				})}
			>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">All Characters (16)</TabsTrigger>
					<TabsTrigger value="favorites">Favorites (3)</TabsTrigger>
					<TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
					<TabsTrigger value="villains">Villains (2)</TabsTrigger>
				</TabsList>

				<TabsContent value='all'>
					<h1>Todos los personajes</h1>
					{/* Character Grid */}
					<HeroGrid heroes={heroesResponse?.heroes ?? []} />
				</TabsContent>
				<TabsContent value='favorites'>
					<h1>Personajes favoritos</h1>
					{/* Character Grid */}
					<HeroGrid />
				</TabsContent>
				<TabsContent value='heroes'>
					<h1>Héroes</h1>
					{/* Character Grid */}
					<HeroGrid />
				</TabsContent>
				<TabsContent value='villains'>
					<h1>Villanos</h1>
					{/* Character Grid */}
					<HeroGrid />
				</TabsContent>
			</Tabs>

			

			{/* Pagination */}
			<CustomPagination totalPages={8} />
		</>
	)
}
