import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export const DEFAULT_NUMBER_OF_TABLE_ROWS_FOR_SKELETON_LOADER: number = 8;

@Component({
	selector: 'table-skeleton-loader',
	templateUrl: './table-skeleton-loader.component.html',
	styleUrls: ['./table-skeleton-loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [CommonModule, NgxSkeletonLoaderModule, MatDividerModule]
})
export class TableSkeletonLoaderComponent {
	Arr = Array;
	count: InputSignal<number> = input(DEFAULT_NUMBER_OF_TABLE_ROWS_FOR_SKELETON_LOADER);
}
