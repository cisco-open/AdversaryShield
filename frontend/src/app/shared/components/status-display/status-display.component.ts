import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Status } from '../../constants/status.enum';

@Component({
	selector: 'as-status-display',
	imports: [CommonModule, MatIconModule],
	templateUrl: './status-display.component.html',
	styleUrl: './status-display.component.scss'
})
export class StatusDisplayComponent {
	status: InputSignal<Status> = input.required();

	statusDetails = computed(() => {
		if (this.status() === Status.ACTIVE) {
			return { iconName: 'check_circle', colorClass: 'mat-success' };
		}
		return { iconName: 'cancel', colorClass: 'mat-error' };
	});
}
