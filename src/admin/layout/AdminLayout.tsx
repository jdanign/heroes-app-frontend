import { Outlet } from "react-router"


export const AdminLayout = ()=>{
	return (
		<div className="bg-slate-400">
			<Outlet />
		</div>
	)
}