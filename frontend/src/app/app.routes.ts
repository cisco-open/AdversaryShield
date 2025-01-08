import { Routes } from '@angular/router';
import { ReleasesStateService } from './pages/releases/services/releases-state.service';
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
				path: RoutesList.RELEASES.ROOT,
				loadComponent: () => import('./pages/releases/releases.component').then((mod) => mod.ReleasesComponent),
				providers: [ReleasesStateService]
			},
			{
				path: RoutesList.DEFENSES.ROOT,
				loadComponent: () => import('./pages/defenses/defenses.component').then((mod) => mod.DefensesComponent)
			},
			{
				path: RoutesList.TARGET_MODELS.ROOT,
				loadComponent: () =>
					import('./pages/target-models/target-models.component').then((mod) => mod.TargetModelsComponent)
			}
		]
	},
	{
		path: '**',
		redirectTo: RoutesList.HOME.ROOT
	}
];
