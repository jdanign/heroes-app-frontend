import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui"


export const CustomMenu = ()=>{
	const { pathname } = useLocation();


	const isActive = (path: string)=> pathname === path;


	return (
		<NavigationMenu>
			<NavigationMenuList>
				{/* Home */}
				<NavigationMenuItem>
					<NavigationMenuLink 
						className='mr-4 px-2 py-1 rounded-md'
						active={isActive('/')}
						render={<Link to="/">Inicio</Link>}
					/>
				</NavigationMenuItem>

				{/* Search */}
				<NavigationMenuItem>
					<NavigationMenuLink
						className='mr-4 px-2 py-1 rounded-md'
						active={isActive('/search')}
						render={<Link to="/search">Buscar</Link>}
					/>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}