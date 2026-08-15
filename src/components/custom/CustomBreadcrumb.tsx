import { Link } from "react-router"

import { DotIcon } from "lucide-react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui"


interface Breadcrumb {
	label: string;
	to: string;
}


interface Props {
	currentPage: string;
	breadcrumbs?: Breadcrumb[];
}


export const CustomBreadcrumb = ({ currentPage, breadcrumbs=[] }: Props)=>{
	return (
		<Breadcrumb className="my-5">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink render={<Link to="/">Inicio</Link>} />
				</BreadcrumbItem>

				{
					breadcrumbs.map(crumb =>(
						<>
							<BreadcrumbSeparator>
								<DotIcon />
							</BreadcrumbSeparator>

							<BreadcrumbItem>
								<BreadcrumbLink render={<Link to={crumb.to}>{crumb.label}</Link>} />
							</BreadcrumbItem>
						</>
					))
				}

				<BreadcrumbSeparator>
					<DotIcon />
				</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbPage>{currentPage}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}