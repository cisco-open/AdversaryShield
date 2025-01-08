import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RoutesList } from '../../constants/routes-list.constants';
import { SidenavItem } from './models/sidenav.interface';

@Component({
	selector: 'sidenav',
	imports: [CommonModule, RouterModule, MatRippleModule, MatIconModule, MatDividerModule],
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
	routerActive = 'activelink';

	sidebarMenu: SidenavItem[] = [
		{
			route: `/${RoutesList.HOME.ROOT}`,
			icon: 'home',
			label: 'Dashboard'
		},
		{
			route: `/${RoutesList.RELEASES.ROOT}`,
			icon: 'new_releases',
			label: 'Releases'
		},
		{
			route: `/${RoutesList.DEFENSES.ROOT}`,
			icon: 'security',
			label: 'Defenses'
		},
		{
			route: `/${RoutesList.TARGET_MODELS.ROOT}`,
			icon: 'storage',
			label: 'Target Models'
		}
	];
}
