import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'as-footer',
	templateUrl: './as-footer.component.html',
	styleUrls: ['./as-footer.component.scss'],
	imports: [CommonModule, MatDividerModule]
})
export class AsFooterComponent {
	currentYear: number = new Date().getFullYear();
}
