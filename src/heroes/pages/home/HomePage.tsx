import { useEffect, useMemo } from "react"

import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CustomBreadcrumb, CustomJumbotron, CustomPagination } from "@/components/custom"
import { HeroStats, HeroGrid } from "@/heroes/components"

import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_TAB, getHeroesByPageAction, getSummaryAction, VALID_TABS } from "@/heroes/actions"


export const HomePage = ()=> {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageParam = Number(searchParams.get('page') ?? DEFAULT_PAGE.toString());
	const pageActive = isNaN(pageParam) ? DEFAULT_PAGE : pageParam;

	const limitParam = Number(searchParams.get('limit') ?? DEFAULT_LIMIT.toString());
	const limitActive = isNaN(limitParam) ? DEFAULT_LIMIT : limitParam;

	const tabParam = searchParams.get('tab') ?? DEFAULT_TAB;

	// Almacena la pestaña activa
	const tabActive = useMemo(()=> {
		return VALID_TABS.includes(tabParam) ? tabParam : DEFAULT_TAB;
	}, [tabParam])


	// Modifica la URL en caso de que algún parámetro no sea válido
	useEffect(() => {
		if (!VALID_TABS.includes(tabParam))
			setSearchParams(prev => {
				prev.set('tab', DEFAULT_TAB);
				return prev;
			});
		
		if (isNaN(pageParam))
			setSearchParams(prev => {
				prev.set('page', DEFAULT_PAGE.toString());
				return prev;
			});

		if (isNaN(limitParam))
			setSearchParams(prev => {
				prev.set('limit', DEFAULT_LIMIT.toString());
				return prev;
			});
	}, [tabParam, pageParam, limitParam, setSearchParams])


	// Petición HTTP con caché
	const { data: heroesResponse } = useQuery({
		// Espacio en memoria donde guardar el resultado de la petición
		queryKey: ['heroes', { page: pageActive, limit: limitActive }],
		// Función que se dispara (llamada a la API)
		queryFn: () => getHeroesByPageAction(pageActive, limitActive),
		// Tiempo que se almacena la petición en caché en segundos
		staleTime: 1000 * 60,
	});


	const {data: summary} = useQuery({
		queryKey: ['summary-info'],
		queryFn: ()=> getSummaryAction(),
		staleTime: 1000 * 60
	});




	return (
		<>
			{/* Header */}
			<CustomJumbotron 
				title="Universo de Superhéroes" 
				description="Descubre, explora y gestiona a tus superhéroes y villanos favoritos" 
			/>

			<CustomBreadcrumb currentPage="Super Héroes" />

			{/* Stats Dashboard */}
			<HeroStats summary={summary} />

			{/* Tabs */}
			<Tabs value={tabActive} className="mb-8"
				onValueChange={value => setSearchParams(prev =>{
					prev.set('tab', value);
					return prev;
				})}
			>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">All Characters ({summary?.totalHeroes})</TabsTrigger>
					<TabsTrigger value="favorites">Favorites (3)</TabsTrigger>
					<TabsTrigger value="heroes">Heroes ({summary?.heroCount})</TabsTrigger>
					<TabsTrigger value="villains">Villains ({ summary?.villainCount})</TabsTrigger>
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
			{heroesResponse &&
				<CustomPagination 
					totalPages={heroesResponse?.pages ?? DEFAULT_PAGE}
					page={pageActive}
				/>
			}
		</>
	)
}
