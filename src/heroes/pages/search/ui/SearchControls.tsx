import { useRef, type KeyboardEvent } from "react"
import { useSearchParams } from "react-router";

import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, Input, Button, Slider } from "@/components/ui"


const ACCORDION_NAME = 'advanced-filters';


export const SearchControls = ()=>{
	const inputRef = useRef<HTMLInputElement>(null);

	const [searchParams, setSearchParams] = useSearchParams();

	const activeAccordion = searchParams.get('filters') === 'true' ? ACCORDION_NAME : '';
	const selectedStrength = Number(searchParams.get('strength') ?? '0');


	const setQueryParams = (name: string, value: string) => {
		setSearchParams(prev => {
			prev.set(name, value);
			return prev;
		});
	}

	const delQueryParams = (name: string) => {
		setSearchParams(prev => {
			prev.delete(name);
			return prev;
		});
	}


	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>)=>{
		if (e.key === 'Enter'){
			// Actualizar URL search?name=superman&category=hero
			setQueryParams('name', inputRef.current?.value ?? '');
		}
	}




	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4 mb-8">
				{/* Search */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
					<Input className="pl-12 h-12 text-lg bg-white" 
						placeholder="Busca héroes, villanos, poderes, equipos..." 
						ref={inputRef}
						onKeyUp={handleKeyUp}
						defaultValue={searchParams.get('name') ?? ''}
						/>
				</div>

				{/* Action buttons */}
				<div className="flex gap-2">
					<Button 
						variant={activeAccordion === ACCORDION_NAME ? 'default' : 'outline'} 
						className="h-12"
						onClick={() =>(activeAccordion === ACCORDION_NAME) ?
							delQueryParams('filters')
							:
							setQueryParams('filters', 'true')
						}
					>
						<Filter className="h-4 w-4 mr-2" />
						Filters
					</Button>

					<Button variant="outline" className="h-12">
						<SortAsc className="h-4 w-4 mr-2" />
						Sort by Name
					</Button>

					<Button variant="outline" className="h-12">
						<Grid className="h-4 w-4" />
					</Button>

					<Button className="h-12">
						<Plus className="h-4 w-4 mr-2" />
						Add Character
					</Button>
				</div>
			</div>

			{/* Advanced Filters */}
			<Accordion value={[activeAccordion]} >
				<AccordionItem value={ACCORDION_NAME}>
					{/* <AccordionTrigger>Filtros avanzados</AccordionTrigger> */}
					<AccordionContent>
						<div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Advanced Filters</h3>
								<Button variant="ghost">Clear All</Button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Team</label>
									<div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
										All teams
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Category</label>
									<div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
										All categories
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Universe</label>
									<div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
										All universes
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Status</label>
									<div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
										All statuses
									</div>
								</div>
							</div>
							<div className="mt-4">
								<label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
								<Slider 
									defaultValue={[selectedStrength]} 
									max={10} 
									step={1} 
									onValueChange={value => setQueryParams('strength', value.toString())}
								/>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	)
}