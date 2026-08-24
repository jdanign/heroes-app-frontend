import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { heroApi, imageRealPath } from "../api";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";


describe('get-heroes-by-page.action', () => {
	// Crea el mock de axios con la configuración del heroApi (no es necesario, pero se ha hecho con fines educativos)
	const heroesApiMock = new AxiosMockAdapter(heroApi);

	// Limpieza del mock antes de cada prueba
	beforeEach(()=>{
		heroesApiMock.reset()
	})


	test('Debería devolver heróes por defecto', async () => {
		const respObj = {
			total: 10,
			pages: 2,
			heroes: [
				{ image: '1.jpg' },
				{ image: '2.jpg' },
			],
		};

		// Establece la ruta donde se hace la petición y la respuesta deseada
		heroesApiMock.onGet('/').reply(200, respObj)

		const resp = await getHeroesByPageAction(1)

		// console.log(resp);

		expect(resp).toStrictEqual({
			total: respObj.total,
			pages: respObj.pages,
			heroes: expect.arrayContaining(respObj.heroes.map(hero => 
				expect.objectContaining({ image: imageRealPath(hero.image) })
			))
		})
	})


	test('Debería devolver los heroes por defecto cuando la página no es un número', async () => {
		const respObj = {
			total: 10,
			pages: 1,
			heroes: [],
		};

		heroesApiMock.onGet('/').reply(200, respObj);

		await getHeroesByPageAction('abc' as unknown as number)

		const {params} = heroesApiMock.history.get[0]
		// console.log(params);

		expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' })
	})


	test('Debería devolver los heroes de la página indicada cuando es un número como string', async () => {
		const respObj = {
			total: 10,
			pages: 1,
			heroes: [],
		};

		heroesApiMock.onGet('/').reply(200, respObj);

		await getHeroesByPageAction('5' as unknown as number)

		const {params} = heroesApiMock.history.get[0]
		// console.log(params);

		expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' })
	})


	test('Debería devolver los heroes con los parámetros correctos', async () => {
		const respObj = {
			total: 10,
			pages: 1,
			heroes: [],
		};

		heroesApiMock.onGet('/').reply(200, respObj);

		await getHeroesByPageAction(2, 10, 'heroes')

		const {params} = heroesApiMock.history.get[0]
		//console.log(params);

		expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'heroes' })
	})
})