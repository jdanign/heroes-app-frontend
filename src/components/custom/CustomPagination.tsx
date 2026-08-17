import { useSearchParams } from "react-router";

import { ChevronLeft, ChevronRight, /* MoreHorizontal */ } from "lucide-react"
import { Button } from "../ui"

import { DEFAULT_PAGE } from "@/heroes/actions";
import { useEffect } from "react";


interface Props {
	totalPages: number;
	page: number;
}


export const CustomPagination = ({ totalPages, page }: Props)=>{
	const [searchParams, setSearchParams] = useSearchParams();


	const handlePageChange = (thisPage: number)=>{
		if (thisPage === page) return;

		if (thisPage >= 1 || thisPage <= totalPages){
			searchParams.set('page', thisPage.toString());
			setSearchParams(searchParams);
		}
		else{
			searchParams.set('page', DEFAULT_PAGE.toString());
			setSearchParams(searchParams);
		}
	}

	// Modifica la URL en caso de que algún parámetro no sea válido
	useEffect(() => {
		if (isNaN(page) || page < 1 || page > totalPages){
			setSearchParams(prev => {
				prev.set('page', DEFAULT_PAGE.toString());
				return prev;
			});
		}
	}, [page, totalPages, setSearchParams])


	return (
		<div className="flex items-center justify-center space-x-2">
			<Button variant="outline" size="sm" disabled={page === 1}
				onClick={()=> handlePageChange(page-1)}
			>
				<ChevronLeft className="h-4 w-4" />
				Anterior
			</Button>

			{Array.from({length: totalPages}).map((item, index)=>(
				<Button 
					key={index} 
					variant={(page === index + 1) ? 'default' : 'outline'} 
					size="sm"
					onClick={() => handlePageChange(index + 1)}
					disabled={index + 1 === page}
				>
					{index + 1}
				</Button>
			))}

			{/* <Button variant="ghost" size="sm" disabled>
				<MoreHorizontal className="h-4 w-4" />
			</Button> */}

			<Button variant="outline" size="sm" disabled={page === totalPages}
				onClick={() => handlePageChange(page + 1)}
			>
				Siguiente
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}