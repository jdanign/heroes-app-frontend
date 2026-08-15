import { RouterProvider } from "react-router"
import { appRrouter } from "./router/app.router"


export const HeroesApp = ()=>{
	return (
		<>
			<RouterProvider router={appRrouter} />
		</>
	)
}