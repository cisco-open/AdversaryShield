import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
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
			route: '/home',
			icon: 'home',
			label: 'Dashboard'
		},
		{
			route: '/defenses',
			icon: 'security',
			label: 'Defenses'
		},
		{
			route: '/target-models',
			icon: 'storage',
			label: 'Target Models'
		}
	];
}
