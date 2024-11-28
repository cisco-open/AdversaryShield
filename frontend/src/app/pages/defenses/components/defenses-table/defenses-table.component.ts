import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Defense } from '../../models/defense.interface';

@Component({
	selector: 'as-defenses-table',
	imports: [MatTableModule, MatPaginatorModule, MatTooltipModule, MatIconModule, MatButtonModule, MatDividerModule],
	templateUrl: './defenses-table.component.html',
	styleUrl: './defenses-table.component.scss'
})
export class DefensesTableComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'name', 'repoUrl', 'actions'];
	dataSource = new MatTableDataSource([
		{ id: 1, name: 'Defense 1', repoUrl: 'www.defenseurl1.cisco.com' },
		{ id: 2, name: 'Defense 2', repoUrl: 'www.defenseurl1.cisco.com' },
		{ id: 3, name: 'Defense 3', repoUrl: 'www.defenseurl1.cisco.com' }
	]);

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	viewDefense(defense: Defense) {}

	editDefense(defense: Defense) {}

	removeDefense(id: number) {}
}
