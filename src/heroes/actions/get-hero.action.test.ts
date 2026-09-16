import { describe, expect, test } from "vitest";

import { getHeroAction } from "./get-hero.action";
import { imageRealPath } from "../api";


const heroOK = 'clark-kent';
const heroKO = 'hola';

describe('get-hero.action', () => {
	test('Debería obtener los datos de los hero y devolver una imagen con su URL completa', async () => {
		// Petición con datos correctos
		const result = await getHeroAction(heroOK)

		// console.log(result);
		
		expect(result.image).toMatch(/\.(jpe?g|png|webp|svg|gif)$/i)
		expect(imageRealPath(result.image)).toMatch(/^https?:\/\/.*\.(jpe?g|png|webp)$/i)
		expect(result).toStrictEqual({
			id: expect.any(String),
			name: expect.any(String),
			slug: expect.any(String),
			alias: expect.any(String),
			powers: expect.any(Array),
			description: expect.any(String),
			strength: expect.any(Number),
			intelligence: expect.any(Number),
			speed: expect.any(Number),
			durability: expect.any(Number),
			team: expect.any(String),
			image: expect.any(String),
			firstAppearance: expect.any(String),
			status: expect.any(String),
			category: expect.any(String),
			universe: expect.any(String)
		})
	})


	test('Debería lanzar un error si el hero no es encontrado', async () => {
		// Petición con datos incorrectos
		await expect(getHeroAction(heroKO)).rejects.toThrow();
	})
})