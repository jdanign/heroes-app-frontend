import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

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
				element: <HomePage />
			},
			{
				path: 'heroes/1',
				element: <HeroPage />
			},
			{
				path: 'search',
				element: (
					<Suspense fallback={<div>Cargando...</div>}>
						<SearchPage />
					</Suspense>
				)
			},
		],
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <AdminPage />
			},
		],
	},
]);