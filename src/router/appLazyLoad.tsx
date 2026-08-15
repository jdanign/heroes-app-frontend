import { lazy } from 'react';


export const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage').then(module => ({ default: module.SearchPage })));