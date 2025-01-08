import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, TemplateRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerRef } from '../drawer.ref';
import { DRAWER_DATA } from '../drawer.tokens';
import { DrawerStatus } from '../models/enums/drawer-status.enum';
import { DrawerSizeStylesPipe } from '../pipes/drawer-size-style.pipe';

@Component({
	selector: 'drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, DrawerSizeStylesPipe]
})
export class DrawerComponent {
	readonly drawerRef = inject(DrawerRef);
	readonly destroyRef = inject(DestroyRef);
	readonly data = inject(DRAWER_DATA);

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
			.pipe(takeUntilDestroyed(this.destroyRef))
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
