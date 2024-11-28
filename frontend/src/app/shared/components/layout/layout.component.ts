import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AsFooterComponent } from '../as-footer/as-footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
	selector: 'layout',
	imports: [CommonModule, MatSidenavModule, RouterModule, HeaderComponent, AsFooterComponent, SidenavComponent],
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
