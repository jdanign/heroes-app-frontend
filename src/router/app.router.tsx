import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { HeroesLayout } from '@/heroes/layout/HeroesLayout';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
// import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { SearchPage } from './appLazyLoad';

import { AdminLayout } from '@/admin/layout/AdminLayout';
import { AdminPage } from '@/admin/pages/AdminPage';


export const appRrouter = createBrowserRouter([
	// Layout compartido (tienen una estructura visual similar)
	{
		path:'/',
		element: <HeroesLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'heroes/:id', // id aparecerá en useParams() como parámetro de la URL
				element: <HeroPage />,
			},
			{
				path: 'search',
				element: (
					<Suspense fallback={<div>Cargando...</div>}>
						<SearchPage />
					</Suspense>
				),
			},
			{
				path: '*',
				element: <Navigate to='/' />,
			},
		],
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <AdminPage />,
			},
		],
	},
]);