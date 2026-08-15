import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"

import { CustomJumbotron } from "@/components/custom"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"


export const HomePage = ()=> {
	const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');


	return (
		<>
			{/* Header */}
			<CustomJumbotron 
				title="Universo de Superhéroes" 
				description="Descubre, explora y gestiona a tus superhéroes y villanos favoritos" 
			/>

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
			<div className="flex items-center justify-center space-x-2">
				<Button variant="outline" size="sm" disabled>
					<ChevronLeft className="h-4 w-4" />
					Previous
				</Button>

				<Button variant="default" size="sm">
					1
				</Button>
				<Button variant="outline" size="sm">
					2
				</Button>
				<Button variant="outline" size="sm">
					3
				</Button>
				<Button variant="ghost" size="sm" disabled>
					<MoreHorizontal className="h-4 w-4" />
				</Button>

				<Button variant="outline" size="sm">
					Next
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</>
	)
}
