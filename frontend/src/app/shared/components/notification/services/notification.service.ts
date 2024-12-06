import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationTypes } from '../models/snackbar-types.enum';
import { NotificationComponent } from '../notification.component';

export const DEFAULT_SUCCESS_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_INFO_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_ERROR_SNACKBAR_DURATION: number = 10000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
	readonly snackbar = inject(MatSnackBar);

	public showSuccess(message: string): void {
		this.showNotification(
			message,
			NotificationTypes.SUCCESS,
			DEFAULT_SUCCESS_SNACKBAR_DURATION,
			'notification-panel-success'
		);
	}

	public showInfo(message: string): void {
		this.showNotification(message, NotificationTypes.INFO, DEFAULT_INFO_SNACKBAR_DURATION, 'notification-panel-info');
	}

	public showError(message: string): void {
		this.showNotification(
			message,
			NotificationTypes.ERROR,
			DEFAULT_ERROR_SNACKBAR_DURATION,
			'notification-panel-error'
		);
	}

	public showWarning(message: string): void {
		this.showNotification(
			message,
			NotificationTypes.WARNING,
			DEFAULT_INFO_SNACKBAR_DURATION,
			'notification-panel-warning'
		);
	}

	private showNotification(
		message: string,
		notificationType: NotificationTypes,
		duration: number,
		panelClass: string
	): void {
		this.snackbar.openFromComponent(NotificationComponent, {
			duration,
			data: {
				message,
				notificationType
			},
			panelClass
		});
	}
}
