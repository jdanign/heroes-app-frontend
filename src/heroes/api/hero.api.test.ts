import { describe, expect, test } from "vitest"

import { BASE_URL, heroApi } from "./hero.api"


describe('HeroApi', () => {
	test('Debería estar apuntando al servidor de testeo', () => {
		expect(heroApi).toBeDefined()
		expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`)
		expect(BASE_URL).toContain(3001)
	})
})