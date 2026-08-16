import { RouterProvider } from "react-router"
import { appRrouter } from "./router/app.router"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();


export const HeroesApp = ()=>{
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={appRrouter} />

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}