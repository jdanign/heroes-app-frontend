# React + TypeScript + Vite

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

O bien, abrir el archivo ***.yarnrc.yml*** recién generado y añadir manualmente esta línea.

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

Hay que modificar el archivo ***tsconfig.json***:

```JSON
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Luego hay que modificar el archivo ***tsconfig.app.json***:

```JSON
"baseUrl": ".",
  "paths": {
    "@/*": [
      "./src/*"
    ]
  }
```

Luego, instala ***@types/node***:

```Shell
yarn add -D @types/node
```

Luego, actualiza ***vite.config.ts*** para que Vite pueda resolver el alias del ***@***:

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


Posteriormente, habría que crear el directorio ***router*** en el ***src*** (podría estar ubicado en cualquier parte). Dentro de esa carpeta se podría crear el archivo ***app.router.tsx*** donde irá el sistema de rutas:

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


Los componentes que se califiquen como ***Layout***, deben contener el componente ***<Outlet />***:

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

