import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"

import { CustomBreadcrumb, CustomJumbotron } from "@/components/custom"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/custom"


export const HomePage = ()=> {
	const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');


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
			<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">All Characters (16)</TabsTrigger>
					<TabsTrigger value="favorites">Favorites (3)</TabsTrigger>
					<TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
					<TabsTrigger value="villains">Villains (2)</TabsTrigger>
				</TabsList>

				<TabsContent value='all'>
					<h1>Todos los personajes</h1>
					{/* Character Grid */}
					<HeroGrid />
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
