# React + TypeScript + Vite

## Instalación desde repositorio

Clonar el repositorio.

Renombrar el archivo con variables de entorno `.env.template` a `.env` y ajustar las variables incompletas.

Ejecutar los comandos:

```Shell
yarn install
yarn dev
```

## Proyecto creado mediante

```Shell
yarn create vite
```

Una vez instalado vite, acceder al directorio del proyecto y actualizar a la última versión de yarn.

```Shell
cd mi-proyecto
yarn set version stable
```

Configura la compatibilidad tradicional (node_modules).

```Shell
yarn config set nodeLinker node-modules
```

O bien, abrir el archivo `.yarnrc.yml` recién generado y añadir manualmente esta línea.

```YAML
nodeLinker: node-modules
```

Luego ya se puede lanzar el entorno de desarrollo:

```Shell
yarn install
yarn dev
```

# Shadcn UI

Para instalar [shadcn UI](https://ui.shadcn.com):

Si no está instalado TailwindCSS en el proyecto hay que instalarlo:

```Shell
yarn add tailwindcss @tailwindcss/vite
```

También habría que añadir la importación de TailwindCSS en el index.css.

```Shell
@import "tailwindcss";
```

Hay que modificar el archivo `tsconfig.json`:

```JSON
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Luego hay que modificar el archivo `tsconfig.app.json`:

```JSON
"baseUrl": ".",
  "paths": {
    "@/*": [
      "./src/*"
    ]
  }
```

Luego, instala `@types/node`:

```Shell
yarn add -D @types/node
```

Luego, actualiza `vite.config.ts` para que Vite pueda resolver el alias del ***@***:

```JavaScript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

Luego, se inicializa:

```Shell
yarn dlx shadcn@latest init
```

Por último se instalan los componentes necesarios:

```Shell
yarn dlx shadcn@latest add
```

    # React Router

Hay [3 formas de usarlo](https://reactrouter.com/start/modes#decision-advice):

* Framework: Buena para SSR (renderizado en el lado del servidor) de una forma ligera. Tiene todas las opciones disponibles.
* Data: Buena opción para SPA (Single Page Application). Es una opción intermedia, tiene más opciones que la declarativa.
* Declarativa: Buena opción para SPA (Single Page Application). Es una opción ligera con menos funcionalidades.

En esta aplicación se va a usar la opción de data. Para [instalarla](https://reactrouter.com/start/data/installation):

```Shell
yarn add react-router
```

Posteriormente, habría que crear el directorio ***router*** en el ***src*** (podría estar ubicado en cualquier parte). Dentro de esa carpeta se podría crear el archivo `app.router.tsx` donde irá el sistema de rutas:

```TSX
import { createBrowserRouter } from 'react-router';


export const appRrouter = createBrowserRouter([
	// Layout compartido (tienen una estructura visual similar)
	{
		path:'/',
		element: <HeroesLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: 'heroes/1',
				element: <HeroPage />
			},
			{
				path: 'search',
				element: <SearchPage />
			},
		],
	},
	// Ruta externa al layout compartido
	{
		path: 'admin',
		element: <AdminPage />
	},
]);
```

Los componentes que se califiquen como ***Layout***, deben contener el componente :

```TSX
import { Outlet } from "react-router"


export const HeroesLayout = ()=>{
	return (
		<div className="bg-red-500">
			<Outlet />
		</div>
	)
}
```

En el componente principal de la aplicación hay que insertar el código del router:

```TSX
import { RouterProvider } from "react-router"
import { appRrouter } from "./router/app.router"


export const HeroesApp = ()=>{
	return (
		<>
			<RouterProvider router={appRrouter} />
		</>
	)
}
```

# Axios

Para instalar [axios](https://classic.yarnpkg.com/en/package/axios):

```Shell
yarn add axios
```

Crear la instancia de axios:

```JavaScript
import axios from 'axios';


// Importa la variable de entorno con el host del proyecto de backend
const BASE_URL = import.meta.env.VITE_API_URL;


// Instancia de axios
export const heroApi = axios.create({
	baseURL: `${BASE_URL}/api/heroes`,
});
```

# Tanstack Query

Instalación de [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/installation):

```Shell
yarn add @tanstack/react-query

yarn add -D @tanstack/eslint-plugin-query
```

Es necesario crear el cliente en el componente principal de la aplicación `HeroesApp.tsx`:

```JavaScript
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
```

En el mismo archivo, hay que envolver los componentes que exporta la aplicación en un ***QueryClientProvider*** (añadiendo la importación de ***tanstack/react-query***) y asignarle el ***queryClient*** creado:

```JavaScript
export const HeroesApp = ()=>{
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={appRrouter} />
		</QueryClientProvider>
	)
}
```

Habría que instalar las devtools para depurar el desarrollo más fácilmente:

```Shell
yarn add @tanstack/react-query-devtools
```

Y agregarlas también al `HeroesApp.tsx` junto con su dependencia, quedando así:

```JavaScript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const HeroesApp = ()=>{
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={appRrouter} />

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
```

Para hacer la petición a una API dentro de algún componente de la aplicación:

```JavaScript
const { data } = useQuery({
	// Espacio en memoria donde guardar el resultado de la petición
	queryKey: ['heroes'],
	// Función que se dispara (llamada a la API)
	queryFn: () => getHeroesByPageAction(),
	// Tiempo que se almacena la petición en caché en segundos
	staleTime: 1000 * 60,
})
```

# Variables de entorno

Hay que editar el archivo `.env` con las variables de entorno basándose en el archivo `.env.template`.

Si existe un archivo `.env.test` se usará para hacer el testing.

Luego ejecturar `yarn install` y `yarn dev`.

# Testing

Es mejor empezar a probar las partes más pequeñas y fáciles, para ir aumentando la complejidad.

1. hero.api.ts
2. Directorio actions

El backend está en otro proyecto. También, habría que configurar el puerto para el testeo.

```Shell
cd 'C:\DESARROLLO WEB\CURSOS\react-19\06-heroes-nest-backend' 

$env:PORT=3001; npm run start:dev
```

Al trabajar con Vite, la integración de las pruebas es más transparente con la librería de testing [Vitest](https://vitest.dev).

```Shell
yarn add -D vitest jsdom
```

En el archivo `package.json`, dentro del objeto `scripts`, añadir:

```JSON
"test": "vitest",
"test:ui": "vitest --ui",
"test:c": "vitest run --coverage"
```

Será necesario crear algún archivo de pruebas en el proyecto, por ejemplo `math.helper.test.ts`, el cual debe contener al menos una prueba.

También será necesario instalar [Testing Library](https://testing-library.com/docs/react-testing-library/intro) para hacer evaluaciones sobre los componentes, renderizaciones e interaccionar con ellos.

```Shell
yarn add -D @testing-library/react @testing-library/dom @types/react @types/react-dom
```

En el archivo `vite.config.ts` hay que modificar el `import { defineConfig } from 'vite'` y poner `import { defineConfig } from 'vitest/config'`. Debería quedar algo así:

```JavaScript
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
```

Si sale un error, salir del testeo y volver a ejecutar `yarn test`. Pedirá instalar la dependencia `jsdom` y habría que instalarla.

Si se está usando Axios, habría que añadir la librería para [mocks de axios](https://classic.yarnpkg.com/en/package/axios-mock-adapter).

```Shell
yarn add -D axios-mock-adapter
```

### UI

### Coverage

Muestra un informe sobre la coberturda de las pruebas que se han programado.

```Shell
yarn test:c
```

Además de la visualización en consola, se crea un nuevo directorio `coverage`. Abriendo el `index.html` se muestra en el navegador el informe.



# Despliegue

## Backend

El backend de este proyecto está hecho en nest. Se puede desplegar en VPS, servidores dedicados, vercel, render, netlify, firebase... cualquier entorno que tenga node.

Primero hay que crear el repositorio en github y subirlo. 

Posteriormente hay que ir a Render y crear un nuevo proyecto en el dashboard.

Después hay que crear un nuevo web service en render. Ahí hay que seleccionar el código subido a github del backend. Hay que marcar ek kit gratuito.

Por último, hacer clic en deploy.


## Frontend

En el proyecto del frontend. Primero hay que modificar la variable de entorno `VITE_API_URL` y ponerle la URL donde se ha publicado el proyecto en la plataforma Render (paso anterior).

Posteriormente se puede comprobar como el proyecto funciona en el entrono local de desarrollo con el comando `yarn dev`.

Hay que configurar el router de la aplicación y usar `createHashRouter`, solo si no tenemos el control de donde irá el index.html, en este caso no lo tenemos por estar en `netlify`.

Hay que ejecutar el comando `yarn build` para que se ejecute el testing y genere los archivos para desplegar la aplicación. Para que el testing no falle, se puede levantar el backend de desarrollo en la consola como se ha hecho en el testing previo.

Para el despliegue en netlify hay que registrarse y en el módulo de `projects` soltar la carpeta `dist` tal cual.

Para el despliegue en `github pages`, hay que renombrar la carpeta `dist` a `docs`.