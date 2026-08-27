import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui"

import { DEFAULT_PAGE } from "@/heroes/actions";


interface Props {
	totalPages: number;
	page?: number;
}


export const CustomPagination = ({ totalPages, page }: Props)=>{
	const [searchParams, setSearchParams] = useSearchParams();

	// Obtiene la página desde la URL; si no existe, usa DEFAULT_PAGE
    const urlPage = Number(searchParams.get('page'));
    const currentPage = page ?? (urlPage > 0 ? urlPage : DEFAULT_PAGE);


	const handlePageChange = (thisPage: number)=>{
		if (thisPage !== currentPage){
			if (thisPage >= 1 || thisPage <= totalPages)
				searchParams.set('page', thisPage.toString());
			else
				searchParams.set('page', DEFAULT_PAGE.toString());
				
			setSearchParams(searchParams);
		}
	}


	// Modifica la URL en caso de que algún parámetro no sea válido
	useEffect(() => {
		if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages){
			setSearchParams(prev => {
				prev.set('page', DEFAULT_PAGE.toString());
				return prev;
			});
		}
	}, [currentPage, totalPages, setSearchParams])


	return (
		<div className="flex items-center justify-center space-x-2">
			<Button variant="outline" size="sm" disabled={currentPage === 1}
				onClick={()=> handlePageChange(currentPage-1)}
			>
				<ChevronLeft className="h-4 w-4" />
				Anterior
			</Button>

			{Array.from({length: totalPages}).map((item, index)=>(
				<Button 
					key={index} 
					variant={(currentPage === index + 1) ? 'default' : 'outline'} 
					size="sm"
					onClick={() => handlePageChange(index + 1)}
					disabled={index + 1 === currentPage}
				>
					{index + 1}
				</Button>
			))}

			{/* <Button variant="ghost" size="sm" disabled>
				<MoreHorizontal className="h-4 w-4" />
			</Button> */}

			<Button variant="outline" size="sm" disabled={currentPage === totalPages}
				onClick={() => handlePageChange(currentPage + 1)}
			>
				Siguiente
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}