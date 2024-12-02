import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, input, output, Signal, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { getDialogSizeStyles } from '../dialog.utils';
import { DialogStatus } from '../models/enums/dialog-status.enum';
import { DialogSizeStylesPipe } from '../pipes/dialog-size-style.pipe';

@UntilDestroy()
@Component({
	selector: 'as-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, DialogSizeStylesPipe]
})
export class DialogComponent {
	readonly dialogRef = inject(DialogRef);
	readonly data = inject(DIALOG_DATA);

	readonly headerTemplate = input<TemplateRef<any>>();
	readonly actionsTemplate = input<TemplateRef<any>>();

	readonly isSaveDisabled = input<boolean>(false);
	readonly isDismissDisabled = input<boolean>(false);

	readonly actionEvent = output<DialogStatus>();

	readonly isSingleButton: Signal<boolean> = computed(() => {
		return (
			(!!this.data.showCloseButton && !this.data.showSaveButton) ||
			(!this.data.showCloseButton && !!this.data.showSaveButton)
		);
	});

	constructor() {
		this.closeDrawerOnBackdropClick();
	}

	get dialogSizeStyles(): { [klass: string]: any } {
		return getDialogSizeStyles(this.data.width, this.data.height);
	}

	onClose(): void {
		this.actionEvent.emit(DialogStatus.CLOSE);
		this.dialogRef.close({ status: DialogStatus.CLOSE });
	}

	onSave(): void {
		this.actionEvent.emit(DialogStatus.SAVE);
	}

	// Triggered by the X close icon or backdrop click (if enabled)
	onDismiss(): void {
		this.actionEvent.emit(DialogStatus.DISMISS);
		this.dialogRef.close({ status: DialogStatus.DISMISS });
	}

	private closeDrawerOnBackdropClick(): void {
		if (!this.data.closeDialogOnBackdropClick) {
			return;
		}

		this.dialogRef
			.backdropClick()
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.onDismiss();
			});
	}

	@HostListener('window:keyup.esc') onEscKeyDown(): void {
		if (!this.data.closeDialogOnEscKeyUp) {
			return;
		}
		this.onDismiss();
	}
}
