import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationTypes } from './models/snackbar-types.enum';

@Component({
	selector: 'notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	standalone: true,
	imports: [MatIconModule]
})
export class NotificationComponent {
	readonly NotificationTypes: typeof NotificationTypes = NotificationTypes;

	readonly notificationRef = inject(MatSnackBarRef<NotificationComponent>);
	readonly data = inject(MAT_SNACK_BAR_DATA);
}
