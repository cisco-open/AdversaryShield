import { Component } from '@angular/core';
import { ReleasesCreateCardComponent } from './components/releases-create-card/releases-create-card.component';
import { ReleasesTableCardComponent } from './components/releases-table-card/releases-table-card.component';

@Component({
	selector: 'as-releases',
	imports: [ReleasesCreateCardComponent, ReleasesTableCardComponent],
	templateUrl: './releases.component.html',
	styleUrl: './releases.component.scss'
})
export class ReleasesComponent {}
