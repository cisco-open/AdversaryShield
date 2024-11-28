import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'sidenav',
	imports: [CommonModule, RouterModule, MatRippleModule, MatIconModule, MatDividerModule],
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
	routerActive = 'activelink';

	sidebarMenu: any[] = [
		{
			link: '/home',
			icon: 'home',
			label: 'Dashboard'
		},
		{
			link: '/defenses',
			icon: 'security',
			label: 'Defenses'
		}
	];
}
