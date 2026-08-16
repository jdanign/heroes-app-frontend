import { useParams } from "react-router"


export const HeroPage = ()=>{
	const { id='' } = useParams();


	return (
		<>
			<h1>HeroPage - {id}</h1>
		</>
	)
}