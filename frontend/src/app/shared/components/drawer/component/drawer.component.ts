import { CommonModule } from '@angular/common';
import { Component, HostListener, TemplateRef, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DrawerRef } from '../drawer.ref';
import { DRAWER_DATA } from '../drawer.tokens';
import { DrawerStatus } from '../models/enums/drawer-status.enum';
import { DrawerSizeStylesPipe } from '../pipes/drawer-size-style.pipe';

@UntilDestroy()
@Component({
	selector: 'drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, DrawerSizeStylesPipe]
})
export class DrawerComponent {
	drawerRef = inject(DrawerRef);
	data = inject(DRAWER_DATA);

	readonly headerTemplate = input<TemplateRef<any>>();
	readonly actionsTemplate = input<TemplateRef<any>>();

	readonly isSaveDisabled = input<boolean>(false);
	readonly isDismissDisabled = input<boolean>(false);

	readonly actionEvent = output<DrawerStatus>();

	constructor() {
		this.closeDrawerOnBackdropClick();
	}

	onClose(): void {
		this.actionEvent.emit(DrawerStatus.CLOSE);
		this.drawerRef.close({ status: DrawerStatus.CLOSE });
	}

	onSave(): void {
		this.actionEvent.emit(DrawerStatus.SAVE);
	}

	onDismiss(): void {
		this.actionEvent.emit(DrawerStatus.DISMISS);
		this.drawerRef.close({ status: DrawerStatus.DISMISS });
	}

	private closeDrawerOnBackdropClick(): void {
		if (!this.data.closeDialogOnBackdropClick) {
			return;
		}

		this.drawerRef
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
