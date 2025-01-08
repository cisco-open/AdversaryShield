import { AfterViewInit, Component, inject, linkedSignal, OnInit, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { Release } from '../../../../services/client/models/releases/releases.interface';
import { DialogClose, DialogStatus } from '../../../../shared/components/dialog';
import { DialogMessageService } from '../../../../shared/components/dialog/features/dialog-message/services/dialog-message.service';
import { StatusDisplayComponent } from '../../../../shared/components/status-display/status-display.component';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { TableSkeletonLoaderComponent } from '../../../../shared/components/table-skeleton-loader/table-skeleton-loader.component';
import { ReleasesStore } from '../../../../state/releases/releases.store';

@Component({
	selector: 'as-releases-table-card',
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatTooltipModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		TableNoRecordsComponent,
		TableSkeletonLoaderComponent,
		MatCardModule,
		MatTooltipModule,
		StatusDisplayComponent
	],
	templateUrl: './releases-table-card.component.html',
	styleUrl: './releases-table-card.component.scss',
	providers: [DialogMessageService]
})
export class ReleasesTableCardComponent implements OnInit, AfterViewInit {
	readonly releasesStore = inject(ReleasesStore);
	readonly dialogMessageService = inject(DialogMessageService);

	releases: Signal<Release[]> = this.releasesStore.releases;

	dataSource = linkedSignal<Release[], MatTableDataSource<Release>>({
		source: this.releases,
		computation: (newReleases, previous) => {
			const dataSource = previous?.value ?? new MatTableDataSource<Release>();
			const transformedData = newReleases.map((release) => ({
				name: release?.name,
				namespace: release?.namespace,
				revision: release?.revision,
				status: release?.status
			}));
			dataSource.data = transformedData;
			return dataSource;
		}
	});

	readonly paginator = viewChild.required(MatPaginator);
	displayedColumns: string[] = ['name', 'namespace', 'revision', 'status', 'actions'];

	ngOnInit() {
		this.releasesStore.loadAll();
	}

	ngAfterViewInit() {
		this.dataSource().paginator = this.paginator();
	}

	upgradeRelease(name: string) {
		const dialogMessageConfirmation = this.dialogMessageService.openWarningDialog(
			{
				message:
					'This action will upgrade the release! Proceeding with this action will apply the upgrade to the selected release. Once initiated, this process cannot be undone. Ensure you have verified all prerequisites before continuing. Are you sure you want to proceed?'
			},
			{
				closeButtonLabel: 'No',
				width: '800px'
			}
		);

		dialogMessageConfirmation
			.afterClosed()
			.pipe(take(1))
			.subscribe((dialogCloseEvent: DialogClose<unknown>) => {
				if (dialogCloseEvent.status !== DialogStatus.SAVE) {
					return;
				}
				this.releasesStore.upgradeRelease(name);
			});
	}

	removeRelease(name: string) {
		const dialogMessageConfirmation = this.dialogMessageService.openWarningDialog(
			{
				message: 'Are you sure you want to remove it?'
			},
			{
				closeButtonLabel: 'No',
				width: '800px'
			}
		);

		dialogMessageConfirmation
			.afterClosed()
			.pipe(take(1))
			.subscribe((dialogCloseEvent: DialogClose<unknown>) => {
				if (dialogCloseEvent.status !== DialogStatus.SAVE) {
					return;
				}

				this.releasesStore.removeByName(name);
			});
	}
}
