import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RoutesList } from './shared/constants/routes-list.constants';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', redirectTo: RoutesList.HOME.ROOT, pathMatch: 'full' },
			{
				path: RoutesList.HOME.ROOT,
				loadComponent: () => import('./pages/dashboard/dashboard.component').then((mod) => mod.DashboardComponent)
			},
			{
				path: RoutesList.DEFENSES.ROOT,
				loadComponent: () => import('./pages/defenses/defenses.component').then((mod) => mod.DefensesComponent)
			}
		]
	},
	{
		path: '**',
		redirectTo: RoutesList.HOME.ROOT
	}
];
